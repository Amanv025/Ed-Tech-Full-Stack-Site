import { collection, getDocs } from "firebase/firestore";
import { firestore } from "/Edtech/edtech-project/firebaseconfig.js";
export const fetchCourses = async () => {
    try {
      const coursesSnapshot = await getDocs(collection(firestore, "courses"));
      const coursesData = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return coursesData;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  };