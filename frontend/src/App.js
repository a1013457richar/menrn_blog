import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import LoginPageGroup from "./pages/loginby/LoginPageGroup.jsx";
import { server } from "./service/index/server.js";
// import LoginPagewithGoogle from "./pages/loginby/LoginPagewithGoogle.jsx";
function App() {
  // const [user, setUser] = useState(null);
  // const getUser = async (user) => {
  //   try {
  //     const url = `${server}/auth/login/success`;
  //     const { data } = await axios.get(url, {
  //       withCredentials: true,
  //     });
  //     setUser(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/blog/:id" element={<ArticleDetailPage />} />
        {/* <Route index path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/login" element={<LoginPageGroup />}></Route> */}
        {/* <Route path="/loginwithgoogle" element={<LoginPagewithGoogle />} /> */}
        {/* <Route path="/loginwithemail" element={<LoginPage />} /> */}
        <Route path="/account/login" element={<LoginPage/>}/>
        <Route path="/account/signup" element={<RegisterPage/>}/>
        <Route index path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
