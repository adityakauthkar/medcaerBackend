const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email });
  
        if (userExist) {
            return res.status(400).json({
                success: false,
                msg: 'Entered email id is already registered with us. Please Login'
            });
        } 
  
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            success: true,
            msg: 'Account Created Successfully, Please Login',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Server issue',
        });
    }
};

//Login
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
  
        if (user && (await user.matchPassword(password))) {
            res.json({
                success:"ok",
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({
                success: false,
                msg: 'Unauthorized user'
            });
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Server issue',
        });
    }
};


//get User Profile: 
const getProfile = async (req , res ) => {
try{
    const user = await User.findById(req.user._id).select("-password");
    if(user){
        res.status(202).json({
            _id: user._id,
            username:user.username,
            email : user.email, 
            createdAt: user.createdAt,
        })
    } else {
        res.status(404).json({
            success: false,
            msg: 'User not found',
        });
    }
}catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        msg: 'Server issue',
    });
}
};




module.exports = { registerUser, authUser  , getProfile};
