import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Conversation from "./pages/Conversation";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return isHomePage ? <Header /> : <Navbar />;
};

const App = () => {
  return (
    <Router>
      <div className="relative overflow-x-hidden">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
