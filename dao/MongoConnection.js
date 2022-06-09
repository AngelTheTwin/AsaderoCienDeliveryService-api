import { MongoClient } from 'mongodb'
const password = process.env.DATABASE_PASSWORD
const uri = `mongodb+srv://adminDB:${password}@cluster0.h1rex.mongodb.net/mydb?retryWrites=true&w=majority`

export const mongoOptions =
{
    db: {safe: true},
    server: {
        socketOptions: {
            keepAlive: 1
        }
    },
}

export const client = new MongoClient(uri, { keepAlive: true})