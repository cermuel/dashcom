import ThemeContext from "./context/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import User from "./pages/User";

function App() {
  return (
    <ThemeContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashcom/home" element={<Home />} />
          <Route path="/dashcom/workspace/:id" element={<Workspace />} />
          <Route path="/dashcom/user/:id" element={<User />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext>
  );
}

export default App;
