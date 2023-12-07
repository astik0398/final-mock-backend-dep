const jwt = require('jsonwebtoken')

const auth = async(req, res, next)=> {
    const token = req.headers.authorization?.split(" ")[1]

    if(token){
        jwt.verify(token, "revision", (err, decoded)=> {
            if(decoded){
                req.body.userID = decoded.userID
                next()
            }
            else{
                res.send({"message": "you are not authorized"})
            }
        })
    }
    else{
        res.send({"message": "please log in"})
    }
}

module.exports = {
    auth
}