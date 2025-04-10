window.onload = function(){
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-5JE1GBP9VR');
}
window.isMobile = function(){
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera)
    return check
}
let minScroll = 90
$(document).ready(async function(){

    // check if token is valid
    let validToken = false
    const token = localStorage.getItem("token")
    if(token){
        const auth = await send("/b/auth", {token})
        if(auth.status == 0){
            localStorage.removeItem("token")
            validToken = false
            console.error("❌ token is not valid")
            // openSite("/login?r=" + location.pathname)
        }
        else{
            validToken = true
            console.log("✅ token is valid")
        }
    }
    else console.log("❌ no token found")

    $("body").prepend(`
        <header>
            <span class="left">
                <span href="/" class="title"><img src="/res?f=img/icon.webp" loading="lazy" class="icon" alt="Sketch Company Logo"> <p>Sketch Company</p></span>
            </span>
            <span class="right">
                <a href="/meeting"><span class="bi bi-chat-left-text"></span> Erstgespräch</a>
                <a href="/launcher"><span class="bi bi-rocket"></span> Launcher</a>
                <a href="https://sketchy-games.sketch-company.de" target="_blank"><span class="bi bi-controller"></span> Spiele</a>
                <a href="/login?r=/" class="marked login-element"><span class="bi bi-person"></span> Anmelden</a>
                <span class="button-toggleOffcanvas bi bi-list"></span>
            </span>
        </header> 

        <div class="coffcanvas" style="display: none;">
            <div class="content">
                <div class="top">
                    <h2><span class="bi bi-menu-button-wide"></span> Menü</h2>
                    <span class="button-toggleOffcanvas bi bi-x-lg"></span>
                </div>
                <div class="options">
                    <div>
                        <div class="links">
                            <a href="/login?r=/" class="marked login-element"><span class="bi bi-person"></span> Anmelden</a>
                            <a href="/meeting" class="marked"><span class="bi bi-chat-left-text"></span> Kostenloses Erstgespräch</a>
                            <a href="/launcher" class="marked-reverse"><span class="bi bi-rocket"></span> Sketchy Games Launcher</a>
                            <a href="https://sketchy-games.sketch-company.de"><span class="bi bi-controller"></span> Sketchy Games</a>
                            <a href="https://tictactoe.sketch-company.de"><img class="icon" src="/res?f=img/tictactoe_icon.webp" alt="Online TicTacToe Icon"> Online TicTacToe</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="background"></div>
        </div>
    `)
    $("body").append(`
        <footer>
            <p>© ${new Date().getFullYear().toString()} Sketch Company | <a href="https://rights.sketch-company.de/#impressum">Impressum</a> | <a href="https://rights.sketch-company.de/#datenschutzerklärung">Datenschutzerklärung</a> | <a href="https://rights.sketch-company.de/#urheberrecht">Urheberrecht</a></p>
        </footer>
    `)

    if($("body").find(".login-element").length > 0) $("body").find(".login-element").css("display", "none")

    // apply mobile styles
    if(isMobile()){
        const style = $(document.createElement("style"))
        style.html(`
            body{
                
            }
            main{
                padding: 1.5rem 10px;
            }
            p{
                text-align: justify;
                font-size: 85%;
                line-height: 22px;
            }
            header{
                padding: 10px var(--padding);
            }
            header .left .title{
                font-size: 20px;
            }
            header .right .bi-list{
                font-size: 24px;
            }
            .notification{
                width: 95%;
                height: fit-content;
                right: 0;
                margin-right: 2.5%;
            }
            .dialog .content{
                min-width: 95% !important;
                width: 95% !important;
                height: 90% !important;
                gap: 15px;
            }
            .dialog .content .crow{
                flex-direction: column;
                align-items: normal;
                justify-content: start;
                gap: 15px;
            }
            .dialog .content .crow p{
                text-align: start;
            }
            .coffcanvas .content{
                width: 100%;
                border: none;
                padding: 25px;
            }
            .coffcanvas .content .top h2{
                font-size: 24px;
            }
            .coffcanvas .content .top .bi-x-lg{
                font-size: 24px;
            }
            h1{
                font-size: 38px;
                line-height: 40px;
                margin-bottom: 15px;
            }
            h2{
                font-size: 160%;
                line-height: 30px;
                margin-bottom: 5px;
            }
            h3{
                font-size: 25px;
                line-height: 25px;
            }
            input, textarea{
                width: 100%;
            }
        `)
        minScroll = 60
        $("head").append(style)
    }
    $(".mobile-on").css("display", "block")
    $(".mobile-off").css("display", "none")
    $(".mobile-flex-on").css("display", "flex")
    $(".mobile-flex-off").css("display", "none")

    window.addEventListener("scroll", setHeaderBackground)

    // input fields with a clickable eye on the right side to view input of password input fields
    const inputViewables = $(".input-viewable").map(function(){return this}).get()
    for (let i = 0; i < inputViewables.length; i++) {
        const element = $(inputViewables[i]);
        const button = element.children().last()
        const input = element.children().first()
        button.click(function(){
            if(input.attr("type") == "password"){
                button.children().first().removeClass("bi-eye")
                button.children().first().addClass("bi-eye-slash")
                input.attr("type", "text")
            }
            else{
                button.children().first().removeClass("bi-eye-slash")
                button.children().first().addClass("bi-eye")
                input.attr("type", "password")
            }
        })
    }

    // scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add("scroll-animation-visible")
            }
            else{
                entry.target.classList.remove("scroll-animation-visible")
            }
        })
    })

    const hiddenElements = $(".scroll-animation-hidden").get()
    hiddenElements.forEach((element) => observer.observe(element))

    setHeaderBackground()
    setInputFields()
    setButtons()

    if(validToken){
        if($("body").find(".login-element").length > 0) $("body").find(".login-element").remove()
    }
    else{
        if($("body").find(".login-element").length > 0) $("body").find(".login-element").css("display", "block")
    }
})
function setButtons(){
    $("span.button-toggleOffcanvas").each((index, element) => {
        $(element).click(toggleOffcanvas)
    })
    $("span").each((index, element) => {
        if($(element).attr("href")){
            $(element).click(() => openSite($(element).attr("href")))
        }
    })
    $("button").each((index, element) => {
        if($(element).attr("href")){
            $(element).click(() => openSite($(element).attr("href")))
        }
    })
    // $("span").each((index, element) => {
    //     $(element).click(() => openSite($(element).attr("href")))
    // })
}
function setHeaderBackground(){
    if(window.scrollY > minScroll){
        $("header").addClass("header-scrolling")
    }
    else if($("header").hasClass("header-scrolling")){
       $("header").removeClass("header-scrolling")
    }
}
// disable spellcheck and autocomplete attributes for input fields
function setInputFields(){
    const inputs = $("input").map(function(){return this}).get()
    for (let i = 0; i < inputs.length; i++) {
        const element = $(inputs[i]);
        if(element.attr("checked")) continue
        element.attr("spellcheck", "false")
        element.attr("autocomplete", "off")
        element.attr("checked")
    }
}
function toggleOffcanvas(){
    if($(".coffcanvas").css("display") == "none"){
        $(".coffcanvas").css("display", "flex")
        disableScroll()
    }
    else{
        $(".coffcanvas").css("display", "none")
        enableScroll()
    }
}
function disableScroll(){
    $("body").css("overflow", "hidden")
    $("body").css("height", "100%")
}
function enableScroll(){
    $("body").css("overflow", "auto")
    $("body").css("height", "fit-content")
}
function openSite(href, target){
    if(target) open(href, target)
    else open(href, "_self")
}
// fetch information from the backend with the GET method and return the data of the response
/**
 * fetch information from the backend with the GET method and return the data of the response
 * @param {string} url the url to fetch the data from
 * @param {boolean} raw used to get the complete response
 * @param {boolean} log used to disable the log
 * @returns {Promise<JSON> | Promise<string>}
 */
