let apiContacts = `${window.location.origin}/api/v1/contacts`
const title = document.querySelector(".contacts-title")
const card = document.querySelector(".contacts-card-container")
const token = localStorage.getItem("token")
const container = document.querySelector(".contacts-container")!
const formContact: HTMLElement = document.getElementById("contacts-form-container")!
const addNew_btn: HTMLElement = document.getElementById("addNew-btn")!
const logOut_btn: HTMLElement = document.getElementById("logOut-btn")!
const back_btn: HTMLElement = document.getElementById("back-btn")!
back_btn.style.display = 'none'


if (!token) {
  throw new Error("Token no disponible")
}

fetch(apiContacts, {
  method: "Get",
  //@ts-ignore
  headers: {
    'x-token': token
  }
})
  .then(results => results.json())
  .then(data => {
    title!.textContent += ' ' + data.total
    data.contacts.forEach(({ name, phonenumber, id }: any) => {
      card!.innerHTML += `
      <div class="contacts-card">
        <h2>${name}</h2>
        <h3>${phonenumber}</h3>
        <button onclick="handleUpdate(${id})">Edit</button>
        <button onclick="handleDelete(${id})">Delete</button>
      </div>
    `
    });
  })

function handleUpdate(id: number) {
  const apiContactsGetOne = `${apiContacts}/${id}`
  fetch(apiContactsGetOne, {
    method: "Get",
    //@ts-ignore
    headers: {
      'x-token': token
    }
  })
    .then(result => {
      if (result.ok) {
        return result.json()
      } else {
        throw new Error('Ha ocurrido un error')
      }
    })
    .then(data => {
      formContact.style.display = 'none'
      container.innerHTML = `
      <div class="contacts-update-container">
          <form class="contact-form" onsubmit="submitContact('Put',${id},event)">
            <label for="nameUpd">
              <input class="nameUpd" type="text" name="nameUpd" id="nameUpd" value="${data.name}"/>
            </label>
            
            <label for="phonenumberUpd">
              <input class="phonenumberUpd" type="number" name="phonenumberUpd" id="phonenumberUpd" value="${data.phonenumber}"/>
            </label>

            <button type="submit">Enter</button>
          </form>
      </div>
      `

      addNew_btn.style.display = 'none'
      logOut_btn.style.display = 'none'
      back_btn.style.display = ''
    })

}

function handleDelete(id: number) {
  const apiContactsDel = `${apiContacts}/${id}`
  fetch(apiContactsDel, {
    method: 'Delete',
    //@ts-ignore
    headers: {
      'x-token': token
    }
  }).then(result => {
    if (result.status === 200) {
      window.location.reload()
    }
  })
}

function submitContact(useMethod: string, id?: number, event?: FormDataEvent) {
  event?.preventDefault()
  
  const getName: HTMLInputElement = document.querySelector(".contact-name")!
  const getPhonenumber: HTMLInputElement = document.querySelector(".contact-phonenumber")!
  let name = getName?.value
  let phonenumber = Number(getPhonenumber?.value)

  
  if (useMethod === 'Put') {
    const getNameUpd: HTMLInputElement = document.querySelector(".nameUpd")!
    const getPhonenumberUpd: HTMLInputElement = document.querySelector(".phonenumberUpd")!
    apiContacts = `${apiContacts}/${id}`
    name = getNameUpd?.value
    phonenumber = Number(getPhonenumberUpd?.value)
  }

  const data = {
    name,
    phonenumber
  }


  fetch(apiContacts, {
    method: useMethod,
    //@ts-ignore
    headers: {
      'x-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(result => {
      if (result.ok) {
        window.location.reload()
      }
    })

}

function logOut() {
  const url = `${window.location.origin}/users`
  localStorage.clear()
  window.location.replace(url)
}

function addNew(){
  const formContainer: HTMLElement = document.getElementById("contacts-form-container")!
  formContainer.innerHTML =  `
    <form class="contact-form" id="form-contact" onsubmit="submitContact('Post',event)">
    <label for="name">
      <input class="contact-name" type="text" name="name" id="name" placeholder="Name"/>
    </label>
    
    <label for="phonenumber">
      <input class= "contact-phonenumber" type="number" name="phonenumber" id="phonenumber" placeholder="Phone Number" />
    </label>

    <button type="submit">Enter</button>
    </form>
  `
}

function backBtn(){
  window.location.reload()
}