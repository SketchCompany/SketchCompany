document.addEventListener("DOMContentLoaded", () => {
    if(isMobile()){
        const style = $(document.createElement("style"))
        style.html(`
        
        `)
        $("head").append(style)
    }

    $(".button-next").click(function(){ next(this) })
    $(".button-prev").click(function(){ prev(this) })
})
function next(element) {
    const activeElement = $(element).parent().parent().parent();
    const nextElement = activeElement.next().length ? activeElement.next() : activeElement;

    activeElement.css("display", "none").removeClass("active");
    nextElement.css("display", "flex").addClass("active");
}
function prev(element) {
    const activeElement = $(element).parent().parent().parent();
    const prevElement = activeElement.prev().length ? activeElement.prev() : activeElement;

    activeElement.css("display", "none").removeClass("active");
    prevElement.css("display", "flex").addClass("active");
}
