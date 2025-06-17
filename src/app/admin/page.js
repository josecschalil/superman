"use client";
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import LoginPage from "../login/page";
import DashboardPage from "../dashboard/page";
const AuthRouter = ({ currentPage, setCurrentPage }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentPage === "login") {
      setCurrentPage("dashboard");
    } else if (!isAuthenticated && currentPage === "dashboard") {
      setCurrentPage("login");
    }
  }, [isAuthenticated, currentPage, setCurrentPage]);

  if (currentPage === "login" || !isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setCurrentPage("dashboard")} />;
  }

  return <DashboardPage />;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <AuthProvider>
      <AuthRouter currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </AuthProvider>
  );
};

export default App;
