import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:movieId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
