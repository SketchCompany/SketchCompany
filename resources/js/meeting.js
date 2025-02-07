document.addEventListener("DOMContentLoaded", () => {

    if(isMobile()){
        const style = $(document.createElement("style"))
        style.html(`

        `)
        $("head").append(style)
    }

    const forbiddenUsername = ['"', '§', '$', '%', '&', '/', '\\', '=', '?', '`', '´', '*', ',', ';',':', '<', '>', '²', '³', '{', '}', '[', ']', '^', '|', '~', '@', '€'];
    const forbiddenEmail = Array.from(forbiddenUsername);
    forbiddenEmail.push(['#', "'", '+']);
    forbiddenEmail.splice(forbiddenEmail.indexOf("@"), 1);
    const forbiddenMessage = ['§', '\\', '<', '>', '²', '³', '{','}', '~'];

    const hasForbidden = (text, forbiddenArray) => forbiddenArray.some(char => text.includes(char));

    const setValidity = ($container, message, isValid) => {
        const validClass = "valid", invalidClass = "invalid";
        $container.children().first().css("opacity", "1").html(message);
        $container.removeClass(isValid ? invalidClass : validClass).addClass(isValid ? validClass : invalidClass);
    };

    $("#name").on("keyup", () => {
        const username = $("#name").val()
        if (!/\S/.test(username)) {
            setValidity($("#nameInvalid"), "Name leer", false)
        } else if (hasForbidden(username, forbiddenUsername)) {
            setValidity($("#nameInvalid"), "Name enthält ungültige Zeichen", false)
        } else if (username.length < 3) {
            setValidity($("#nameInvalid"), "Name zu kurz", false)
        } else if (username.length > 50) {
            setValidity($("#nameInvalid"), "Name zu lang", false)
        } else {
            setValidity($("#nameInvalid"), "Der Name ist perfekt", true)
        }
    })

    $("#email").on("keyup", () => {
        const email = $("#email").val().trim()
        if (!/\S/.test(email)) {
            setValidity($("#emailInvalid"), "Email leer", false)
        } else if (hasForbidden(email, forbiddenEmail)) {
            setValidity($("#emailInvalid"), "Email enthält ungültige Zeichen", false)
        } else if (email.length < 5) {
            setValidity($("#emailInvalid"), "Email zu kurz", false)
        } else if (!email.includes("@") || !email.substring(email.indexOf("@")).includes(".")) {
            setValidity($("#emailInvalid"), "Email nicht vollständig", false)
        } else {
            setValidity($("#emailInvalid"), "Die Email gefällt uns", true)
        }
    })
    
    $("#message").on("keyup", () => {
        const message = $("#message").val().trim()
        if (!/\S/.test(message)) {
            setValidity($("#messageInvalid"), "Nachricht leer", false)
        } else if (hasForbidden(message, forbiddenMessage)) {
            setValidity($("#messageInvalid"), "Nachricht enthält ungültige Zeichen", false)
        } else if (message.length < 10) {
            setValidity($("#messageInvalid"), "Nachricht zu kurz", false)
        } else {
            setValidity($("#messageInvalid"), "Die Nachricht gefällt uns", true)
        }
    })
})
async function bookMeeting(){
    try{
        if (
            $("#nameInvalid").hasClass("invalid") ||
            $("#emailInvalid").hasClass("invalid")
        ) {
            notify("Fehlgeschalgen", "Deine Registrierungsdaten sind ungültig. Überprüfe sie und probiers nochmal.", "error");
            console.error("invalid sign up");
            return;
        }
        const name = $("#name").val()
        const email = $("#email").val().trim()
        const message = $("#message").val()
        
        const response = await send("/b/book-meeting", {name, email, message}, true)
        if(response.status == 1) notify("Gebucht", "Deine Buchung wurde erfolgreich verarbeitet. Du bekommst sobald wie möglich eine Antwort von mir!", "success")
        else notify("Oh...", response.data, "error")
    }
    catch(err){
        console.error(err)
        notify("Oh...", "Etwas ist bei deiner Buchung schief gelaufen. Versuche es später erneut!", "error")
    }
}