function get(url){
    return new Promise(async cb => {
        fetch(url).then(response => response.json()).then(result => {
            console.log("get:", url, "response:", result)
            cb(result.data)
        }).catch(reason => {
            console.error("get: ❌ failed:", reason)
            cb({status: 0, err: reason})
        })
    })
}
// fetch information from the backend with the GET method and return the complete response
function get(url, raw){
    return new Promise(async cb => {
        fetch(url).then(response => response.json()).then(result => {
            console.log("get:", url, "response:", result)
            if(raw) cb(result)
            else cb(result.data) 
        }).catch(reason => {
            console.error("get: ❌ failed:", reason)
            cb({status: 0, err: reason})
        })  
    })
}
// fetch information from the backend with the GET method and return the complete response but only log it when "log" was set to true
function get(url, raw, log){
    return new Promise(async cb => {
        fetch(url).then(response => response.json()).then(result => {
            if(log) console.log("get:", url, "response:", result)
            if(raw) cb(result)
            else cb(result.data)
        }).catch(reason => {
            console.error("get: ❌ failed:", reason)
            cb({status: 0, err: reason})
        })  
    })
}
function authGet(url, raw){
    return new Promise(async cb => {
        const token = localStorage.getItem("token")
        if(!token){
            console.error("authGet: no token found")
            console.error("authGet: cannot make a request without a token")
            cb("error: no token found")
        }
        else{
            fetch(url, {headers: {"Authorization": "Bearer " + token}}).then(response => response.json()).then(result => {
                console.log("get:", url, "response:", result)
                if(raw) cb(result)
                else cb(result.data)   
            }).catch(reason => {
                console.error("get: ❌ failed:", reason)
                cb({status: 0, err: reason})
            })
        }
    })
}
// fetch information from or to the backend with the POST method and return the data of the response
/**
 * fetch information from or to the backend with the POST method and return the data of the response
 * @param {string} url the url to fetch the data from
 * @param {boolean} raw used to get the complete response
 * @param {boolean} log used to disable the log
 * @returns {Promise<JSON> | Promise<string>}
 */
