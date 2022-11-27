import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import Nav from "./components/Nav";


const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Router>
        <Nav isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route
            path="/"
            element={<Home isAuth={isAuth} loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/createpost"
            element={<CreatePost isAuth={isAuth} setLoading={setLoading} />}
          />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
