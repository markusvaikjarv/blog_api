import sqlite3 from "sqlite3"

const database = new sqlite3.Database("./database.db")

export const  CreateUsersTable  = (): sqlite3.Database => {
    const  query  =  `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text,
        posts text)`;
    console.log('Created "users" table')
    return  database.run(query)
}

export const FindUserByEmail  = (email: string, callback: any) => {
    return  database.get(`SELECT * FROM users WHERE email = ?`,[email], (err, row) => {
            callback(err, row)
    })
}

export const CreateUser  = (user: string[], callback: any) => {
    return  database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)',user, (err) => {
        callback(err)
    })
}

export const addPost = (post: string, userId: number, callback: any) => {
    return  database.run('UPDATE users SET posts = ? WHERE id = ?',[post, userId], (err) => {
        callback(err)
    })
}