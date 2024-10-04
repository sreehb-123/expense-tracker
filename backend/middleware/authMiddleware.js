import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req,res,next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({message: 'No token, authentication denied'});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({message: 'Invalid token'});
    }
};

export default authMiddleware;