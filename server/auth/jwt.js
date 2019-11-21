var jwt = require('jsonwebtoken');

var secret = process.env.Secret || "secret";


getToken = ( email ) => 
{
    const token = jwt.sign({ email }, secret, { expiresIn: "6h" });
    return token
};

verifyToken = ( token ) => {
    var decoded = jwt.verify(token, secret);
    return decoded.email
}



module.exports = {
    getToken,
    verifyToken
}