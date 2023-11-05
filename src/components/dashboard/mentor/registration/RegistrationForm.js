import React, { useState } from "react";
import UserDetails from "./UserDetails";
import Confirmation from "./Confirmation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import Navbar from "../../common/Navbar";

export default function RegistrationForm() {
  const { userDetails } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: userDetails.email,
    department: "",
    year: "",
    size: "",
    imgSrc: "",
  });
  const departmentOptions = {
    "B-CSB": "CSB (B.Tech.)",
    "B-CSSS": "CSSS (B.Tech.)",
    "B-CSD": "CSD (B.Tech.)",
    "B-CSE": "CSE (B.Tech.)",
    "B-CSAI": "CSAI (B.Tech.)",
    "B-CSAM": "CSAM (B.Tech.)",
    "B-ECE": "ECE (B.Tech.)",
    "B-EVE": "EVE (B.Tech.)",
    "M-CSE": "CSE (M.Tech.)",
    "M-ECE": "ECE (M.Tech.)",
    "M-CB": "CB (M.Tech.)",
  };

  const yearOptions = {
    B1: "B.Tech. 1st year",
    B2: "B.Tech. 2nd year",
    B3: "B.Tech. 3rd year",
    B4: "B.Tech. 4th year",
    M1: "M.Tech. 1st year",
    M2: "M.Tech. 2nd year",
  };

  const sizeOptions = {
    S: "Small",
    M: "Medium",
    L: "Large",
    XL: "Extra Large",
    XXL: "XXL",
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      if (file.size > 200000) {
        alert("Image size exceeds 200KB. Please select a smaller image.");
        e.target.value = null; // Clear the selected file
      } else {
        // Handle the selected image, e.g., store it in component state
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageBase64 = event.target.result; // Base64-encoded image
          setFormData({
            ...formData,
            imgSrc: imageBase64,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const navigate = useNavigate();

  const saveAndContinue = (e) => {
    e.preventDefault();

    // code for writing to the file or database

    navigate("/login");
  };

  return (
    <div>
      <Navbar className="fixed-top" />
      {step === 1 && (
        <UserDetails
          nextStep={nextStep}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          inputValues={formData}
          sizeOptions={sizeOptions}
          yearOptions={yearOptions}
          departmentOptions={departmentOptions}
        />
      )}
      {step === 2 && (
        <Confirmation
          nextStep={nextStep}
          prevStep={prevStep}
          inputValues={formData}
          sizeOptions={sizeOptions}
          yearOptions={yearOptions}
          departmentOptions={departmentOptions}
          saveAndContinue={saveAndContinue}
        />
      )}
    </div>
  );
}