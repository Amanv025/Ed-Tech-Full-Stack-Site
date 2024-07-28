import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseconfig.js";

// Fetch course descriptions
export const fetchCourseDescriptions = async () => {
  try {
    const courseDescriptionsSnapshot = await getDocs(collection(firestore, "coursedescriptions"));
    const courseDescriptionsData = courseDescriptionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return courseDescriptionsData;
  } catch (error) {
    console.error("Error fetching course descriptions:", error);
    return [];
  }
};
