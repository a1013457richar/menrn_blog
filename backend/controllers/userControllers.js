const { uploadPicture } = require("../middleware/uploadPictureMiddleware");
const User = require("../models/User");
const { fileRemover } = require("../utils/fileRemover");

const registerUser = async (req, res, next) => {
  try {
    //從req.body中取出name,email,password
    const { name, email, password } = req.body;
    // check whether the user exists or not(從email找)
    let user = await User.findOne({ email });
    //如果user存在，就拋出錯誤
    if (user) {
      throw new Error("User have already registered");
    }
    // creating a new user
    user = await User.create({
      name,
      email,
      password,
    });
    //
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    //pass the error object to the error handler middleware
    next(error);
  }
};
//loginUser
const loginUser = async (req, res, next) => {
  try {
    //從req.body中取出email,password
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }
    //會回傳true或false
    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
//updateProfile
const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
//先比較有沒有這個user
    if (!user) {
      throw new Error("User not found");
    }
//如果有這個user，就更新
//從req.body中取出name,email,password，如果沒有就用原本的
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 character");
    } else if (req.body.password) {
      user.password = req.body.password;
    }
//儲存更新後的user
    const updatedUserProfile = await user.save();
//回傳更新後的user
    res.json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};
//updateProfilePicture
const updateProfilePicture = async (req, res, next) => {
  try {
    //multer middleware
    //只能上傳一張圖片
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        // An unknown error occurred when uploading.
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        // every thing went well
        if (req.file) {
          //這邊找到user，然後把舊的圖片刪掉，再把新的圖片存進去
          //updated user
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            //如果有存在舊的圖片，就刪掉，作為更新圖片的方式
            fileRemover(filename);
          }
          updatedUser.avatar = req.file.filename;
          //存進新的圖片
          await updatedUser.save();
          //正確的回傳格式
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } 
        //如果沒有上傳圖片
        else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";

          await updatedUser.save();
          //這裡用到了utils/fileRemover.js
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
};
