import { getUser } from "../services/auth_service.js";

async function restrictToLoggedInUser(req, res, next) {
    const userUid = req.cookies?.uid;
    if(!userUid) return res.status(401).json({ msg: 'User is not authenticated!' });
    const user = getUser(userUid);
    if(!user) return res.status(401).json({ msg: 'User is not authenticated!' });
    req.user = user;
    next();
}

export default restrictToLoggedInUser;