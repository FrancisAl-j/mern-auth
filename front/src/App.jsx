import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Indicator from "./components/Indicator";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <Nav />
        </header>
        <div>
          <Indicator />
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
