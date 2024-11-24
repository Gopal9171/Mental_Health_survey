import React, { useState } from "react";
import Navbar from "./component/Navbar/navbar";
import SurveyForm from "./component/Surveyform/surveyform";
import ConfirmationPage from "./component/Confirmationpage/confirmationPage";
import "./App.css";

const App = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log("Form Data Submitted:", formData);
    setSubmitted(true); // Simulate successful submission
  };

  return (
    <div className="app">
      <Navbar />
      {!submitted ? <SurveyForm onSubmit={handleFormSubmit} /> : <ConfirmationPage />}
    </div>
  );
};

export default App;
