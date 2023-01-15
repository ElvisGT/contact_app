
function handleSubmit(event:FormDataEvent){
  event.preventDefault()
  const name:HTMLInputElement = document.querySelector("#name")! 
  const password:HTMLInputElement = document.querySelector("#password")! 

  registerUser(name.value,String(password.value))
} 


function registerUser(name:string,password:string){
  const api = 'http://localhost:8080/api/v1/users'
  const data = {
   name,
   password
  }
  fetch(api,{
    method:"Post",
    headers:{
      'Content-Type':'application/json'
    },
    //@ts-ignore
    body:JSON.stringify(data)
  })
  .then(result => result.json())
  .then(data => {
    const token = data.token
    const url = 'http://localhost:8080/contacts'
    saveLocal(token)
    window.location.replace(url)
  })

}

function saveLocal(token:string){
  if(!localStorage.getItem("token")){
    localStorage.setItem("token",token)
  }
}