function send(url, data){
    return new Promise(async cb => {
        fetch(url, {method: "post", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}}).then(response => response.json()).then(result => {
            console.log("send:", url, "response:", result)
            cb(result.data)
        }).catch(reason => {
            console.error("send: ❌ failed:", reason)
            cb({status: 0, err: reason})
        })
    })
}
// fetch information from or to the backend with the POST method and return the complete response
function send(url, data, raw){
    return new Promise(async cb => {
        fetch(url, {method: "post", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}}).then(response => response.json()).then(result => {
            console.log("send:", url, "response:", result)
            if(raw) cb(result)
            else cb(result.data)
        }).catch(reason => {
            console.error("send: ❌ failed:", reason)
            cb({status: 0, err: reason})
        })
    })
}
// fetch information from or to the backend with the POST method and return the complete response but only log it when "log" was set to true
function send(url, data, raw, log){
    return new Promise(async cb => {
        fetch(url, {method: "post", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}}).then(response => response.json()).then(result => {
            if(log) console.log("send:", url, "response:", result)
                if(raw) cb(result)
                else cb(result.data)
        }).catch(reason => {
            console.error("send: ❌ failed:", reason)
            cb({status: 0, err: reason})
        })
    })
}
function authSend(url, data, raw){
    return new Promise(async cb => {
        const token = localStorage.getItem("token")
        if(!token){
            console.error("authSend: no token found")
            console.error("authSend: cannot make a request without a token")
            cb("error: no token found")
        }
        else{
            fetch(url, {method: "post", body: JSON.stringify(data), headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}}).then(response => response.json()).then(result => {
                console.log("authSend:", url, "response:", result)
                if(raw) cb(result)
                else cb(result.data)
            }).catch(reason => {
                console.error("send: ❌ failed:", reason)
                cb({status: 0, err: reason})
            })
        }
    })
}
// create an notification in the bottom right and call a callback when it was clicked
/**
 * creates a notification in the bottom right with a ```title```, ```message``` and ```type```. You also need to define a callback that is called when the notification is clicked
 * @param {string} title the headline of the notification
 * @param {string} message the description of the notification
 * @param {string} type the type of the notification as ```CSS```
 * @param {function} cb the callback of the notification, that is triggerd when the notification is clicked
 * @param {boolean} hideFromCenter to specify wether the notification should be added to the notification center on the top left at the bell icon
 * @returns 
 */
