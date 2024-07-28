import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero.png';
import mathimage from '../assets/math.avif';
import dsimage from '../assets/ds.jfif';
import crimage from '../assets/cw.jfif';
import Login from './Login';
import Signup from './signup';
import Profile from './profile';
import { auth, googleProvider } from "../../firebaseconfig.js";
import { signOut, signInWithPopup } from "firebase/auth";
import { fetchCourses } from '../../fetchdata2';
import Footer from './Footer';
import PayPalButton from './PaypalButton';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const upcomingCourses = [
  {
    name: "Introduction to Mathematics",
    description: "An introductory course on fundamental mathematics concepts.",
    imageUrl: mathimage
  },
  {
    name: "The Art of Creative Writing",
    description: "Develop your creative writing skills with expert guidance.",
    imageUrl: crimage
  },
  {
    name: "Data Science Basics",
    description: "Learn the basics of data science and how to analyze data effectively.",
    imageUrl: dsimage
  }
];

const HomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const coursesRef = useRef(null); // Ref for the courses section
  const navigate = useNavigate();

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      alert("Error signing in with Google: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);
      setFilteredCourses(fetchedCourses); 
    };

    getCourses();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = courses.filter(course =>
        course.name.toLowerCase().includes(query)
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  const scrollToCourses = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      alert('Coupon applied! 10% discount.');
    } else {
      alert('Invalid coupon code.');
    }
  };

  return (
    <div className="font-sans antialiased bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-600">LEARNTECH</h1>
          <div className="flex space-x-4 items-center">
            <input 
              type="text" 
              placeholder="Type a course..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded px-3 py-1"
            />
            <nav className="flex space-x-4 items-center">
              <button onClick={scrollToCourses} className="text-gray-700">Courses</button>
              {!user ? (
                <>
                  <button onClick={openLogin} className="text-gray-700">Login</button>
                  <button onClick={openSignup} className="text-orange-600">Sign Up</button>
                  <button onClick={handleGoogleSignIn} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign in with Google</button>
                </>
              ) : (
                <Profile user={user} onLogout={handleLogout} />
              )}
            </nav>
          </div>
        </div>
      </header>
      <main>
        <section className="bg-cover bg-center h-[600px] w-full text-white flex items-center justify-center" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="relative w-[1100px] h-full">
            <img src={heroImage} alt="Hero Image" className="w-full h-full object-contain" />
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Unlock your learning potential</h2>
            <p className="text-lg">Choose from thousands of courses and a vast collection of study materials to fuel your educational journey</p>
            <button onClick={scrollToCourses} className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Explore</button>
          </div>
        </section>
        <section ref={coursesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Explore Our Popular Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img src={course.imageUrl} alt={course.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{course.name}</h4>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <Link to={`/course/${encodeURIComponent(course.name)}`}>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Learn More</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-lg text-gray-600">No courses available.</div>
            )}
          </div>
        </section>
        <section className="bg-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Courses To Arrive Soon!</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingCourses.map(course => (
                <div key={course.name} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img src={course.imageUrl} alt={course.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{course.name}</h4>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">More Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your pathway to smarter learning</h3>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 md:mr-6 mb-6 md:mb-0">
                <p className="text-gray-700">
                Engage, learn, and grow with our Mentor Student Live Chat Sessions! These interactive sessions connect you directly with experienced mentors who offer real-time support and personalized guidance. Whether you need help with a specific topic, advice on your academic or career path, or just a boost of motivation, our live chats provide an invaluable opportunity to receive immediate feedback and insights. Dive into dynamic discussions, enhance your understanding, and build meaningful connections with both mentors and peers. Join us to enrich your learning experience and achieve your goals with expert support.
                </p>
              </div>
              <img src="https://firebasestorage.googleapis.com/v0/b/edtech-project-9a72a.appspot.com/o/mentor.jfif?alt=media&token=77501226-f24f-45db-82c3-69cf783fc544" alt="Mentor Chat" className="w-full md:w-1/2" />
            </div>
          </div>
        </section>
        <section className="bg-orange-600 py-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Excel Beyond Exams</h3>
          <p className="text-lg mb-6">Discover membership plans that suit your learning needs. Flexible cancellation.</p>
          <div id="paypal-button-container" className="mx-auto max-w-sm">
            {user ? (
              <PayPalScriptProvider options={{ "client-id": "AQMuIrtB9h35K5gnfTp74KXC3lWuAmHmHyDjJot-LmDgwQW4NzQBbAcwLbLq-DY4caIpYZKewjxGkF8B&components=buttons" }}>
                <PayPalButton />
              </PayPalScriptProvider>
            ) : (
              <button onClick={() => alert('You must be logged in to make a payment.')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Login to Pay</button>
            )}
          </div>
        </section>
        <section className="bg-gray-100 py-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Apply Coupon Code</h3>
          <input 
            type="text" 
            placeholder="Enter coupon code" 
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border rounded px-3 py-2 mb-4"
          />
          <button onClick={applyCoupon} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Apply Coupon</button>
        </section>
      </main>
      {isLoginOpen && <Login onClose={closeLogin} />}
      {isSignupOpen && <Signup onClose={closeSignup} />}
      <Footer />
    </div>
  );
};

export default HomePage;
