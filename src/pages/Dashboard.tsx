import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/context/auth-context";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Route based on user role
    switch (user.role) {
      case "admin":
        navigate("/managers");
        break;
      case "gestionnaire_cours":
        navigate("/gestionnaireCours/gc-dashboard"); 
        break;
      case "etudiant":
        navigate("/student-dashboard");
        break;
      default:
        navigate("/login");
    }
  }, [user, navigate]);

  return <div>Redirection...</div>;
};

export default Dashboard;
