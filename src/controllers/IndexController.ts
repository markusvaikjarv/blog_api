import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Use /user route to register an user and log in')
})


export const IndexController: Router = router