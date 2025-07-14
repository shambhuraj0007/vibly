const { uplodFileTOCloudinary } = require('../config/cloudinary'); 
const User = require("../model/User");
const Bio = require("../model/UserBio");
const responce = require("../utils/responceHandler"); 


// Create or Update User Bio
const createOrUpdateUserBio = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      bioText,
      liveIn,
      relationship,
      workplace,
      education,
      phone,
      hometown
    } = req.body;

    let bio = await Bio.findOneAndUpdate(
      { user: userId },
      {
        bioText,
        liveIn,
        relationship,
        workplace,
        education,
        phone,
        hometown
      },
      { new: true, runValidators: true }
    );

    if (!bio) {
      bio = new Bio({
        user: userId,
        bioText,
        liveIn,
        relationship,
        workplace,
        education,
        phone,
        hometown
      });

      await bio.save();
      await User.findByIdAndUpdate(userId, { bio: bio._id });
    }

    return responce(res, 201, "Bio created or updated successfully", bio);
  } catch (error) {
    console.log(error);
    return responce(res, 500, "Internal server error", error.message);
  }
};



// Update Cover Photo
const updateCoverPhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file;
    let coverPhoto = null;

    if (file) {
      const uploadResult = await uplodFileTOCloudinary(file);
      coverPhoto = uploadResult.secure_url;
    }

    if (!coverPhoto) {
      return responce(res, 400, "Failed to upload cover photo");
    }

    await User.updateOne(
      { _id: userId },
      {
        $set: { coverPhoto }
      }
    );

    const updateUser = await User.findById(userId);

    if (!updateUser) {
      return responce(res, 404, "User not found with this ID");
    }

    return responce(res, 200, "Cover photo updated successfully", updateUser);
  } catch (error) {
    console.log(error);
    return responce(res, 500, "Internal server error", error.message);
  }
};



// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, gender, dateOfBirth } = req.body;
    const file = req.file;
    let profilePicture = null;

    if (file) {
      const uploadResult = await uplodFileTOCloudinary(file);
      profilePicture = uploadResult.secure_url;
    }

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          username,
          gender,
          dateOfBirth,
          ...(profilePicture && { profilePicture })
        }
      }
    );

    const updateUser = await User.findById(userId);

    if (!updateUser) {
      return responce(res, 404, "User not found with this ID");
    }

    return responce(res, 200, "User profile updated successfully", updateUser);
  } catch (error) {
    console.log(error);
    return responce(res, 500, "Internal server error", error.message);
  }
};


module.exports = {
  createOrUpdateUserBio,
  updateCoverPhoto,
  updateUserProfile
};
