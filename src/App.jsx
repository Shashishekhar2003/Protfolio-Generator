import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import Webpage from "./webpage";
import "./App.css";

// Import Firebase functions
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [submittedData, setSubmittedData] = useState(null);
  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      // Save data to Firestore
      console.log("Submitting data to Firestore:", data);
      const docRef = await addDoc(collection(db, "submissions"), data);
      {
        /* Changed to store document ID */
      }

      // Set the submitted data for later use
      setSubmittedData({ ...data, id: docRef.id });
      {
        /* Storing Firestore document ID */
      }

      const uniquePath = data.username
        ? `${data.username}-portfolio`
        : `portfolio-${docRef.id}`;

      // Navigate to /webpage with the portfolioId
      navigate(`/webpage/${uniquePath}`);

      //navigate(`/webpage/${docRef.id}`);  {/* Passing Firestore document ID as URL parameter */}
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form onSubmit={handleFormSubmit} />} />
        <Route path="/webpage/:portfolioId" element={<Webpage />} />{" "}
        {/* Changed to handle dynamic portfolioId */}
      </Routes>
    </Router>
  );
}

export default App;
