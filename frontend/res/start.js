document.addEventListener('DOMContentLoaded', () => {
    fetchHeroData()
})

async function fetchHeroData() {
    try {
        const data = await get("/b/heros")

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const image = $(document.createElement("img")).attr("src", element.image).attr("alt", "").css("display", "none")
            $(".hero .hero-navigation .images").append(image)
        }
        $(".hero .hero-navigation .images").children().first().css("display", "block")
        $(".hero .content h2").text(data[0].title)
        $(".hero .content p").text(data[0].description)

        $(".hero .hero-navigation").children().first().click(function(){
            for (let i = 0; i < data.length; i++) {
                const element = $(".hero .hero-navigation .images").children().eq(i);
                if(element.css("display") == "block"){
                    element.css("display", "none")
                    if(element.prev().length > 0){
                        element.prev().css("display", "block")
                        $(".hero .content h2").text(data[i - 1].title)
                        $(".hero .content p").text(data[i - 1].description)
                    }
                    else{
                        element.parent().children().last().css("display", "block")
                        $(".hero .content h2").text(data[data.length - 1].title)
                        $(".hero .content p").text(data[data.length - 1].description)
                    }
                    break
                }
            }
        })
        $(".hero .hero-navigation").children().last().click(function(){
            for (let i = 0; i < data.length; i++) {
                const element = $(".hero .hero-navigation .images").children().eq(i);
                if(element.css("display") == "block"){
                    element.css("display", "none")
                    if(element.next().length > 0){
                        element.next().css("display", "block")
                        $(".hero .content h2").text(data[i + 1].title)
                        $(".hero .content p").text(data[i + 1].description)
                    }
                    else{
                        element.parent().children().first().css("display", "block")
                        $(".hero .content h2").text(data[0].title)
                        $(".hero .content p").text(data[0].description)
                    }
                    break
                }
            }
        })
    } 
    catch (error) {
        console.error("Error fetching hero data:", error)
    }
}
