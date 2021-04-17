
fetch(apiUrl) /* Url est dans config.js */
.then(response => {
    if (response.ok){
        return response.json();
        
    }else {
        throw 'Mauvaise réponse du réseau';
    }
})
.then(data => { /* html pour les peluches */
    console.log(data);
    const allCards = data.map(eachTeddie => {
        return `<div class="col-12 col-lg-4">
        <div class="card">

            <img class="card-img-top" src="${eachTeddie.imageUrl}" alt="photo">

            <div class="card-body">
                <h5 class="card-title">${eachTeddie.name}</h5>

                
                <p class="card-text">
                Description : ${eachTeddie.description} <br/>
                couleurs disponibles : ${eachTeddie.colors.join(" / ")}<br>
                Prix : <span id="couleur" style="color:red; font-size: 22px;">${eachTeddie.price/100} €</span><br>
                </p>

                <a href="product.html?id=${eachTeddie._id}" class="btn btn-dark">Personnaliser</a>
                </div>
            </div>
            </div>`
        }).join("");
    
    document.querySelector("#element").insertAdjacentHTML("afterbegin", allCards); /* insertion du html */

})
.catch(e =>{
    console.log("Il y a eu un problème avec l\'opération fetch");
})


if(!localStorage.nombreDeProduit){ /* afficher le nombre de produits dans le panier (n) */
    document.getElementById("itemNumb").innerHTML = 0
  } else {
    document.getElementById("itemNumb").innerHTML = localStorage.nombreDeProduit
  }
  