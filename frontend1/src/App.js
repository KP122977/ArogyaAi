// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import DiseasePredictor from "./components/DiseasePredictor";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<DiseasePredictor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css"; // Import the external CSS

// function App() {
//   const [allSymptoms, setAllSymptoms] = useState([]);
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [prescription, setPrescription] = useState("");

//   useEffect(() => {
//     setAllSymptoms([
//       "itching", "skin_rash", "fatigue", "vomiting", "headache", "fever",
//       "joint_pain", "nausea", "diarrhea", "cough", "chills", "dizziness"
//     ]);
//   }, []);

//   const toggleSymptom = (symptom) => {
//     if (selectedSymptoms.includes(symptom)) {
//       setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
//     } else {
//       setSelectedSymptoms([...selectedSymptoms, symptom]);
//     }
//   };

//   const handlePredict = async () => {
//     if (selectedSymptoms.length === 0) {
//       alert("Please select at least one symptom.");
//       return;
//     }

//     const symptomsDict = {};
//     allSymptoms.forEach((symptom) => {
//       symptomsDict[symptom] = selectedSymptoms.includes(symptom) ? 1 : 0;
//     });

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/predict/", {
//         symptoms: symptomsDict,
//       });
//       setResult(response.data.predictions || "No prediction found.");
//       setError(null);
//     } catch (err) {
//       console.error("Prediction failed:", err);
//       setResult(null);
//       setError("Something went wrong. Please try again.");
//     }
//   };
//   // const handlePrescribe = async () => {
//   // try {
//   //   const response = await axios.post("http://127.0.0.1:8000/prescribe/", {
//   //     disease: result[0].disease,  // sending top predicted disease
//   //   });
//   //   setPrescription(response.data.prescription);
//   // } catch (err) {
//   //   console.error("Prescription failed:", err);
//   //   setPrescription("Failed to generate prescription.");
//   // }
//   const handlePrescribe = async () => {
//   if (!result || result.length === 0 || !result[0].disease) {
//     alert("No valid prediction available to prescribe.");
//     return;
//   }

//   try {
//     const response = await axios.post("http://127.0.0.1:8000/prescribe/", {
//       disease: result[0].disease,
//     });
//     setPrescription(response.data.prescription);
//   } catch (err) {
//     console.error("Prescription failed:", err);
//     setPrescription("Failed to generate prescription.");
//   }
// };

//   return (
//     // <div className="app-container">
//     //   <div className="card">
//     //     <h2 className="title">🧠 AI Disease Predictor</h2>

//     //     <div className="symptom-section">
//     //       <h4>Select Your Symptoms:</h4>
//     //       <div className="symptom-list">
//     //         {allSymptoms.map((symptom) => (
//     //           <label key={symptom} className="checkbox-label">
//     //             <input
//     //               type="checkbox"
//     //               value={symptom}
//     //               checked={selectedSymptoms.includes(symptom)}
//     //               onChange={() => toggleSymptom(symptom)}
//     //             />
//     //             <span className="symptom-name">{symptom}</span>
//     //           </label>
//     //         ))}
//     //       </div>
//     //     </div>

//     //     <button className="predict-button" onClick={handlePredict}>
//     //       🔍 Predict
//     //     </button>

//     //     {result && Array.isArray(result) && (
//     //       <div className="result-box">
//     //         <h4>Prediction Result:</h4>
//     //         <ul>
//     //           {result.map((item, index) => (
//     //             <li key={index}>
//     //               <strong>{item.disease}</strong> — {(item.probability * 100).toFixed(2)}%
//     //             </li>
//     //           ))}
//     //         </ul>
//     //       </div>
//     //     )}
//     //     {result && result.length > 0 && (
//     //    <button onClick={handlePrescribe} className="prescribe-btn">Prescribe</button>
//     //     )}
        
//     //   {prescription && (
//     //       <div className="prescription-box">
//     //       <div className="prescription-title">🩺 Doctor's Prescription:</div>
//     //       <div>{prescription}</div>
//     //       </div>
//     //    )}


//     //     {error && <div className="error-message">{error}</div>}
//     //   </div>
//     // </div>

//     <div className="app-container">
//   <div className="card">
//     <h2 className="title">🧠 AI Disease Predictor</h2>

//     <div className="symptom-section">
//       <h4>Select Your Symptoms:</h4>
//       <div className="symptom-list">
//         {allSymptoms.map((symptom) => (
//           <label key={symptom} className="checkbox-label">
//             <input
//               type="checkbox"
//               value={symptom}
//               checked={selectedSymptoms.includes(symptom)}
//               onChange={() => toggleSymptom(symptom)}
//             />
//             <span className="symptom-name">{symptom}</span>
//           </label>
//         ))}
//       </div>
//     </div>

//     {/* Form for Prediction */}
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         handlePredict();
//       }}
//     >
//       <button type="submit" className="predict-button">
//         🔍 Predict
//       </button>
//     </form>

//     {/* Show result if available */}
//     {result && Array.isArray(result) && (
//       <div className="result-box">
//         <h4>Prediction Result:</h4>
//         <ul>
//           {result.map((item, index) => (
//             <li key={index}>
//               <strong>{item.disease}</strong> — {(item.probability * 100).toFixed(2)}%
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}

//     {/* Form for Prescription */}
//     {result && result.length > 0 && (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handlePrescribe();
//         }}
//         action='prescribe/'
//       >
//         <button type="submit" className="prescribe-btn">
//           📝 Prescribe
//         </button>
//       </form>
//     )}

//     {/* Prescription Output */}
//     {prescription && (
//       <div className="prescription-box">
//         <div className="prescription-title">🩺 Doctor's Prescription:</div>
//         <pre>{prescription}</pre>
//       </div>
//     )}

//     {/* Error Message */}
//     {error && <div className="error-message">{error}</div>}
//   </div>
// </div>

//   );
// }

// export default App;
