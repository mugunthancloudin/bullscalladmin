import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Demo from "./pages/demo";
import ClassicPage from "./pages/classicData";
import Login from "./pages/login";
import MobileLogin from "./components/MobileLogin/mobileLogin";




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< LandingPage/>} />
          <Route path="/classicBetting" element={< Login/>} />
          <Route path="/chart" element={<Demo/>} />
          <Route path="/classic" element={<ClassicPage/>}/>
          <Route path="/mobile" element={<MobileLogin/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
