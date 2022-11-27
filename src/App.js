import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { createContext, useState, useMemo } from "react";
import Nav from "./components/Nav";
import PostDetails from "./pages/PostDetails";

export const GlobalContext = createContext({
  isAuth: false,
  loading: false,
  setIsAuth: () => {},
  setLoading: () => {},
});

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [loading, setLoading] = useState(false);

  const value = useMemo(
    () => ({ isAuth, loading, setIsAuth, setLoading }),
    [isAuth, loading]
  );

  return (
    <div>
      <Router>
        <GlobalContext.Provider value={value}>
          <Nav isAuth={isAuth} setIsAuth={setIsAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/createpost"
              element={<CreatePost isAuth={isAuth} setLoading={setLoading} />}
            />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

            <Route
              path="/post/:id"
              element={
                <PostDetails
                  setIsAuth={setIsAuth}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
          </Routes>
        </GlobalContext.Provider>
      </Router>
    </div>
  );
};

export default App;
