import express from 'express';
import UserController from '../controllers/user_controller.js';

const UserRouter = express.Router();
const userController = new UserController();

UserRouter.route('/signup').post(userController.signUp);
UserRouter.route('/login').post(userController.logIn);

export default UserRouter;