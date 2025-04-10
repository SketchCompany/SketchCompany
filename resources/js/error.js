const params = new URL(location.href).searchParams
const errorMessage = params.get("m")
if(errorMessage){
    $("#message").html(errorMessage)
}
$("#back").click(() => history.back())