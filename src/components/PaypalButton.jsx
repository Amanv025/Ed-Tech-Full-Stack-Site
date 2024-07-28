import { useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { auth } from '../../firebaseconfig.js'; // Adjust the path according to your project structure
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const PayPalButton = () => {
  const db = getFirestore();

  // Log render count
  useEffect(() => {
    console.log('PayPalButton rendered');
  }, []);

  const handleApprove = async (details) => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        purchases: arrayUnion({
          courseName: "Introduction to Python Programming",
          amount: 899,
          date: new Date(),
        })
      });

      alert("Thank you for your purchase!");
    } else {
      alert("You need to be logged in to make a purchase.");
    }
  };

  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
      createOrder={(data, actions) => actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '10.74',
          },
        }],
      })}
      onApprove={handleApprove}
      onError={(error) => {
        console.error('PayPal Error:', error);
        alert('An error occurred during the payment process.');
      }}
    />
  );
};

export default PayPalButton;
