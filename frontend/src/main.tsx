// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import App from "./App";
// import "./index.css";

// // React Query client
// const queryClient = new QueryClient();

// ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// ).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </QueryClientProvider>
//   </React.StrictMode>
// );

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { store } from './store/store'
import { AlertProvider } from './context/alertContext'
import { SessionProvider } from './context/sessionContext'
import { LoaderProvider } from './context/loaderContext'
import { ErrorLoggerProvider } from './context/errorLoggerContext'
 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store as any}>
        <ErrorLoggerProvider>
          <LoaderProvider>
            <AlertProvider>
              <SessionProvider>
                <App />
              </SessionProvider>
            </AlertProvider>
          </LoaderProvider>
        </ErrorLoggerProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
 
 
