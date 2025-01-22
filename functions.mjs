import fs from "fs"
import path from 'path'
import crypto from "crypto"
import child_process from"child_process"
import {markdown} from "markdown";
import NodeCache from "node-cache" 
import {Octokit} from "octokit";
const sessionCache = new NodeCache({stdTTL: 10, checkperiod: 30})

function getRepository(){
    return new Promise(async cb => {
        try{
            const octokit = new Octokit({
                auth: "ghp" + "_4hUgyFtH1cbTZ33lXteMDoGjnRluhW05PkUl"
            })
            const response = await octokit.rest.repos.listReleases({
                owner: 'SketchCompany',
                repo: 'SketchyGamesLauncher',
            })

            // dont log the response, because it contains data that should not be shown to the user
            //console.log("getRepository: data:", response.data)

            const rawReleases = response.data
            const filteredReleases = rawReleases.filter(release => !release.draft && !release.prerelease);
            const releases = []
            filteredReleases.forEach((release) => {
                releases.push({
                    name: release.name,
                    tag: release.tag_name,
                    description: markdown.toHTML(release.body)
                })
            })
            cb(releases)
        }
        catch(err){
            console.error("getRepository: error", err)
            cb(err)
        }
    })
}

/**
 * used to check a JSON object for integrity by comparing it with the JSON ```objectToCompare```
 * @param {JSON} objectToCheck the JSON object to compare the keys from with the ```objectToCompare```
 * @param {JSON} objectToCompare the JSON object with the only keys in the ```objectToCheck```
 * @returns true or false wether the JSON objects are equal or not
 */
function checkForIntegrity(objectToCheck, objectToCompare){
    const keys = Object.keys(objectToCheck)
    const neededKeys = Object.keys(objectToCompare)
    console.log("checkForIntegrity: given keys", keys, "needed keys", neededKeys)
    if(arraysEquaul(keys, neededKeys)) return true
    else return false
}
function arraysEquaul(a, b){
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    const aSorted = Array.from(a)
    const bSorted = Array.from(b)

    for (let i = 0; i < aSorted.length; ++i) {
        if (aSorted[i] !== bSorted[i]) return false
    }
    return true
}
/**
 * checks if the file or directory exists at the goven ```path```
 * @param {string} path ```path``` to file or directory to check
 * @returns {boolean} returns true or false, wether the file or directory exists or not
 */
function exists(path){
    return fs.existsSync(path)
}
/**
 * copys a file at the given ```path```
 * @param {string} path ```path``` to file to copy
 * @param {string} dest ```path``` to new file
 * @returns {null} returns nothing
 */
function copy(path, dest){
    return new Promise(cb => {
        fs.copyFile(path, dest, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb()
        })
    })
}
/**
 * removes a file or directory at the given ```path```
 * @param {string} path ```path``` to file or directory to remove
 * @returns {Promise} returns nothing
 */
function remove(path){
    return new Promise(cb => {
        fs.rm(path, {recursive: true}, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb()
        })
    })
}
/** 
 * move a directory or file to the given ```path```
 * @param {string} path the directory or file to move to the ```dest```
 * @param {string} dest the new directory or file to move to.
 * @returns {Promise}
 */
function move(path, dest){
    return new Promise(cb => {
        fs.rename(path, dest, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb()
        })
    })
}
/**
 * reads a directory at the given ```path```
 * @param {string} path the directory to read the files from
 * @returns {Promise<Array<string>>} returns every file in the given directory
 */
function readDir(path){
    return new Promise(cb => {
        fs.readdir(path, (err, files) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb(files)
        })
    })
}
/**
 * reads a file at the given ```path```
 * @param {string} path the file to read
 * @returns {Promise<string>} returns the content of the file in string format
 */
function read(path){
    return new Promise(cb => {
        fs.readFile(path, (err, data) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb(data.toString())
        })
    })
}
/**
 * writes ```data``` into a file at the given ```path```
 * @param {string} path the path where the file should be created
 * @param {string} data the data in string format to write in the file
 * @returns {Promise}
 */
function write(path, data){
    return new Promise(cb => {
        fs.writeFile(path, data, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb()
        })
    })
}
/**
 * creates a directory at the given ```path```
 * @param {string} path the path to create the directory
 * @returns {Promise}
 */
function mkDir(path){
    return new Promise(cb => {
        fs.mkdir(path, (err) => {
            if(err){
                console.error(err)
                cb(err)
            }
            else cb()
        })
    })
}
/**
 * fetches a specific ```url``` with the ```GET``` method and returns the data of the response
 * @param {string} url the url to be fetched
 * @returns {Promise} the data of the response from the fetched url
 */
function get(url){
    return new Promise(async cb => {
        fetch(url).then((response) => response.json()).then((result) => {
            console.log("get:", url, "response:", result)
            cb(result.data)
        }).catch((err) => {
            console.error("get:", url, "error:", err)
            cb(err)
        })
    })
}
/**
 * fetches a specific ```url``` with the ```GET``` method and returns the data of the response and caches it
 * @param {string} url the url to be fetched
 * @param {number} ttl the ttl for data in the cache
 * @returns {Promise} the data of the response from the fetched url
 */
function getAndCache(url, ttl = null){
    return new Promise(async cb => {
        if(sessionCache.has(url)){
            console.log("getAndCache: got data from cache for:", url)
            cb(sessionCache.get(url))
        }
        else{
            fetch(url).then((response) => response.json()).then((result) => {
                console.log("get:", url, "response:", result)
                if(ttl) sessionCache.set(url, result.data, ttl)
                else sessionCache.set(url, result.data, 30)
                console.log("getAndCache: cached data from url:", url)
                cb(result.data)
            }).catch((err) => {
                console.error("get:", url, "error:", err)
                cb(err)
            })
        }
    })
}
/**
 * fetches a specific ```url``` with the ```POST``` method with the preferred ```data``` as ```JSON``` and returns the data of the response
 * @param {string} url the url to be fetched
 * @param {JSON} data the data that needs to be send to the url
 * @returns {Promise} the data of the response from the fetched url
 */
function send(url, data){
    return new Promise(async cb => {
        fetch(url, {method: "post", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}}).then((response) => response.json()).then((result) => {
            console.log("send:", url, "response:")
            console.dir(result, {depth: null})
            cb(result.data)
        }).catch((err) => {
            console.error("send:", url, "error:", err)
            cb(err)
        })
    })
}
const algorithm = "aes-256-ctr"
const key = crypto.createHash('sha256').update("SketchyGamesLauncherEncryptionKey").digest("hex")
/**
 * used to encrypt ```data``` and return the result
 * @param {string | number | boolean | JSON} data the data that should be encrypted
 * @returns {string} the encrypted data
 */
function encrypt(data){
    let iv = crypto.randomBytes(16)
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv)
    let encrypted = cipher.update(data)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString("hex") + ":" + encrypted.toString("hex")
}
/**
 * used to decrypt ```data``` and return the result
 * @param {string} data the data that should be decrypted
 * @returns {string} the decrypted data
 */
function decrypt(data){
    let dataParts = data.split(":")
    let iv = Buffer.from(dataParts.shift(), "hex")
    let encryptedData = Buffer.from(dataParts.join(":"), "hex")
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), iv)
    let decrypted = decipher.update(encryptedData)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}
export default {
    write,
    read,
    remove,
    exists,
    copy,
    move,
    mkDir,
    readDir,
    get,
    getAndCache,
    send,
    encrypt,
    decrypt,
    checkForIntegrity,
    getRepository,
}