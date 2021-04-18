let params = new URLSearchParams(document.location.search.substring(1)); /* recuperer l'id de l'url */
let id = params.get("id");
console.log(id);

fetch("http://localhost:3000/api/teddies/" + id)
.then(response => {
    if (response.ok){
        return response.json();
        
    }else {
        throw 'ERREUR API';
    }
})
.then(data => {
    const couleurs = data.colors.map(couls => {return `<option value="${couls}">${couls}</option>`}) /* couleurs de la peluche */ 
     
    const html2 = `<div class="col-lg-8 ml-auto mr-auto mt-4">     
     <div class="card">
     <img class="card-img-top" src="${data.imageUrl}" alt="photo">
     <div class="card-body">
     <h5 class="card-title">${data.name}</h5>
     <p class="card-text">
     Description : ${data.description} <br/>
     couleurs : ${data.colors.join(" ou ")}<br>
     Prix : <span id="couleur" style="color:red; font-size: 22px;">${data.price/100} €</span><br>
     </p>
     <label for="c-select">Couleur:</label>
     <select name="pcolor" id="c-select">
     ${couleurs}
     </select> <br/>
     <a href="panier.html" id="btn" class="btn btn-dark mt-4" >Ajouter au panier</a>

     </div>
     </div>
     </div>`
     
     document.getElementById("myproduct").innerHTML = html2 /* insertion du html */
     
     

    document.getElementById("btn").addEventListener("click", function(e){  /* en cliquant sur le bouton "ajouter au panier" on stock les data dans le localstorage*/
        var pSelected = [data.name, document.getElementById("c-select").value,data.price, data._id]
        
        let myStorage = JSON.parse(localStorage.getItem("product"));
        if(!myStorage){
            myStorage = []
        }
        myStorage.push(pSelected);
        localStorage.setItem("product", JSON.stringify(myStorage));
    })
})
.catch(e => {
    console.log("Il y a eu un problème avec l\'opération fetch");
})

if(!localStorage.nombreDeProduit){ 
    document.getElementById("itemNumb").innerHTML = 0
  } else {
    document.getElementById("itemNumb").innerHTML = localStorage.nombreDeProduit
  }
  







