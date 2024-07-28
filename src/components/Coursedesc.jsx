import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseDescriptions } from '/Edtech/edtech-project/fetchdata.js';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import PayPalButton from './PaypalButton';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { auth } from "/Edtech/edtech-project/firebaseconfig.js"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";

const CourseDescription = () => {
  const { courseTitle } = useParams(); // Extract courseTitle from URL params
  const [courseDescription, setCourseDescription] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [user, setUser] = useState(null); // State to manage user authentication
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const getCourseDescription = async () => {
      try {
        const descriptions = await fetchCourseDescriptions();
        console.log("Fetched descriptions:", descriptions); // Debugging line
        console.log("Course Title from URL:", courseTitle); // Debugging line

        // Find the course by matching `title`
        const course = descriptions.find(desc => desc.title === courseTitle);
        console.log("Found course:", course); // Debugging line

        setCourseDescription(course);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching course description:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    getCourseDescription();
  }, [courseTitle]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleHomeRedirect = () => {
    navigate('/'); // Navigate to the home page
  };

  const handlePay = () => {
    if (courseDescription && courseDescription.price) {
      // Replace with your payment integration logic
      alert(`Price for ${courseDescription.title}: ${courseDescription.price}`);
    } else {
      alert("Price information is not available.");
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600 py-6">Loading...</div>; // Display loading state
  }

  if (!courseDescription) {
    return <div className="text-center text-lg text-gray-600 py-6">No course description found.</div>; // Display message if no course is found
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={handleHomeRedirect} 
        className="bg-orange-600 text-white font-bold py-2 px-4 rounded mb-6 shadow-md hover:bg-orange-700 transition duration-300"
      >
        Home
      </button>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">{courseDescription.title}</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        {courseDescription.image && (
          <img src={courseDescription.image} alt={courseDescription.title} className="w-full h-48 object-cover" />
        )}
        <div className="p-6">
          <p className="text-gray-700 mb-4">{courseDescription.description}</p>
          <p className="text-gray-700 mb-4"><strong>Duration:</strong> {courseDescription.duration}</p>
          <p className="text-gray-700 mb-6"><strong>Price:</strong> {courseDescription.price}</p>
          
          <h3 className="text-3xl font-bold mb-6 text-orange-600">Curriculum</h3>
          <div className="space-y-6">
            {courseDescription.curriculum.map((item, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Week {item.week}: {item.topic}</h4>
                <p className="text-gray-700">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-orange-100 items-center">
        <div className="text-2xl font-bold text-gray-600 mb-4">
          Pay {courseDescription.price}
        </div>
        {user ? (
          <PayPalScriptProvider options={{ "client-id": "YAQMuIrtB9h35K5gnfTp74KXC3lWuAmHmHyDjJot-LmDgwQW4NzQBbAcwLbLq-DY4caIpYZKewjxGkF8B&components=buttons" }}>
            <PayPalButton />
          </PayPalScriptProvider>
        ) : (
          <button onClick={() => alert('You must be logged in to make a payment.')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Login to Pay</button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CourseDescription;
