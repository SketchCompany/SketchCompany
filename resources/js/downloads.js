document.addEventListener("DOMContentLoaded", () => {
    if(isMobile()){
        const style = $(document.createElement("style"))
        style.html(`
        
        `)
        $("head").append(style)
    }

    $(".button-next").click(next)
    $(".button-prev").click(prev)
})
function next() {
    const activeElement = $(".box.interactable .active");
    const nextElement = activeElement.next().length ? activeElement.next() : activeElement;

    activeElement.css("display", "none").removeClass("active");
    nextElement.css("display", "flex").addClass("active");
}
function prev() {
    const activeElement = $(".box.interactable .active");
    const prevElement = activeElement.prev().length ? activeElement.prev() : activeElement;

    activeElement.css("display", "none").removeClass("active");
    prevElement.css("display", "flex").addClass("active");
}
