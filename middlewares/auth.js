import { getUser } from "../services/auth_service.js";

async function restrictToLoggedInUser(req, res, next) {
    const userUid = req.headers['authorization'];
    if(!userUid) return res.status(401).json({ msg: 'User is not authenticated!' });
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);
    if(!user) return res.status(401).json({ msg: 'User is not authenticated!' });
    req.user = user;
    next();
}

function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user) return res.status(401).json({ msg: 'User is not authenticated!' });
        console.log(req.user);
        console.log('Role ', req.user.role);
        if(!roles.includes(req.user.role)){
            return res.status(403).json({msg: 'User in not authorized'});
        }

        next();
    }
}

export default restrictToLoggedInUser;
export { restrictTo }