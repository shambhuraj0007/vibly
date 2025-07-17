const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/authController');
const passport = require('passport');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ userId:user?._id,email:user.email }, process.env.JWT_SECRET,{expiresIn: '30d'});
}



router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout', logout)



//google oauth routes
router.get('/google',passport.authenticate('google',{
   scope: ['profile', 'email']

}))

//google callback routes
router.get('/google/callback', passport.authenticate('google', {failureRedirect: `${process.env.FRONTEND_URL}/user-login`, session:false}),
 (req,res) =>{ 
    const accessToken = generateToken(req?.user);
    res.cookie("auth_token",accessToken,{
        httpOnly: true,
        sameSite:"none",
        secure:true
    })
   res.redirect(`${process.env.FRONTEND_URL}`)
 }
)

module.exports = router;