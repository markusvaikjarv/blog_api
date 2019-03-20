import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../jwt/JWTStrategy'


export const Auth = (req: Request, res: Response, next: any) => {
    const access_token = req.body.access_token
    jwt.verify(access_token, JWT_SECRET, function(err: any, decoded: any) {

        if (err) return  res.status(401).send('Invalid token. Unauthorized')
        res.locals.UserId = decoded.id
        console.log(`User with id: ${decoded.id} accessed a protected route (auth middleware)`) 
    })
    next()
}