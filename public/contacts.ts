
const getContacts = 'http://localhost:8080/api/v1/contacts'
const title = document.querySelector(".contacts-title")
const card = document.querySelector(".contacts-card")
const token = localStorage.getItem("token")
const container = document.querySelector(".contacts-container")

if(!token){
  throw new Error("Token no disponible")
}

fetch(getContacts,{
  method:"Get",
  //@ts-ignore
  headers:{
    'x-token':token
  }
})
.then(results => results.json())
.then(data => {
  title!.textContent += ' ' + data.total
  data.contacts.forEach(({name,phonenumber,id}:any) => {
    card!.innerHTML += `
      <h2>${name}</h2>
        <p>${phonenumber}</p>
      <button onclick="handleEdit(${id})">Edit</button>
      <button onclick="handleDelete(${id})">Delete</button>
    `
  });
})


function handleEdit(id:number){

  container!.innerHTML = `
    <form onsubmit="submitUpdate(event,${id})">
      <label for="name">
        <input type="text" name="name" id="name" placeholder="Name"/>
      </label>

      <label for="phonenumber">
        Password
        <input type="text" name="phonenumber" id="phonenumber" placeholder="PhoneNumber"/>
      </label>

      <button type="submit">Enter</button>
    </form>
  `

  
}

function handleDelete(id:number){
  const deleteContactApi = `${window.location.origin}/api/v1/contacts/${id}`
  fetch(deleteContactApi,{
    method:'Delete',
    //@ts-ignore
    headers:{
      'x-token':token
    }
  }).then(result => {
    if(result.status === 200){
      window.location.reload()
    }
  })
}

function submitUpdate(event:FormDataEvent,id:number){
  event.preventDefault()
  const updateContacts = `http://localhost:8080/api/v1/contacts/${id}`
  const getName:HTMLInputElement = document.querySelector("#name")!
  const getPhonenumber:HTMLInputElement = document.querySelector("#phonenumber")!
  const name = getName.value
  const phonenumber = Number(getPhonenumber.value)

  const data = {
    name,
    phonenumber
  }

  fetch(updateContacts,{
    method:"Put",
    //@ts-ignore
    headers:{
      'x-token':token,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })
    .then(result => {
      if(result.ok){
        window.location.reload()
      }
    })
    
}