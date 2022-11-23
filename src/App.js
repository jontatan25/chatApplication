import React from 'react'
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./style.css";
import ChatJD from "./pages/ChatJD/ChatJD";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat" element={<ChatJD />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
