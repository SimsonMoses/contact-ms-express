import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';


export const validTokenHandler = expressAsyncHandler( (req, res, next) => {
    console.log('valid token handler');
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);
    
    if(!authHeader){
        res.status(401);
        throw new Error('Token not found');
    }
    let token = authHeader.split(' ')[1];
    console.log(token);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err){
            res.status(401);
            throw new Error('Invalid token');
        }
        req.user = data.user;
        next();
    })
})