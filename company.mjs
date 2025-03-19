import express from "express"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'
import backend from "./backend.mjs"

const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BASE_DIR = __dirname + "/frontend/"
const RESOURCES_DIR = __dirname + "/resources/"

app.use(express.json())
app.use("/b", backend.router)

app.get("/robots.txt", (req, res) => {
    res.sendFile(__dirname + "/robots.txt")
})

app.get("/res", (req, res) => {
    try{
        if(fs.existsSync(RESOURCES_DIR + req.query.f)) res.sendFile(RESOURCES_DIR + req.query.f)
        else res.redirect("/error?m=The requested resource could not be found: " + req.query.f)
    }
    catch(err){
        console.log(err)
        res.redirect("/error?m=We don't know what to do either.<br>" + err)
    }
})

app.get("*", (req, res) => {
    try{
        if(fs.existsSync(BASE_DIR + req.path + "/index.html")) res.sendFile(BASE_DIR + req.path + "/index.html")
        else res.redirect("/error?m=The page you were looking for could not be found: " + req.path)
    }
    catch(err){
        console.log(err)
        res.redirect("/error?m=We don't know what to do either.")
    }
})

// start server
app.listen(PORT, function(err){
    if(err) console.error("error on startup:", err)
    else{
        console.log("Server running on http://localhost:" + PORT)
    }
})