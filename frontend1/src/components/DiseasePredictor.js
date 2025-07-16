import React, { useState, useEffect } from "react";
// axios is kept for the prediction part, assuming you might still use a backend for that.
// If you also want to move prediction to a direct API call, that would be a separate update.
import axios from "axios";

function DiseasePredictor() {
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null); // Stores disease prediction results
  const [error, setError] = useState(null); // Stores general error messages for UI
  const [prescription, setPrescription] = useState(""); // Stores generated prescription
  const [loadingPrediction, setLoadingPrediction] = useState(false); // Loading state for prediction
  const [loadingPrescription, setLoadingPrescription] = useState(false); // Loading state for prescription

  // Initialize all symptoms when the component mounts
  useEffect(() => {
    setAllSymptoms([
      "itching", "skin_rash", "fatigue", "vomiting", "headache", "fever",
      "joint_pain", "nausea", "diarrhea", "cough", "chills", "dizziness"
    ]);
  }, []);

  /**
   * Toggles the selection of a symptom.
   * @param {string} symptom - The symptom to toggle.
   */
  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  /**
   * Handles the disease prediction process by sending selected symptoms to a backend.
   * This part still uses axios to a local backend as per your original code.
   */
  const handlePredict = async () => {
    // Clear previous errors and results
    setError(null);
    setResult(null);
    setPrescription("");

    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom to predict.");
      return;
    }

    // Create a dictionary of symptoms with 1 for selected, 0 for not selected
    const symptomsDict = {};
    allSymptoms.forEach((symptom) => {
      symptomsDict[symptom] = selectedSymptoms.includes(symptom) ? 1 : 0;
    });

    setLoadingPrediction(true); // Start loading for prediction
    try {
      // Make API call to your prediction backend
      const response = await axios.post("http://127.0.0.1:8000/predict/", {
        symptoms: symptomsDict,
      });
      setResult(response.data.predictions || []);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Prediction failed:", err);
      setResult(null);
      setError("Failed to predict disease. Please ensure your prediction backend is running and try again.");
    } finally {
      setLoadingPrediction(false); // End loading for prediction
    }
  };

  /**
   * Handles the prescription generation process using the Gemini API directly.
   * This function has been updated to remove the axios call to a local backend.
   */
  const handlePrescribe = async () => {
    // Clear previous errors and prescription
    setError(null);
    setPrescription("");

    // Validate if a disease has been predicted
    if (!result || result.length === 0 || !result[0].disease) {
      setError("No valid disease predicted yet. Please predict a disease first.");
      return;
    }

    const disease = result[0].disease; // Get the predicted disease from the result
    setLoadingPrescription(true); // Start loading for prescription

    // Construct the prompt for the Gemini model
    const prompt = `You are a licensed medical doctor. Write a detailed prescription for a patient diagnosed with ${disease}. Include:

- Medicine names
- Dosage (e.g., 500mg, 1 tablet)
- Timing (e.g., morning, after food)
- Duration (e.g., 5 days)
- Advice and precautions

Format it like a professional doctor's prescription.`;

    // Prepare the payload for the Gemini API request
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };

    // The API key is handled by the environment, so it's left empty here.
    const apiKey = "AIzaSyBDqpkZT8Fzt2V-9b_pGytK7_bjs4Gqljk";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      // Make the fetch call to the Gemini API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Check if the API response was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${errorData.error.message || 'Unknown error'}`);
      }

      // Parse the JSON response from Gemini
      const apiResult = await response.json();

      // Extract the generated text (prescription)
      if (apiResult.candidates && apiResult.candidates.length > 0 &&
          apiResult.candidates[0].content && apiResult.candidates[0].content.parts &&
          apiResult.candidates[0].content.parts.length > 0) {
        const text = apiResult.candidates[0].content.parts[0].text;
        setPrescription(text); // Set the generated prescription
      } else {
        setError("No content generated by the AI for the prescription. Please try again.");
      }

    } catch (err) {
      console.error("Prescription generation failed:", err);
      setError(`Failed to generate prescription: ${err.message}. Please try again later.`);
    } finally {
      setLoadingPrescription(false); // End loading for prescription
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">🧠 AI Disease Predictor</h2>

        <div>
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Select Your Symptoms:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allSymptoms.map((symptom) => (
              <label
                key={symptom}
                className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition-transform hover:scale-105
                           ${selectedSymptoms.includes(symptom) ? 'bg-blue-200 border-blue-400' : 'bg-blue-50 border-blue-200'}`}
              >
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  value={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                />
                <span className="capitalize text-gray-700">{symptom.replace("_", " ")}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
          <button
            onClick={handlePredict}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingPrediction} // Disable button while predicting
          >
            {loadingPrediction ? 'Predicting...' : '🔍 Predict'}
          </button>

          {/* Only show Prescribe button if a result is available and not currently loading prescription */}
          {result && result.length > 0 && result[0].disease && (
            <button
              onClick={handlePrescribe}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingPrescription || loadingPrediction} // Disable if predicting or prescribing
            >
              {loadingPrescription ? 'Generating Prescription...' : '📝 Prescribe'}
            </button>
          )}
        </div>

        {/* Loading indicators */}
        {(loadingPrediction || loadingPrescription) && (
          <div className="mt-4 text-center text-blue-600 font-medium">
            {loadingPrediction && "Predicting disease..."}
            {loadingPrescription && "Generating prescription..."}
          </div>
        )}

        {/* Result Box */}
        {result && Array.isArray(result) && result.length > 0 && (
          <div className="mt-10 bg-blue-50 rounded-xl p-6 shadow-md animate-fade-in-up">
            <h4 className="text-lg font-bold text-blue-700 mb-3">Prediction Result:</h4>
            <ul className="list-disc pl-6 text-gray-700">
              {result.map((item, index) => (
                <li key={index}>
                  <strong>{item.disease}</strong> — {(item.probability * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prescription Box */}
        {prescription && (
          <div className="mt-10 bg-green-50 border-l-4 border-green-500 rounded-xl p-6 shadow-md animate-fade-in-up">
            <h4 className="text-lg font-bold text-green-700 mb-3">🩺 Doctor's Prescription:</h4>
            <pre className="whitespace-pre-wrap text-gray-800">{prescription}</pre>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-100 text-red-800 p-4 rounded-lg shadow-md border border-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseasePredictor;