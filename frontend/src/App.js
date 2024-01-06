import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage.jsx";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/blog/:id" element={<ArticleDetailPage/>} />
        <Route index path="/register" element={<RegisterPage/>} />
        <Route index path="/login" element={<LoginPage/>} />
        <Route index path="/profile" element={<ProfilePage/>} />
      </Routes>
      <Toaster />
      
    </div>
  );
}

export default App;
