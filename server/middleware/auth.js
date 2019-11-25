var auth = require("../auth/jwt");


var isLoggedIn = function (req, res, next) 
{
    console.log("middleware working!!")
    // try 
    // {
    //     var { token } = req.header

    //     var email = auth.verifyToken

        next();

    // } catch (error) {
    //     res.status(500).send();
    // }

}




module.exports = {
    isLoggedIn
}