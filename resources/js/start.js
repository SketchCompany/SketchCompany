document.addEventListener("DOMContentLoaded", () => {
    if(isMobile()){
        $(".news .navigation button").remove()
        $(".news .navigation").append(`
            <div class="mobile-navigation"> 
                <button><span class="bi bi-arrow-bar-left"></span></button>
                <button><span class="bi bi-arrow-bar-right"></span></button>
            </div>
        `)
        const style = $(document.createElement("style"))
        const innerSize = 0.35
        const ringSize = 0.8
        style.html(`
            .landing-page{
                padding: 0 10px;
                align-items: start;
                margin-bottom: 75px;
            }
            .landing-page .content{
                margin-top: 25px;
            }
            .landing-page .content .background-image{
                left: -5px;
                top: -25px;
                transform: scale(${innerSize});
                animation: rotateInnerLogoMobile 20s linear infinite;
            }
            .landing-page .content .background-image.ring{
                top: -100px;
                transform: rotateZ(-20deg) scale(${ringSize});
                animation: rotateLogoMobile 20s linear infinite;
            }
            @keyframes rotateInnerLogoMobile {
                from{
                    transform: rotateZ(340deg) scale(${innerSize});
                }
                to{
                    transform: rotateZ(-20deg) scale(${innerSize});
                }
            }
            @keyframes rotateLogoMobile {
                from{
                    transform: rotateZ(-20deg) scale(${ringSize});
                }
                to{
                    transform: rotateZ(340deg) scale(${ringSize});
                }
            }
            .news{
                gap: 25px;
            }
            .news .navigation{
                flex-direction: column
            }
            .news .content{
                flex-direction: column-reverse;
            }
            .news .content .text{
                height: 550px;
                max-height: 550px;
                padding: 20px 25px;
            }
            .news .navigation .images{
                height: 225px;
            }
            .about .text{
                padding: 20px 25px;
            }
            .about img{
                width: 100%;
            }
        `)
        $("head").append(style)
    }

    fetchNewsData()
    setPause()
})
const time = 8 * 1000
let lastChange = Date.now()
let paused = false
function startLoop(data){
    setInterval(() => {
        if((Date.now() - lastChange) <= time || paused) return
        lastChange = Date.now()

        for (let i = 0; i < data.length; i++) {
            const element = $(".news .navigation .images").children().eq(i);
            if(element.css("display") == "block"){
                element.css("display", "none")
                lastChange = Date.now()
                if(element.next().length > 0){
                    element.next().css("display", "block")
                    $(".news .content h2").text(data[i + 1].title)
                    $(".news .content p").text(data[i + 1].description)
                }
                else{
                    element.parent().children().first().css("display", "block")
                    $(".news .content h2").text(data[0].title)
                    $(".news .content p").text(data[0].description)
                }
                break
            }
        }
    }, 1000)
}
async function fetchNewsData(){
    try {
        const data = await get("/b/news")

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const image = $(document.createElement("img")).attr("src", element.image).attr("alt", "").css("display", "none")
            //const image = $(document.createElement("div")).css("background-image", `url("${element.image}")`).css("display", "none")
            $(".news .navigation .images").append(image)
        }
        $(".news .navigation .images").children().first().css("display", "block")
        $(".news .content h2").text(data[0].title)
        $(".news .content p").text(data[0].description)
        $(".news .content .more").attr("href", data[0].link)

        if(isMobile()){
            $(".news .navigation .mobile-navigation").children().last().click(() => next(data))
            $(".news .navigation .mobile-navigation").children().first().click(() => prev(data))
        }
        else{
            $(".news .navigation").children().last().click(() => next(data))
            $(".news .navigation").children().first().click(() => prev(data))
        }
        
        startLoop(data)
    } 
    catch (error) {
        console.error("Error fetching news data:", error)
    }
}
function next(data){
    for (let i = 0; i < data.length; i++) {
        const element = $(".news .navigation .images").children().eq(i);
        if(element.css("display") == "block"){
            element.css("display", "none")
            lastChange = Date.now()
            if(element.next().length > 0){
                element.next().css("display", "block")
                $(".news .content h2").text(data[i + 1].title)
                $(".news .content p").text(data[i + 1].description)
                $(".news .content .more").attr("href", data[i + 1].link)
            }
            else{
                element.parent().children().first().css("display", "block")
                $(".news .content h2").text(data[0].title)
                $(".news .content p").text(data[0].description)
                $(".news .content .more").attr("href", data[0].link)
            }
            break
        }
    }
}
function prev(data){
    for (let i = 0; i < data.length; i++) {
        const element = $(".news .navigation .images").children().eq(i);
        if(element.css("display") == "block"){
            element.css("display", "none")
            lastChange = Date.now()
            if(element.prev().length > 0){
                element.prev().css("display", "block")
                $(".news .content h2").text(data[i - 1].title)
                $(".news .content p").text(data[i - 1].description)
                $(".news .content .more").attr("href", data[i - 1].link)
            }
            else{
                element.parent().children().last().css("display", "block")
                $(".news .content h2").text(data[data.length - 1].title)
                $(".news .content p").text(data[data.length - 1].description)
                $(".news .content .more").attr("href", data[data.length - 1].link)
            }
            break
        }
    }
}
function setPause(){
    $(".pause").click(function(){
        if($(".pause").children().first().hasClass("bi-pause")){
            $(".pause").children().first().removeClass("bi-pause")
            $(".pause").children().first().addClass("bi-play")
            paused = true
        }
        else{
            $(".pause").children().first().removeClass("bi-play")
            $(".pause").children().first().addClass("bi-pause")
            paused = false
        }
    })
}
