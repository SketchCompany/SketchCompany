const params = new URL(location.href).searchParams
const token = params.get("t")
let redirect = params.get("r")
if(token){
    localStorage.setItem("token", token)
    if(redirect) open(redirect, "_self")
    else open("/", "_self")
}
else{
    if(!redirect) redirect = "/"
    open("https://api.sketch-company.de/login?redirect=" + location.origin + "/login?r=" + redirect, "_self")
}