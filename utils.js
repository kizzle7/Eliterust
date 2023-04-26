var jwt = require('jsonwebtoken');
var config =  require('./config');
module.exports ={
    getToken : (user) => {
        return jwt.sign({
            id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },
            config.JWT_SECRET, {
            expiresIn : '48h'
        })
    },

    isAuth: (req, res, next) => {
        const token = req.headers.authorization;
        if(token){
            const onlyToken = token.slice(7,token.length);
            jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
                if(err){
                    return res.status(401).send({msg: "Invalid Token"})
                }
                req.user = decode;
                next();
                return
            })
        }
        else{
            return res.status(401).send({msg: 'Token is not Supplied'})

        }
    },
    isAdmin : (req, res, next) => {
        if(req.users && req.users.isAdmin){
            return next();
            console.log('Result is ' + req.users)
        }
        return res.status(401).send({msg: 'Admin Token is not Valid'})
    },

    generateLink : (len) => {
    length = len;
    let link = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
    const characterLength = characters.length;
    for (let i = 0; i < length; i++) {
        link += characters.charAt(Math.floor(Math.random() * characterLength))
    }
    return link;
},

countDown: (hrs) => {
  const d = new Date();
   d.setHours(d.getHours() + hrs);
   return d;

},

generateRandom : (max) => {
    if (max == 1) return 0;
    else {
        var num = Math.floor(Math.random() * max);
        return (num === 0) ? generateRandom(max) : num;
    }
}
}
