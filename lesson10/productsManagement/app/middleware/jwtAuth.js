const jwt = require("jsonwebtoken");
const configuration = require("../config/config-jwt.js");
const database = require("../models");
const User = database.user;

verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];

    if (!bearer) {
        return res.status(400).json({
            success: false,
            message: "Auth token is required to access this page"
        })
    }

    let token = bearer.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            message: "Error when get token!"
        });
    }
    
    jwt.verify(token, configuration.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "User unauthorized!"
            });
        }

        req.userId = decoded.id;
        next();
    });
};

const jwtAuth = {
  verifyToken: verifyToken
};

module.exports = jwtAuth;
