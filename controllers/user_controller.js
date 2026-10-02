import User from "../models/user.js";
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
        
        const token = setUser(user);

        return res.json({
            msg: 'User logged in successfully',
            token
        });
    }
}

export default UserController;