import React from "react";
import Login from "./auth/login";

const Home: React.FC = () => {
  const handleSuccessfulAuth = () => {
    // Handle successful authentication
  };

  const handleSuccessfulDoctorAuth = () => {
    // Handle successful doctor authentication
  };

  const handleLogin = () => {
    // Handle login
  };
  const updateLoginStatus = (status: boolean) => {
    console.log("Login status updated:", status);
    // Handle login
  };

  return (
    <div>
      <Login
        handleSuccessfulAuth={handleSuccessfulAuth}
        handleSuccessfulDoctorAuth={handleSuccessfulDoctorAuth}
        handleLogin={handleLogin}
        updateLoginStatus={updateLoginStatus}
      />
    </div>
  );
};

export default Home;
