import React, { useState } from "react";
import Cropper from "react-easy-crop";

import getCroppedImg from "./cropImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../../service/index/users";
import { useDispatch, useSelector } from "react-redux";
// import { resetUserInfo } from "../../redux/reducers/userReducers";
import { toast } from "react-hot-toast";
import { userSlice } from "../../redux/reducers/userReducers";

const CropEasy = ({ photo, setOpenCrop }) => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  //x,y是圖片的位置
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  //zoom是圖片的大小:最初的大小是1
  const [zoom, setzoom] = useState(1);
  //croppedAreaPixels是圖片的大小
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      //後端定義好的參數
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      // 正確使用 userSlice 中的 setUserInfo action
      dispatch(userSlice.actions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      console.log("1");
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Photo is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  
  //用handleCropComplete來更新croppedAreaPixels
  const handleCropComplete = (cropedArea, cropedAreaPixels) => {
    setCroppedAreaPixels(cropedAreaPixels);
  };

  const handleCropImage = async () => {
    try {
      //上傳圖片
      //getCroppedImg是一個async function，所以要用await
      //getCroppedImg會回傳一個file，所以要用const croppedImg來接
      const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);
      //把croppedImg.file轉成file
      //file是一個物件，裡面有name和type
      const file = new File([croppedImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });
      //把file放進formData
      const formData = new FormData();
      formData.append("profilePicture", file);
      //send the request to the server
      //這邊傳的是一個物件，裡面有token和formData
      mutate({ token: userState.userInfo.token, formData: formData });
      console.log("here"+formData);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
      <div className="bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h2 className="font-semibold text-dark-hard mb-2">Crop Image</h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1} //不允許圖片變形
            onZoomChange={setzoom} //圖片大小改變時，會觸發setzoom
            onCropChange={setCrop} //圖片位置改變時，會觸發setCrop
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          {/* 有一個label和input，input的type是range，可以讓使用者滑動來改變圖片的大小 */}
          <label
            htmlFor="zoomRage"
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-900"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setzoom(e.target.value)}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
            disabled={isLoading}
            onClick={() => setOpenCrop(false)}
            className="px-5 py-2.5 rounded-lg text-red-500 border border-red-500 text-sm disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleCropImage}
            className="px-5 py-2.5 rounded-lg text-white bg-blue-500 text-sm disabled:opacity-70"
          >
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
