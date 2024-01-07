// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { server } from "../../service/index/server";
// import { useDispatch, useSelector } from "react-redux";

// import MainLayout from "../../components/MainLayout";
// import { login } from "../../service/index/users";
// import { userActions } from "../../redux/store/reducers/userReducers";
// import LoginPage from "../login/LoginPage";

// const LoginPageGroup = () => {
//   const navigate = useNavigate();
//   // console.log("object");
//   const handleGoogleLogin = () => {
//     window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
//   };
//   return (
//     <>
//       <MainLayout>
//         <div className="flex flex-col items-center justify-center space-y-4 py-8">
//           <div className="bg-dark-soft text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
//             <button
//               onClick={handleGoogleLogin}
//               // onClick={() => navigate("/loginwithgoogle")}
//               type="button"
//               className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
//             >
//               Login in by google
//             </button>
//           </div>
//           <div className="bg-dark-soft text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
//             <button
//               onClick={() => navigate("/loginwithemail")}
//               type="button"
//               className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
//             >
//               Login in by email
//             </button>
//           </div>
//         </div>
//       </MainLayout>
//     </>
//   );
// };

// export default LoginPageGroup;
