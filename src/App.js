import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./screens/Cart";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/createuser" element={<SignUp />}></Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
