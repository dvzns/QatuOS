function startDesktop() {
  loginScreen.style.display="none"
  desktop.style.display="block"
  dock.style.display="flex"
  updateClock()
  updateBattery()
  document.getElementById("topUserPic").src=currentUser.pic
  document.getElementById("topUsername").textContent=currentUser.user
  document.getElementById("launchUserPic").src=currentUser.pic
  document.getElementById("launchUsername").textContent=currentUser.user
  document.getElementById("settingsUser").textContent=currentUser.user
  document.getElementById("darkModeToggle").checked=currentUser.theme==="dark"
}

document.getElementById("darkModeToggle").onchange=e=>{
  currentUser.theme=e.target.checked?"dark":"light"
  saveData("users",users)
}

document.getElementById("wifiToggle").onchange=e=>{
  document.getElementById("wifi").textContent=e.target.checked?"📶":"❌"
}

document.getElementById("logoutBtn").onclick=()=>{
  currentUser=null
  saveData("currentUser",null)
  desktop.style.display="none"
  showLogin()
}
