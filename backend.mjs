import express from "express"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'

import func from "./functions.mjs"

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BASE_DIR = __dirname + "/"
const DATA_DIR = __dirname + "/data/"
const SECRET_KEY = "V?akYlDw!B|?-K3Gm6(;oE8VyH',*U'dMzzHvO91Mpz8kHfEWQCqIZWTEJWu99BEV)8Q}[:}z(sHWN;4E.lqEZIVE{A_Up~4"

const authenticate = async (req, res, next) => {
    try{
        const token = req.headers["authorization"]?.split(" ")[1]
        if(!token){
            console.error("authenticate: no token found")
            return res.sendStatus(401)
        }

        jwt.verify(token, SECRET_KEY, (err, object) => {
            if(err){
                console.error("authenticate: ❌ failed")
                // console.error("authenticate: error:", err)
                return res.sendStatus(403)
            }
            console.log("authenticate: ✅ successful")
            req.id = object.id
            next()
        })
    }
    catch(err){
        console.error("authenticate:", err)
        return res.sendStatus(500)
    }
}

router.get("/heros", async (req, res) => {
    try{
        const data = JSON.parse(await func.read(DATA_DIR + "heros.json"))
        res.json({
            status: 1,
            data
        })
    }
    catch(err){
        console.error(req.path, err)
        res.sendStatus(500)
    }
})

export default {router}