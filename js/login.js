let users = loadData("users", [])
let currentUser = null
let installed = loadData("installed", false)

const installScreen = document.getElementById("installScreen")
const loginScreen = document.getElementById("loginScreen")
const desktop = document.getElementById("desktop")

document.getElementById("installContinue").onclick = () => {
  let u = document.getElementById("installUsername").value.trim()
  if (!u) u = genDefaultUser()
  const p = document.getElementById("installPassword").value.trim()
  const pic = document.getElementById("installPfp").value.trim() || "/boot/efi/assets/qatuos.png"
  const theme = document.getElementById("installTheme").value
  const dockPos = document.querySelector("input[name='dockPos']:checked").value
  users = [{ user: u, pass: p, pic, theme, dock: dockPos, permanent: true }]
  saveData("users", users)
  saveData("installed", true)
  installScreen.style.display = "none"
  showLogin()
}

function showLogin() {
  loginScreen.style.display = "flex"
  const list = document.getElementById("userList")
  list.innerHTML = ""
  users.forEach((u, i) => {
    const div = document.createElement("div")
    div.className = "user"
    div.innerHTML = `<img src="${u.pic}"><div>${u.user}</div>`
    div.onclick = () => loginPrompt(i)
    // hide delete button for permanent user
    if (!u.permanent) {
      const del = document.createElement("button")
      del.textContent = "❌"
      del.onclick = e => { e.stopPropagation(); deleteUser(i) }
      div.appendChild(del)
    }
    list.appendChild(div)
  })
}

function loginPrompt(i) {
  const pass = prompt("Password for " + users[i].user)
  if (pass === users[i].pass) {
    currentUser = users[i]
    saveData("currentUser", currentUser)
    startDesktop()
  } else {
    alert("Wrong password")
  }
}

function deleteUser(i) {
  if (users[i].permanent) return
  users.splice(i, 1)
  saveData("users", users)
  showLogin()
}
