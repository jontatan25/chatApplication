import Chat from "./components/chat/Chat";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";

import "./style.css"

function App() {
  return (
    <>
    <header>
      <NavBar/>
    </header>
    <Home/> 
    <Chat/>
    </>
  );
}

export default App;
