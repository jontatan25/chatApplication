import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";

import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./style.css";
import ChatJD from "./pages/ChatJD/ChatJD";
import ChatContextProvider from "./context/ChatContextProvider";
import AboutUs from "./pages/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ChatContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<ChatJD />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="*" element={<h3>NOT FOUND</h3>} status={404}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ChatContextProvider>
  );
}

export default App;
