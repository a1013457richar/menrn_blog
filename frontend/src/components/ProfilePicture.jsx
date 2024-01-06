import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";

import { stables } from "../constants";
import CropEasy from "./crop/CropEasy";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../service/index/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userActions } from "../store/reducers/userReducers";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      //這裡的token是從userState.userInfo.token來的
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Photo is removed");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    //選取使用者上傳的檔案
    const file = e.target.files[0];
    //把檔案轉成網址
    setPhoto({ url: URL.createObjectURL(file), file });
    //打開crop的modal
    setOpenCrop(true);
  };
//後端有明確定義說，如果要刪除圖片，就要傳undefined
  const handleDeleteImage = () => {
    //確認使用者是否要刪除照片
    if (window.confirm("Do you want to delete your profile picture")) {
      try {
        const formData = new FormData();
        //這邊定義一個undefined，因為要刪除這個圖片，所以要傳undefined
        formData.append("profilePicture", undefined);
//會叫到上面的mutationFn，這裡的token是從userState.userInfo.token來的
        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      {openCrop &&
      //要render到哪個DOM裡面，第一個參數是要render的元件，第二個參數是要render到哪個DOM裡面
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}

      <div className="w-full flex items-center gap-x-4">
        <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 lutline-primary overflow-hidden">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
              //會返回到後端的圖片網址
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleDeleteImage}
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
