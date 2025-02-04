document.addEventListener("DOMContentLoaded", () => {
    
})
async function bookMeeting(){
    try{
        const name = $("#name").val()
        const email = $("#email").val()
        const message = $("#message").val()
        if(/\S/.test(name) && /\S/.test(email) && /\S/.test(message)){
            const response = await send("/b/book-meeting", {name, email, message}, true)
            if(response.status == 1) notify("Gebucht", "Deine Buchung wurde erfolgreich verarbeitet. Du bekommst sobald wie möglich eine Antwort von mir!", "success")
            else notify("Oh...", response.data, "error")
        }
        else{
            notify("Oh...", "Dein Name, deine Email oder deine Nachricht wurde nicht richtig angegeben. Bitte überprüfe eine Eingabe und versuche es nochmal!", "warning")
        }
    }
    catch(err){
        console.error(err)
        notify("Oh...", "Etwas ist bei deiner Buchung schief gelaufen. Versuche es später erneut!", "error")
    }
}