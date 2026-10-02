import User from "../models/user.js";
import { v4 } from "uuid";
import { setUser } from "../services/auth_service.js";

class UserController{
    async signUp(req, res){
        const {name, email, password} = req.body;
        await User.create({
            name,
            email,
            password
        });

        return res.json({
            msg: 'User Registered successfully'
        });
    }

    async logIn(req, res){
        const {email, password} = req.body;
        const user = await User.findOne({
            email,
            password
        });

        if(!user){
            return res.json({ msg: 'Invalid username or password' });
        }
        const sessionId = v4();
        
        setUser(sessionId, user);

        res.cookie('uid', sessionId);

        return res.json({
            msg: 'User logged in successfully'
        });
    }
}

export default UserController;