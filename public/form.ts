function handleSubmit(event:FormDataEvent){
  event.preventDefault()
  const name:HTMLInputElement = document.querySelector("#name")! 
  const password:HTMLInputElement = document.querySelector("#password")! 

  registerUser(name.value,String(password.value))
} 


function registerUser(name:string,password:string){
  const incorrectPassword = document.querySelector(".incorrect-password")!
  const api = `${window.location.origin}/api/v1/users`
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
  .then(result => {
    if(result.status === 401){
      incorrectPassword.textContent = 'Password incorrect'
      throw new Error("Password incorrect");
      
    }
    return result.json()
  })
  .then(data => {
    const token = data.token
    const url =`${window.location.origin}/contacts`
    saveLocal(token)
    window.location.replace(url)
  })

}

function saveLocal(token:string){
    localStorage.clear()
    localStorage.setItem("token",token)
}