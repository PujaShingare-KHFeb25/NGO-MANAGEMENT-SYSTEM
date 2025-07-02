import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key in production

const authMiddleware = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return response.status(StatusCodes.UNAUTHORIZED).send("Access Denied: No Token Provided");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        response.status(StatusCodes.UNAUTHORIZED).send("Invalid Token");
    }
};

export default authMiddleware;