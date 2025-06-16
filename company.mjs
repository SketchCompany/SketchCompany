import express from "express"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'
import backend from "./backend.mjs"
import func from "./functions.mjs"

const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BASE_DIR = __dirname + "/frontend/"
const RESOURCES_DIR = __dirname + "/resources/"
const LAUNCHER_FILES_DIR = __dirname + "/launcher/"
const FRIENDLYFIRE_FILES_DIR = __dirname + "/friendlyfire/";

function readScriptHashes(){
    return new Promise(async cb => {
        try{
            cb(JSON.parse(await func.read(__dirname + "/scriptHashes.json")).scripts)
        }
        catch(err){
            console.error("Could not read script hashes out of file")
            cb([])
        }
    })
}

function getScriptHash(req){
    return new Promise(async cb => {
        try{
            if(req.path == "/res" && req.query.f.endsWith(".js")){
                const requestedFile = req.query.f.substring(req.query.f.lastIndexOf("/")).replace("/", "")
                const scriptHashes = await readScriptHashes()
                for (let i = 0; i < scriptHashes.length; i++) {
                    const element = scriptHashes[i];
                    // console.log("element", JSON.stringify(element))
                    // console.log("name", element.name)
                    // console.log("requestedFile", requestedFile)
                    if(element.name == requestedFile){
                        console.log("Successfully found script hash for", req.originalUrl)
                        cb(element.hash)
                        return
                    }
                }
                console.error("Could not find script hash for", req.originalUrl)
                cb("") 
            }
            // console.log("Skipped getting script hash for", req.originalUrl, "because its not a resource")
            cb("") 
        }
        catch(err){
            console.error("Could not find script hash for", req.originalUrl)
            cb("")
        }
    })
}

app.use(express.json())
app.use(async (req, res, next) => {
    res.setHeader("Content-Security-Policy", `
        default-src 'self' https://api.sketch-company.de https://region1.google-analytics.com;
        script-src 'self' ${await getScriptHash(req)} https://cdn.jsdelivr.net https://code.jquery.com https://www.googletagmanager.com;
        style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com;
        font-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com https://fonts.gstatic.com;
        object-src 'none';
        frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim())
    next()
})
app.use("/b", backend.router)

app.get("/robots.txt", (req, res) => {
    res.sendFile(__dirname + "/data/robots.txt")
})
app.get("/sitemap.xml", (req, res) => {
    res.sendFile(__dirname + "/data/sitemap.xml")
})
app.get("/friendlyfire/downloads/:platform/:version", async (req, res) => {
  try {
    switch (req.params.platform) {
      case "windows":
        res.download(getWindowsFriendlyFireVersion(req.params.version));
        break;
      default:
        res.download(getWindowsFriendlyFireVersion(req.params.version));
        break;
    }
  } catch (err) {
    console.log(err);
    res.redirect("/error?m=We don't know what to do either.<br>" + err);
  }
});
function getWindowsFriendlyFireVersion(version) {
  switch (version) {
    case "latest":
      return FRIENDLYFIRE_FILES_DIR + "FriendlyFire-1.0.3 Setup.exe";
    case "0.0.11":
      return FRIENDLYFIRE_FILES_DIR + "FriendlyFire-1.0.3 Setup.exe";
    default:
      return FRIENDLYFIRE_FILES_DIR + "FriendlyFire-1.0.3 Setup.exe";
  }
}
app.get("/launcher/downloads/:platform/:version", async (req, res) => {
    try{
        switch(req.params.platform){
            case "macos":
                res.download(getMacOSLauncherVersion(req.params.version))
                break
            case "windows":
                res.download(getWindowsLauncherVersion(req.params.version))
                break
            default:
                res.download(getWindowsLauncherVersion(req.params.version))
                break
        }
    }
    catch(err){
        console.log(err)
        res.redirect("/error?m=We don't know what to do either.<br>" + err)
    }
})
function getWindowsLauncherVersion(version){
    switch(version){
        case "latest": 
            return (LAUNCHER_FILES_DIR + "Sketchy.Games.Launcher-0.0.11.Setup.exe")
        case "0.0.11": 
            return (LAUNCHER_FILES_DIR + "Sketchy.Games.Launcher-0.0.11.Setup.exe")
        default: 
            return (LAUNCHER_FILES_DIR + "Sketchy.Games.Launcher-0.0.11.Setup.exe") 
    }
}
function getMacOSLauncherVersion(version){
    switch(version){
        case "latest": 
            return (LAUNCHER_FILES_DIR + "Sketchy Games Launcher-0.0.11-arm64.dmg")
        case "0.0.11":
            return (LAUNCHER_FILES_DIR + "Sketchy Games Launcher-0.0.11-arm64.dmg")
        default: 
            return (LAUNCHER_FILES_DIR + "Sketchy Games Launcher-0.0.11-arm64.dmg") 
    }
}

const faviconSizes = [
    "favicon.ico",
    "favicon.png",
    "favicon16x16.png",
    "favicon32x32.png",
    "favicon48x48.png",
    "favicon180x180.png",
    "favicon192x192.png",
    "favicon256x256.png",
    "favicon512x512.png"
]
faviconSizes.forEach((favicon) => {
    app.get(`/${favicon}`, (req, res) => {
        res.sendFile(RESOURCES_DIR + "img/" + favicon)
    })
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