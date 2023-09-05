import React, { useState, useEffect } from "react";

function Alert({ type, message, handleValidation }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically hide the alert after 5 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      handleValidation(true)
    }, 5000);

    return () => clearTimeout(timeout);
  }, [handleValidation]);

  let alertClasses = "rounded p-4 ";
  let textClasses = "font-semibold ";
  let animationClasses = "";

  switch (type) {
    case "success":
      alertClasses += "bg-green-100 text-green-800 border-green-300";
      textClasses += "text-green-800";
      animationClasses += isVisible ? "slide-up" : "slide-down";
      break;
    case "error":
      alertClasses += "bg-red-100 text-red-800 border-red-300";
      textClasses += "text-red-800";
      animationClasses += isVisible ? "slide-up" : "slide-down";
      break;
    case "warning":
      alertClasses += "bg-yellow-100 text-yellow-800 border-yellow-300";
      textClasses += "text-yellow-800";
      animationClasses += isVisible ? "slide-up" : "slide-down";
      break;
    case "info":
      alertClasses += "bg-blue-100 text-blue-800 border-blue-300";
      textClasses += "text-blue-800";
      animationClasses += isVisible ? "slide-up" : "slide-down";
      break;
    default:
      alertClasses += "bg-gray-100 text-gray-800 border-gray-300";
      textClasses += "text-gray-800";
      animationClasses += isVisible ? "slide-up" : "slide-down";
  }

  return (
    <div
      className={`fixed mx-auto flex items-center justify-center bottom-0 left-0 right-0 p-4 z-50 transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } ${animationClasses}`}
    >
      <div className={`border ${alertClasses}`}>
        <p className={textClasses}>{message}</p>
      </div>
    </div>
  );
}

export default Alert;
