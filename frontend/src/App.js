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
import { server } from "./service/index/server.js";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Admin from "./pages/admin/screens/Admin.jsx";
import Comment from "./components/comments/Comment.jsx";

import ManagePosts from "./pages/admin/screens/posts/ManagePosts.jsx";
import EditPost from "./pages/admin/screens/posts/EditPost.jsx";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/account/login" element={<LoginPage/>}/>
        <Route path="/account/signup" element={<RegisterPage/>}/>
        <Route index path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />} >
          <Route index  element={<Admin />} />
          <Route path="comments"   element={<Comment />} />
    
          <Route path="posts/manage"   element={<ManagePosts />}  />
          <Route path="posts/manage/edit/:slug"   element={< EditPost/>}  />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
