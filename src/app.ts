import express from 'express'
import {IndexController, UsersController, PostsController} from './controllers/Controllers'
import {CreateUsersTable} from './database/DbOperations'

//Setup
export const app: express.Application = express();
CreateUsersTable() //Instantiates sqlite database

//Mounting controllers 
app.use('/', IndexController)
app.use('/user', UsersController)
app.use('/posts', PostsController)

export default app


