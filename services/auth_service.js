import jwt from 'jsonwebtoken';
const secret = 'Saurabh@123'
    
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, secret)
}

function getUser(token){
    return jwt.verify(token, secret)
}

export { setUser, getUser };