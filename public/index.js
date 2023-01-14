let egt = document.getElementById('egt')
const api = 'http://localhost:8080/api/v1/contacts'

fetch(api,{
  method:'GET',
  headers:{
    'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczNTQ3MjY1fQ.iqRGIYgnFlelaQBH-RBnoXeOWBWlhK2nOuhImr9_eV8'
  }
}).then(result => result.json()).then(data => {
  data.contacts.map(item => (
    egt.innerHTML += `<li>${item.phonenumber}</li>`
  ))
  })

