import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "@routes/allRoutes";
import ProtectedRoute from "@routes/protectedRoute";
 
interface AppRoutesProps {
  PublicWrapper: React.ComponentType<{ children: React.ReactNode }>;
  PrivateWrapper: React.ComponentType<{ children: React.ReactNode }>;
}
 
const AppRoutes: React.FC<AppRoutesProps> = ({ PublicWrapper, PrivateWrapper }) => (
  <Routes>
    {publicRoutes.map(({ path, component }) => (
      <Route
        key={path}
        path={path}
        element={<PublicWrapper>{component}</PublicWrapper>}
      />
    ))}
    {protectedRoutes.map(({ path, component }) => (
      <Route
        key={path}
        path={path}
        element={
          <ProtectedRoute>
            <PrivateWrapper>{component}</PrivateWrapper>
          </ProtectedRoute>
        }
      />
    ))}
  </Routes>
);
 
export default AppRoutes;
 
 
