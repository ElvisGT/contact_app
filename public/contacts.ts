const api = 'http://localhost:8080/api/v1/contacts'
console.log("Elvis");
try{
  const token = localStorage.getItem("token")
  fetch(api,{
    method:"Get",
    //@ts-ignore
    headers:{
      'x-token':token
    }
  }).then(results => results.json()).then(data => console.log(data))

}catch(err){
  throw new Error("Token no disponible")
}