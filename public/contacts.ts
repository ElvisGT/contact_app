
const api = 'http://localhost:8080/api/v1/contacts'
const title = document.querySelector(".contacts-title")
const card = document.querySelector(".contacts-card")
try{
  const token = localStorage.getItem("token")
  fetch(api,{
    method:"Get",
    //@ts-ignore
    headers:{
      'x-token':token
    }
  })
  .then(results => results.json())
  .then(data => {
    title!.textContent += ' ' + data.total
    data.contacts.forEach(({name,phonenumber}:any) => {
      card!.innerHTML += `
        <h2>${name}</h2>
          <p>${phonenumber}</p>
        <button onclick="handleEdit()">Edit</button>
        <button onclick="handleDelete()">Delete</button>
      `
    });
  })

}catch(err){
  throw new Error("Token no disponible")
}

function handleEdit(){
  console.log('edit')
}

function handleDelete(){
  console.log('delete')
}