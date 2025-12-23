// firestoreService.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import db from your Firebase configuration

// Function to save portfolio data
export async function savePortfolioData(portfolioId, data) {
  try {
    const docRef = doc(db, "portfolios", portfolioId);
    await setDoc(docRef, data);
    console.log("Portfolio data saved successfully");
  } catch (error) {
    console.error("Error saving document:", error);
  }
}
