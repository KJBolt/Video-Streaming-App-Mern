import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Function to generate and refresh access token
const generateToken = (user) => {
    return jwt.sign({id: user._id, isAdmin:user.isAdmin}, process.env.JWT, {expiresIn: "24h"});
};
const generateRefreshToken = (user) => {
    return jwt.sign({id: user._id, isAdmin:user.isAdmin}, process.env.RJWT);
};

// Sign Up
export const signup = async (req,res) => {
    try {
        const {name,email,password} = req.body

        const existingUser = await User.findOne({email:email});
        if(existingUser) {
            return res.status(404).json({message: "User already exists"})
        }
        const salt =  bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({name,email,password:hash});

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({error: error.message});
    };
};

// Sign in
export const signin = async (req, res) => {
    // If user exist
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({message: "Invalid credentials"})
        }

        // validate password
        const validatePassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validatePassword) {
            return res.status(404).json({message: "Invalid credentials"})
        }

        // Generate access and refresh token
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        const { password, ...others} = user._doc;

        return res.status(200).json({
            others,
            accessToken: token,
            refreshToken: refreshToken
        })

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}


// Sign in with Google
export const googleAuth = async(req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if (user) {
            const token = generateToken(user);
            const refreshToken = generateRefreshToken(user);
            
            return res.status(200).json({
                user:user,
                accessToken: token,
                refreshToken: refreshToken
            })
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const user = await newUser.save();
            const token = generateToken(user);
            const refreshToken = generateRefreshToken(user);
            

            return res.status(200).json({
                user,
                accessToken: token,
                refreshToken: refreshToken
            })
        }
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
}

