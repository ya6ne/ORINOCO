var nomClient = localStorage.getItem("nomClient").charAt(0).toUpperCase() + localStorage.getItem("nomClient").substring(1).toLowerCase()
var numCommande = localStorage.getItem("numCommande")
var prixTotale = localStorage.getItem("prixTotale")


document.getElementById("nomClient").innerHTML = nomClient
document.getElementById("numCommande").innerHTML = numCommande
document.getElementById("prixTotale").innerHTML = prixTotale

localStorage.clear()

