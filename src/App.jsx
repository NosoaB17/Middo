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
import ProtectedRoute from "./routes/ProtectedRoute";

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
          <Route
            path="/signin"
            element={
              <ProtectedRoute requireAuth={false}>
                <Auth />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversation"
            element={
              <ProtectedRoute>
                <Conversation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
