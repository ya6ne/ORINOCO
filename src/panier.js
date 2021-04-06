
let paybutton = document.getElementById("paybutton");
let terminal = document.getElementById("terminal")
var insert = document.getElementById("myproduct")
var produit = JSON.parse(localStorage.getItem("product"))
var personalInfo = document.getElementById("personalInfo")
var livraison
var totale = 0
let myForm = document.getElementById('personalInfo')
let trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`

if(!produit){
  console.log("aucun produit")
  document.getElementById("commandeTable").style.display = "none";
  document.getElementById("formulaire").style.display = "none"

}else{
  document.getElementById("emptyTable").style.display = "none"
  var nombreDeProduit = produit.length
  for (i =0 ; i < nombreDeProduit; i++){
      console.log(produit[i])
          insert.innerHTML +=`<tr>
      <th scope="row"><a data-toggle="tooltip" data-placement="top" title="Supprimer cet article" href="" id="delete${i}">${trashIcon}</a></th>
      <td>${produit[i][0]}</td>
      <td>${produit[i][1]}</td>
      <td>${produit[i][2]/100}€</td>
      </tr>`
    totale += produit[i][2]
  }
  
  if (totale/100 >100){
    livraison = 0
  }else if(totale/100>0){
    livraison = 10
  }else{
    livraison = 0
    localStorage.clear()
    document.location.reload();
  }
  
  insert.innerHTML += `<th scope="row">>></th><td colspan="2">Livraison</td><td class="text-success">${livraison}€</td>`
  insert.innerHTML += `<th scope="row">>></th><td colspan="2">Totale</td><td class="text-success">${totale/100 + livraison}€</td>`
}

myForm.addEventListener('submit', function(e){
  e.preventDefault()
  let products = []
  
for (i=0 ; i<produit.length; i++)
{
  products.push(produit[i][3])
}
console.log(JSON.stringify(products))
  
  var name = document.getElementById("name").value
  var lastName = document.getElementById("lastname").value
  var email = document.getElementById("email").value
  var adress = document.getElementById("adress").value
  var city = document.getElementById("city").value
  var contact = {
    firstName : name,
    lastName : lastName,
    address : adress,
    city : city,
    email : email
  }

  fetch(`http://localhost:3000/api/teddies/order`, {
    method: 'POST',
    body: JSON.stringify({contact, products}),
  
    headers:{
      "content-type":"application/json; charset=UTF-8"
    }
  
  }).then(response => {
    console.log(response)
    return response.json()
  }).then(response =>{
    console.log(response)
    console.log(response.contact.lastName)
    localStorage.setItem("numCommande" ,  response.orderId)
    localStorage.setItem("prixTotale", totale/100 + livraison)
    localStorage.setItem("nomClient", response.contact.firstName)
    document.location.href="confirmation.html"
    
  }).catch(err => console.log(err));
})

if(produit){
  for (i=0 ; i<produit.length; i++){
    document.getElementById("delete"+i).addEventListener("click", function(e){
      e.preventDefault();
      let deleteThisId = this.id.substring(6) 
      produit.splice(deleteThisId,1);
      localStorage.setItem("product",JSON.stringify(produit));
      document.location.reload();
    })
  }
}




