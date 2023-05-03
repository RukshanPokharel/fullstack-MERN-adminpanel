
import { CssBaseline, ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Breakdown from "./scenes/breakdown";
import Admin from "./scenes/admin";
import Performance from "./scenes/performance";
import SignIn from "./scenes/auth/signIn";
import Signup from "./scenes/auth/signup";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.global.token));
  return (

    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/signin" />} />
              <Route path="/products" element={isAuth ? <Products /> : <Navigate to="/signin" />} />
              <Route path="/customers" element={isAuth ? <Customers /> : <Navigate to="/signin" />} />
              <Route path="/transactions" element={isAuth ? <Transactions /> : <Navigate to="/signin" />} />
              <Route path="/geography" element={isAuth ? <Geography /> : <Navigate to="/signin" />} />
              <Route path="/overview" element={isAuth ? <Overview /> : <Navigate to="/signin" />} />
              <Route path="/daily" element={isAuth ? <Daily /> : <Navigate to="/signin" />} />
              <Route path="/monthly" element={isAuth ? <Monthly /> : <Navigate to="/signin" />} />
              <Route path="/breakdown" element={isAuth ? <Breakdown /> : <Navigate to="/signin" />} />
              <Route path="/admin" element={isAuth ? <Admin /> : <Navigate to="/signin" />} />
              <Route path="/performance" element={isAuth ? <Performance /> : <Navigate to="/signin" />} />
            </Route>
            {/* auth routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
