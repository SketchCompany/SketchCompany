import express, { response } from "express"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'
import { sendEmail, sendEmailSync } from "../api/internEmail.js"
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

router.get("/data/:file", async (req, res) => {
    try{
        const data = JSON.parse(await func.read(DATA_DIR + path.basename(req.params.file) + ".json"))
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
            const data = {
              user: req.body.name,
              email: req.body.email,
              subject: "Dein Erstgespräch wurde gebucht",
              message: `
                
                danke für dein Interesse bei mir! Ich werde dich sobald wie möglich kontaktieren und mich mit dir in Verbindung setzen. 
                Du hast dabei die Wahl ob wir uns per E-Mail, Telefon oder Video-Call unterhalten sollen. 
                Um dich schneller zu kontaktieren kannst du dem Link unten folgen, um dir dein gewünschtes Kommunikationsmedium auszusuchen.\n
                \n
                Klicke diesen Link an, um zur Auswahl deines Kommunikationsmedium zu kommen:\n
                <a href="https://sketch-company.de/meeting/communication">https://sketch-company.de/meeting/communication</a>
                
                `,
            };

            data.message = data.message.replaceAll(
              "<a ",
              '<a style="color: mediumspringgreen; text-decoration: none;" '
            );

            sendEmailSync(data)
            sendToMeSync(req.body)

            res.json({
                status: 1,
                data: "email sent"
            })

            /* const response = await sendEmail(data)
            
            if(response.status == 1){
                sendToMe(req.body)
                res.json({
                    status: 1,
                    data: response
                })
            }
            else{
                console.error(req.path, "error sending email", response)
                res.json({
                    status: 0,
                    data: response
                })
            } */
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

async function sendToMeSync(data){
    const mailOptions = {
        user: "Sketchy", 
        email: "sketch-company@web.de", 
        subject: data.name + " möchte ein Erstgespräch mit dir", 
        message: data.message + "\n\n<h2>Raw:</h2><pre>" + JSON.stringify(data, null, 3) + "</pre>"
    }
    const response = await func.send("http://localhost:3500/email", mailOptions, true)
    console.log("sendToMe: response", response)
}

export default {router}