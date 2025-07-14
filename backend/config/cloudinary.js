//to post image or video using cloudinary
const cloudinary = require('cloudinary').v2;//v2 is version 2 of cloudinary
const multer = require('multer');
const {cloudinaryStorage} = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uplodFileTOCloudinary = (file) => {
    const options={
        resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
    }
    return new Promise((resolve, reject) => {
        //for video upload
        if(file.mimetype.startsWith('video')){
            cloudinary.uploader.upload_large(file.path, options, (error, result) => {
                if (error) {
                    return reject(error);
                } else {
                    return resolve(result);
                }
            })}
            else{
                //for image upload
                cloudinary.uploader.upload(file.path, options, (error, result) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(result);
                    }
                });
            }

})
}
const multerMiddleware = multer({dest: 'uploads/'})

module.exports = {
    uplodFileTOCloudinary,
    multerMiddleware,
}