import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import LoginPage from "./pages/auth/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

import UserContextProvider from './contexts/UserContext';
import GadgetContextProvider from './contexts/GadgetContext';

function App() {
  return (
    <div className="hs-webjs-app">
      <GadgetContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <ProtectedRoute exact={true} path="/" component={DashboardPage} />
              <ProtectedRoute component={DashboardPage} />
            </Switch>
          </BrowserRouter>
        </UserContextProvider>
      </GadgetContextProvider>
    </div>
  );
}

export default App;
