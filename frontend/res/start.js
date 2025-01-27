document.addEventListener('DOMContentLoaded', () => {
    fetchNewsData()

    if(isMobile()){
        $(".news .navigation button").remove()
        $(".news .navigation").css("flex-direction", "column")
        $(".news").css("gap", "25px")
        $(".news .navigation").append(`
            <div class="mobile-navigation"> 
                <button><span class="bi bi-arrow-bar-left"></span></button>
                <button><span class="bi bi-arrow-bar-right"></span></button>
            </div>
        `)
    }
})

async function fetchNewsData() {
    try {
        const data = await get("/b/news")

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const image = $(document.createElement("img")).attr("src", element.image).attr("alt", "").css("display", "none")
            $(".news .navigation .images").append(image)
        }
        $(".news .navigation .images").children().first().css("display", "block")
        $(".news .content h2").text(data[0].title)
        $(".news .content p").text(data[0].description)

        $(".news .navigation").children().first().click(function(){
            for (let i = 0; i < data.length; i++) {
                const element = $(".news .navigation .images").children().eq(i);
                if(element.css("display") == "block"){
                    element.css("display", "none")
                    if(element.prev().length > 0){
                        element.prev().css("display", "block")
                        $(".news .content h2").text(data[i - 1].title)
                        $(".news .content p").text(data[i - 1].description)
                    }
                    else{
                        element.parent().children().last().css("display", "block")
                        $(".news .content h2").text(data[data.length - 1].title)
                        $(".news .content p").text(data[data.length - 1].description)
                    }
                    break
                }
            }
        })
        $(".news .navigation").children().last().click(function(){
            for (let i = 0; i < data.length; i++) {
                const element = $(".news .navigation .images").children().eq(i);
                if(element.css("display") == "block"){
                    element.css("display", "none")
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
        })
    } 
    catch (error) {
        console.error("Error fetching news data:", error)
    }
}
