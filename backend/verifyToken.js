import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT, (err, user) => {
                if (err) {
                    return res.status(404).json({message: "Invalid token"});
                }
                req.user = user;
                next();
            })
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
}