async function notifyCb(title, message, type, cb, hideFromCenter){
    let duration = (1000 * 7) + 1000
    const element = $(document.createElement("div")).addClass("notification").addClass(type)
    element.append($(document.createElement("div")).append($(document.createElement("h2")).html(title)).append($(document.createElement("p")).html(message)))
    element.append($(document.createElement("i")).addClass(["bi", "bi-x-lg"]).click(async function(){
        element.remove()
    }))

    if(!isMobile()) element.css("animation", "notificationSlideIn 1000ms")
    else element.css("animation", "notificationSlideInMobile 1000ms")
    setTimeout(function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
    }, duration)
    element.click(async function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
        cb()
    })
    $("body").append(element)
}
// create an notification in the bottom right
/**
 * creates a notification in the bottom right with a ```title```, ```message``` and ```type```
 * @param {string} title the headline of the notification
 * @param {string} message the description of the notification
 * @param {string} type the type of the notification as ```CSS```
 * @param {boolean} hideFromCenter to specify wether the notification should be added to the notification center on the top left at the bell icon
 * @returns 
 */
async function notify(title, message, type, hideFromCenter){
    let duration = (1000 * 7) + 1000
    const element = $(document.createElement("div")).addClass("notification").addClass(type)
    element.append($(document.createElement("div")).append($(document.createElement("h2")).html(title)).append($(document.createElement("p")).html(message)))
    element.append($(document.createElement("i")).addClass(["bi", "bi-x-lg"]).click(async function(){
        element.remove()
    }))
    if(!isMobile()) element.css("animation", "notificationSlideIn 1000ms")
    else element.css("animation", "notificationSlideInMobile 1000ms")
    element.click(async function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
    })
    setTimeout(function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
    }, duration)
    $("body").append(element)
}
/**
 * creates a notification in the bottom right with a ```title```, ```message```, ```type``` and ```duration```. You also need to define a callback that is called when the notification is clicked
 * @param {string} title the headline of the notification
 * @param {string} message the description of the notification
 * @param {string} type the type of the notification as ```CSS```
 * @param {function} cb the callback of the notification, that is triggerd when the notification is clicked
*  @param {number} duration the duration of the notification before its removed
 * @param {boolean} hideFromCenter to specify wether the notification should be added to the notification center on the top left at the bell icon
 * @returns 
 */
// create an notification in the bottom right with a specified duration and call a callback when it was clicked
async function notifyCb(title, message, type, duration, cb, hideFromCenter){
    let finalDuration = (1000 * 7) + 1000
    if(duration) finalDuration = duration
    const element = $(document.createElement("div")).addClass("notification").addClass(type)
    element.append($(document.createElement("div")).append($(document.createElement("h2")).html(title)).append($(document.createElement("p")).html(message)))
    element.append($(document.createElement("i")).addClass(["bi", "bi-x-lg"]).click(async function(){
        element.remove()
    }))
    if(!isMobile()) element.css("animation", "notificationSlideIn 1000ms")
    else element.css("animation", "notificationSlideInMobile 1000ms")
    setTimeout(function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
    }, finalDuration)
    element.click(async function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
        cb()
    })
    $("body").append(element)
}

// create an notification in the bottom right with a specified duration
/**
 * creates a notification in the bottom right with a ```title```, ```message``` and ```type```
 * @param {string} title the headline of the notification
 * @param {string} message the description of the notification
 * @param {string} type the type of the notification as ```CSS```
*  @param {number} duration the duration of the notification before its removed
 * @param {boolean} hideFromCenter to specify wether the notification should be added to the notification center on the top left at the bell icon
 * @returns 
 */
async function notify(title, message, type, duration, hideFromCenter){
    let finalDuration = (1000 * 7) + 1000
    if(duration) finalDuration = duration
    const element = $(document.createElement("div")).addClass("notification").addClass(type)
    element.append($(document.createElement("div")).append($(document.createElement("h2")).html(title)).append($(document.createElement("p")).html(message)))
    element.append($(document.createElement("i")).addClass(["bi", "bi-x-lg"]).click(async function(){
        element.remove()
    }))
    if(!isMobile()) element.css("animation", "notificationSlideIn 1000ms")
    else element.css("animation", "notificationSlideInMobile 1000ms")
    setTimeout(function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
    }, finalDuration)
    element.click(async function(){
        if(!isMobile()) element.css("animation", "notificationSlideOut 1000ms")
        else element.css("animation", "notificationSlideOutMobile 1000ms")
        setTimeout(() => element.remove(), 750)
    })
    $("body").append(element)
}
/**
 * creates an dialog with an custom ```title```, ```message``` and ```elements```. You can also set the width and height
 * @param {string} title the headline of the dialog
 * @param {string} message the description of the dialog
 * @param {string} elements the custom elements to add in a string with the ``` `` ``` characters
 * @param {number} width the width of the dialog window in px
 * @param {number} height the height of the dialog window in px
 * @returns {string} the selector as id of the created dialog
 */
