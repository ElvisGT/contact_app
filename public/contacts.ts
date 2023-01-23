let apiContacts = `${window.location.origin}/api/v1/contacts`
const title = document.querySelector(".contacts-title")
const card = document.querySelector(".contacts-card")
const token = localStorage.getItem("token")
const container = document.querySelector(".contacts-container")!
const formContact: HTMLElement = document.getElementById("form-contact")!


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
      <h2>${name}</h2>
      <p>${phonenumber}</p>
      <button onclick="handleUpdate(${id})">Edit</button>
      <button onclick="handleDelete(${id})">Delete</button>
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
    <form onsubmit="submitContact('Put',${id},event)">
      <label for="nameUpd">
        Name
        <input type="text" name="nameUpd" id="nameUpd" value="${data.name}"/>
      </label>
      
      <label for="phonenumberUpd">
        Phone Number
        <input type="text" name="phonenumberUpd" id="phonenumberUpd" value="${data.phonenumber}"/>
      </label>

      <button type="submit">Enter</button>
    </form>
   `
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

  const getName: HTMLInputElement = document.querySelector("#name")!
  const getPhonenumber: HTMLInputElement = document.querySelector("#phonenumber")!
  let name = getName.value
  let phonenumber = Number(getPhonenumber.value)

  if (useMethod === 'Put') {
    const getNameUpd: HTMLInputElement = document.querySelector("#nameUpd")!
    const getPhonenumberUpd: HTMLInputElement = document.querySelector("#phonenumberUpd")!
    apiContacts = `${apiContacts}/${id}`
    name = getNameUpd.value
    phonenumber = Number(getPhonenumberUpd.value)
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