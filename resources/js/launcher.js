document.addEventListener("DOMContentLoaded", () => {
    if(isMobile()){
        $(".impressions .navigation button").remove()
        $(".impressions").append(`
            <div class="mobile-navigation"> 
                <button><span class="bi bi-arrow-bar-left"></span></button>
                <button><span class="bi bi-arrow-bar-right"></span></button>
            </div>
        `)
        const style = $(document.createElement("style"))
        style.html(`
            .hero{
                margin-top: 50px;
            }
            .hero h1{
                font-size: 45px;
                margin-bottom: 25px;
            }
            .intro, .advantages, .impressions, .techniques, .goals{
                margin-top: 100px;
            }
            .intro div, .advantages .list .element, .techniques .list .element, .goals .list-grid .element{
                padding: 20px;
            }
            .impressions{
                flex-direction: column;
            }
            .impressions .navigation{
                flex-direction: column;
                width: 100%;
                gap: 25px;
            }
            .impressions .navigation .content{
                position: static;
                background-color: var(--background0);
                border: 2px solid transparent;
                background: linear-gradient(var(--background0), var(--background0)) padding-box, linear-gradient(to bottom, rgb(255, 0, 175), var(--secondary) 80%, rgba(80, 0, 255, 1)) border-box;
                color: var(--font-primary);
                padding: 20px;
                height: 265px;
            }
            .impressions .navigation .content p{
                color: var(--font-secondary)
            }
            .list-grid{
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                gap: 3em;
            }
        `)
        $("head").append(style)
    }
    fetchLauncherImpressions()
})
async function fetchLauncherImpressions(){
    try {
        const data = await get("/b/data/launcher-impressions")

        $(".impressions .content h2").text(data[0].title)
        $(".impressions .content p").text(data[0].description)

        if(isMobile()){
            $(".impressions .mobile-navigation").children().last().click(() => next(data))
            $(".impressions .mobile-navigation").children().first().click(() => prev(data))
        }
        else{
            $(".impressions .navigation .right").click(() => next(data))
            $(".impressions .navigation .left").click(() => prev(data))
        }
        
        startLoop(data)
    } 
    catch (error) {
        console.error("Error fetching news data:", error)
    }
}
const time = 8 * 1000
let lastChange = Date.now()
let paused = false
function startLoop(data){
    setInterval(() => {
        if((Date.now() - lastChange) <= time || paused) return
        lastChange = Date.now()

        for (let i = 0; i < data.length; i++) {
            const element = $(".impressions .navigation .images").children().eq(i);
            if(element.css("display") == "block"){
                element.css("display", "none")
                lastChange = Date.now()
                if(element.next().length > 0){
                    element.next().css("display", "block")
                    $(".impressions .content h2").text(data[i + 1].title)
                    $(".impressions .content p").text(data[i + 1].description)
                }
                else{
                    element.parent().children().first().css("display", "block")
                    $(".impressions .content h2").text(data[0].title)
                    $(".impressions .content p").text(data[0].description)
                }
                break
            }
        }
    }, 1000)
}
function next(data){
    for (let i = 0; i < data.length; i++) {
        const element = $(".impressions .navigation .images").children().eq(i);
        if(element.css("display") == "block"){
            element.css("display", "none")
            lastChange = Date.now()
            if(element.next().length > 0){
                element.next().css("display", "block")
                $(".impressions .content h2").text(data[i + 1].title)
                $(".impressions .content p").text(data[i + 1].description)
            }
            else{
                element.parent().children().first().css("display", "block")
                $(".impressions .content h2").text(data[0].title)
                $(".impressions .content p").text(data[0].description)
            }
            break
        }
    }
}
function prev(data){
    for (let i = 0; i < data.length; i++) {
        const element = $(".impressions .navigation .images").children().eq(i);
        if(element.css("display") == "block"){
            element.css("display", "none")
            lastChange = Date.now()
            if(element.prev().length > 0){
                element.prev().css("display", "block")
                $(".impressions .content h2").text(data[i - 1].title)
                $(".impressions .content p").text(data[i - 1].description)
            }
            else{
                element.parent().children().last().css("display", "block")
                $(".impressions .content h2").text(data[data.length - 1].title)
                $(".impressions .content p").text(data[data.length - 1].description)
            }
            break
        }
    }
}