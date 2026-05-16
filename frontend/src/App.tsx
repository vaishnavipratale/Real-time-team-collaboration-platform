import React from "react";
import AppRoutes from "@routes/appRoutes";
import NonAuthLayout from "@components/nonAuthLayout";
import { Layout } from "@components/component";
 
const PrivateWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => <Layout>{children}</Layout>;
 
const PublicWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <NonAuthLayout>{children}</NonAuthLayout>;
};
 
const App = () => {
  return (
    <AppRoutes
      PublicWrapper={PublicWrapper}
      PrivateWrapper={PrivateWrapper}
    />
  );
};
 
export default App;
 
 