import { Router, Request, Response } from 'express';
import * as bodyParser from 'body-parser'
import {Auth} from '../middlewares/Middlewares'
import * as jwt from 'jsonwebtoken'


const router: Router = Router();

//  "/User/..." accepts JSON. Body-parser converts request body to JSON
router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
router.use(Auth) //All routes under /posts/... require access token


router.post('/create', (req: Request, res: Response) => {
    if (!req.body.post) return res.status(500).send('Missing "post" field')
    const post = req.body.post
    const decodedT: string | { [key: string]: any; } | null = jwt.decode(req.body.access_token)

    console.log(`id: ${res.locals.UserId} auth success (/posts/create route)`) //UserId is taken from the decoded token in authorization middleware
    return res.status(200).send('Auth success')

})

export const PostsController: Router = router;

