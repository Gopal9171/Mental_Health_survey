// import React, { useState } from "react";
// import "./surveyform.css";

// const SurveyForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     gender: "",
//     age: "",
//     drops: "",
//     location: "",
//     studyHoursDuringJEE: "",
//     sleepHoursDuringJEE: "",
//     sadnessFrequency: "",
//     anxietyFrequency: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="survey-form-container" id="survey">
//       <h2>Take the Survey</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Gender:</label>
//         <select name="gender" onChange={handleChange} required>
//           <option value="">Select</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Age:</label>
//         <input
//           type="number"
//           name="age"
//           placeholder="Enter your age"
//           onChange={handleChange}
//           required
//         />

//         <label>Number of Drops After 12th (in years):</label>
//         <input
//           type="number"
//           name="drops"
//           placeholder="e.g., 1"
//           onChange={handleChange}
//           required
//         />

//         <label>Area in Which You Live:</label>
//         <input
//           type="text"
//           name="location"
//           placeholder="City or Village"
//           onChange={handleChange}
//           required
//         />

//         <label>Hours Studied Daily During JEE Preparation:</label>
//         <input
//           type="number"
//           name="studyHoursDuringJEE"
//           onChange={handleChange}
//           required
//         />

//         <label>Average Sleep Hours During JEE Preparation:</label>
//         <input
//           type="number"
//           name="sleepHoursDuringJEE"
//           onChange={handleChange}
//           required
//         />

//         <label>Sadness Frequency (0 to 4):</label>
//         <input
//           type="number"
//           name="sadnessFrequency"
//           min="0"
//           max="4"
//           onChange={handleChange}
//           required
//         />

//         <label>Anxiety Frequency (0 to 4):</label>
//         <input
//           type="number"
//           name="anxietyFrequency"
//           min="0"
//           max="4"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default SurveyForm;
import React, { useState } from "react";
import axios from "axios";
import "./surveyform.css";

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    drops: "",
    location: "",
    studyHoursDuringJEE: "",
    sleepHoursDuringJEE: "",
    sadnessFrequency: "",
    anxietyFrequency: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { age, drops, sadnessFrequency, anxietyFrequency } = formData;
    if (age < 1 || age > 100) return "Please enter a valid age.";
    if (drops < 0 || drops > 10) return "Number of drops should be between 0 and 10.";
    if (sadnessFrequency < 0 || sadnessFrequency > 4)
      return "Sadness frequency must be between 0 and 4.";
    if (anxietyFrequency < 0 || anxietyFrequency > 4)
      return "Anxiety frequency must be between 0 and 4.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      // Send data to the backend
      const response = await axios.post("http://localhost:5000/api/survey/submit", formData);

      // Handle the backend response
      if (response.status === 200) {
        setSuccessMessage("Survey submitted successfully!");
        setFormData({
          gender: "",
          age: "",
          drops: "",
          location: "",
          studyHoursDuringJEE: "",
          sleepHoursDuringJEE: "",
          sadnessFrequency: "",
          anxietyFrequency: "",
        });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit the survey. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="survey-form-container" id="survey">
      <h2>Take the Survey</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Number of Drops After 12th (in years):</label>
        <input
          type="number"
          name="drops"
          placeholder="e.g., 1"
          value={formData.drops}
          onChange={handleChange}
          required
        />

        <label>Area in Which You Live:</label>
        <input
          type="text"
          name="location"
          placeholder="City or Village"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Hours Studied Daily During JEE Preparation:</label>
        <input
          type="number"
          name="studyHoursDuringJEE"
          value={formData.studyHoursDuringJEE}
          onChange={handleChange}
          required
        />

        <label>Average Sleep Hours During JEE Preparation:</label>
        <input
          type="number"
          name="sleepHoursDuringJEE"
          value={formData.sleepHoursDuringJEE}
          onChange={handleChange}
          required
        />

        <label>Sadness Frequency (0 to 4):</label>
        <input
          type="number"
          name="sadnessFrequency"
          min="0"
          max="4"
          value={formData.sadnessFrequency}
          onChange={handleChange}
          required
        />

        <label>Anxiety Frequency (0 to 4):</label>
        <input
          type="number"
          name="anxietyFrequency"
          min="0"
          max="4"
          value={formData.anxietyFrequency}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
