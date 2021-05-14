// let validateJWT = require('../middleware/validate-jwt');
const router = require('express').Router();
const {UserModel} = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/user');

/////// REGISTER USER - POST /////////////
router.post("/register", async(req, res) => {
    const {firstName, lastName, email, password, isAdmin} = req.body.user;
    try{
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 15),
            isAdmin,
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        
    res.status(201).json({
        message: "User successfully registered",
        user: User,
        sessionToken: token
    });
} catch (err) {
    if (err instanceof UniqueConstraintError){
        res.status(409).json({
            message: "Email already in use",
        });
    } else {
    res.status(500).json({
        message: "Failed to register user"
    });
}
}
});

/////////////// USER LOGIN //////////////

router.post('/login', async(req, res) => {
    const {email, password } = req.body.user;

    try{
        let loginUser = await UserModel.findOne({
         where: {
            email: email,
        },
    });
    if(loginUser){

        let passwordComparison = await bcrypt.compare(password, loginUser.password);
        
        if (passwordComparison){
            const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET); //should it be loginUser? Or AdminUser?

        res.status(200).json({
            user: loginUser,
            message: "User successfully logged in!",
            sessionToken: token
    }); 
    } else {
    res.status(401).json({
        message: "Incorrect email or password"
    })
}
    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        });
    }
    } catch (error) {
    res.status(500).json({
        message: "Failed to log user in"
    })
}
});

module.exports = router;