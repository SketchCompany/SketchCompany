import express from "express"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from "dotenv"
dotenv.config()

import func from "./functions.mjs"

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BASE_DIR = __dirname + "/"
const DATA_DIR = __dirname + "/data/"
const SECRET_KEY = process.env.TOKEN_ENCRYPTION_KEY

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
            else{
                console.log("authenticate: ✅ successful")
                req.id = object.id
                next()
            }
        })
    }
    catch(err){
        console.error("authenticate:", err)
        return res.sendStatus(500)
    }
}

router.post("/auth", (req, res) => {
    try{
        jwt.verify(req.body.token, SECRET_KEY, (err, object) => {
            if(err){
                //console.error(req.path, err)
                console.log(req.path, "token is probably expired")
                res.status(403).json({
                    status: 0,
                    data: {
                        status: 0,
                        err
                    }
                })
            }
            else{
                res.status(200).json({
                    status: 1,
                    data: {
                        status: 1,
                        object
                    }
                })
            }
        })
    }
    catch(err){
        console.error(req.path, err)
        res.status(500).json({
            status: 0,
            data: err.toString()
        })
    }
})

router.get("/news", async (req, res) => {
    try{
        const data = JSON.parse(await func.read(DATA_DIR + "news.json"))
        res.json({
            status: 1,
            data
        })
    }
    catch(err){
        console.error(req.path, err)
        res.sendStatus(500).json({
            status: 0,
            data: err
        })
    }
})

router.post("/book-meeting", async (req, res) => {
    try{
        if(req.body.name && req.body.email && req.body.message){
            const data = {user: "Sketchy", email: "sketch-company@web.de", subject: req.body.name + " möchte ein Erstgespräch mit dir!", message: req.body.message + "\n\n<h2>Raw:</h2><pre>" + JSON.stringify(req.body, null, 3) + "</pre>"}
            const response = await func.send("https://api.sketch-company.de/email", data)
            res.json({
                status: 1,
                data: response
            })
        }
        else{
            res.json({
                status: 0,
                data: "Dein Name, deine Email oder deine Nachricht wurde nicht angegeben. Bitte überprüfe eine Eingabe und versuche es nochmal!"
            })
        }
    }
    catch(err){
        console.error(req.path, err)
        res.sendStatus(500).json({
            status: 0,
            data: err
        })
    }
})

export default {router}