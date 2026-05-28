const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // recup du token
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // recuper le userId
        const userId = decodedToken.userId;
        req.auth = { userId };
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Requête non authentifiée !" });
    }
};