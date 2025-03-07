import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import Member from "./Pages/Member/Member";
import GeneralUser from "./Pages/GeneralUser/GeneralUser";
import MemberDetail from "./Pages/MEmberDetail/MemberDetail";
import 'react-toastify/dist/ReactToastify.css'
import Login from "./Components/Login/Login";

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let isLogedIn = localStorage.getItem("isLogin");
    if (isLogedIn) {
      setIsLogin(true);
      navigate('/dashboard')
    }else{
      setIsLogin(false)
      navigate("/")
    }
  }, [localStorage.getItem("isLogin")]);

  return (
    <div className="flex">
      {isLogin && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member" element= {<Member/>} />
        <Route path="/specific/:page" element= {<GeneralUser/>} />
        <Route path="/member/:id" element= {<MemberDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
