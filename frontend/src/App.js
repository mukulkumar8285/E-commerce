import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loginpage, Signuppage, ActivationPage } from "./Routes.js";

function App() {
  return (
    <div className="App">
      <div className="text-[#000]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/activation/:activation_token" element={<ActivationPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
