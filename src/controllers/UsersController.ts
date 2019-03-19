import { Router, Request, Response } from 'express';
import {CreateUser, FindUserByEmail} from '../database/DbOperations' //Database operations
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import * as bodyParser from 'body-parser'

const JWT_SECRET = "secretkeyforjwt123"


const router: Router = Router();

//  "/User/..." accepts JSON. Body-parser converts request body to JSON
router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());

router.post('/register', (req: Request, res: Response) => {

    const name: string = req.body.name
    const email: string  =  req.body.email;
    const password: string  =  bcrypt.hashSync(req.body.password);

    CreateUser([name, email, password], (err: any) => {
        if (err) return  res.status(500).send('Encountered an error while registering')
        FindUserByEmail(email, (err: any, user: any) => {
            if (err) return  res.status(500).send('Encountered an error while registering') 
            const  expiresIn  =  24  *  60  *  60
            const  accessToken  =  jwt.sign({ id:  user.id }, JWT_SECRET, {
                expiresIn:  expiresIn
            })

            res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn})
        })
    })
})

//If provided email and password are valid, return jwt with expiring time
router.post('/login', (req, res) => {

    const  email  =  req.body.email
    const  password  =  req.body.password

    FindUserByEmail(email, (err: any, user: any) => {
        if (err) return  res.status(500).send('Encountered an error while logging in')
        if (!user) return  res.status(404).send(`No user with email: ${email}`)
        const  result  =  bcrypt.compareSync(password, user.password)
        if(!result) return  res.status(401).send('Entered password is wrong')

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, JWT_SECRET, {
            expiresIn:  expiresIn
        })

        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn})
    })
})

router.get('/', (req: Request, res: Response) => {
    res.send('/register to register or /login to log in');
})

export const UsersController: Router = router;