function createDialog(title, message, elements, width, height){
    const id = title.replaceAll(" ", "_") + "-dialog"
    const headline = $(document.createElement("h2")).html(title)
    const description = $(document.createElement("p")).html(message)
    const cancel = $(document.createElement("i")).addClass(["bi", "bi-x-lg"]).click(() => removeDialog("#" + id))
    const content = $(document.createElement("div")).addClass("content").append([headline, description, elements, cancel])
    if(width) content.css("width", width + "px")
    if(height) content.css("height", height + "px")
    const background = $(document.createElement("div")).addClass("background")
    const dialog = $(document.createElement("div")).attr("id", id).addClass("dialog").append([background, content])
    $("body").prepend(dialog)
    disableScroll()
    setInputFields()
    return "#" + id
}
/**
 * removes a dialog with a specific ```id```
 * @param {string} id the id of the dialog to remove
 */
function removeDialog(id){
    enableScroll()
    $(id).remove()
}
let clicked
/**
 * 
 * @param {string} name the selector for the context menu, so its open when the element with the same name (selector) got right clicked
 * @param {string} id the id or name of the contextmenu, which is used for removing the contextmenu
 * @param {string} elements the elements in the contextmenu as ``` `` ``` string
 * @param {function} event the callback, which is called when one of the buttons is clicked and provides two paramters: ```i``` (the index of the button of the contextmenu) and ```element``` (the element that was right clicked)
 * @param {Array<string>} blocked the list of blocked elements that cannot trigger the contextmenu
 */
function createCtxMenu(name, id, elements, event, blocked){
    $("body").prepend(`
        <div id="` + id + `-ctx-menu" class="context-menu" style="display: none;"></div>
    `)

    $("#" + id + "-ctx-menu").append(elements)
    $("#" + id + "-ctx-menu").children().last().addClass("lastItem")
    $("#" + id + "-ctx-menu").on("mouseleave", function(e){
        $("#" + id + "-ctx-menu").css("display", "none")
    })
    $("#" + id + "-ctx-menu").on("contextmenu", function(e){
        e.stopPropagation()
    })

    $("#" + id + "-ctx-menu").children().each((i, element) => {
        if($(element).attr("listener")) return
        $(element).attr("listener", "true")
        $(element).click(() => {
            event(i, clicked)
            $("#" + id + "-ctx-menu").css("display", "none")
        })
    })

    $(name).on("contextmenu", function(e){
        e.preventDefault()
        e.stopPropagation()
        if(blocked){
            for (let i = 0; i < blocked.length; i++) {
                const element = blocked[i];
                if(e.target.classList.contains(element)){
                    return
                }
            }
        }

        const {clientX: mouseX, clientY: mouseY} = e

        $("#" + id + "-ctx-menu").css("top", mouseY - 20 + "px")
        $("#" + id + "-ctx-menu").css("left", mouseX - 20 + "px")
        $("#" + id + "-ctx-menu").css("display", "block")
        clicked = e.target
    })
}
/**
 * update a context menu by its name and id and optional provide a list of elements that are blocked
 * @param {string} name the selector for the context menu, so its open when the element with the same name (selector) got right clicked
 * @param {string} id the id or name of the contextmenu, which is used for removing the contextmenu
 * @param {Array<string>} blocked the list of blocked elements that cannot trigger the contextmenu
 */
function updateCtxMenu(name, id, blocked){
    $(name).on("contextmenu", function(e){
        e.preventDefault()
        e.stopPropagation()
        if(blocked){
            for (let i = 0; i < blocked.length; i++) {
                const element = blocked[i];
                if(e.target.classList.contains(element)){
                    return
                }
            }
        }

        const {clientX: mouseX, clientY: mouseY} = e

        $("#" + id + "-ctx-menu").css("top", mouseY - 20 + "px")
        $("#" + id + "-ctx-menu").css("left", mouseX - 20 + "px")
        $("#" + id + "-ctx-menu").css("display", "block")
        clicked = e.target
    })
}
/**
 * remove a created context menu by its id
 * @param {string} id 
 */
function removeCtxMenu(id){
    $("#" + id + "-ctx-menu").remove()
}