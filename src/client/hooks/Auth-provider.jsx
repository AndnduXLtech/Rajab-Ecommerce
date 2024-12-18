import React, { createContext, useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage("authToken", null);
  const [myRole, setRole] = useLocalStorage("role", null);
  const qc = useQueryClient();
  const navigate = useNavigate();

  function logout() {
    setRole(null);
    setToken(null);
    qc.clear();
  }

  function ProtectedComponent() {
    if (!token) return <Navigate to={"/auth/login"} />;
    return <Outlet />;
  }

  function ProtectedComponentWithChildred({ children }) {
    if (!token) return <Navigate to={"/auth/login"} />;
    return children;
  }

  function SuperadminComponent() {
    if (myRole !== "superadmin" && myRole !== "admin") {
      return <Navigate to={"/auth/login"} />;
    }
    return <Outlet />;
  }

  const ProtectedAdminRoute = ({ allowedRoles, children }) => {
    if (!allowedRoles.includes(myRole)) {
      return <Navigate to={"/auth/login"} />;
    }

    return children;
  };

  function login() {
    navigate("/auth/login");
  }

  const value = {
    myRole,
    ProtectedComponent,
    ProtectedComponentWithChildred,
    setToken,
    setRole,
    logout,
    login,
    SuperadminComponent,
    ProtectedAdminRoute,
    token,
    isLoggedIn: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
