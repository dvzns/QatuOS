const dock = document.getElementById("dock")
const launcher = document.getElementById("launcher")
const appGrid = document.getElementById("appGrid")

document.getElementById("launcherBtn").onclick = () => {
  launcher.classList.toggle("hidden")
}

const apps = [
  { id:"browser", name:"Browser", icon:"/boot/efi/assets/icons/browser.png", win:"win-browser" },
  { id:"terminal", name:"Terminal", icon:"/boot/efi/assets/icons/terminal.png", win:"win-term" },
  { id:"files", name:"Files", icon:"/boot/efi/assets/icons/files.png", win:"win-files" },
  { id:"settings", name:"Settings", icon:"/boot/efi/assets/icons/settings.png", win:"win-settings" },
  { id:"notes", name:"Notes", icon:"/boot/efi/assets/icons/notes.png", win:"win-notes" },
  { id:"music", name:"Music", icon:"/boot/efi/assets/icons/music.png", win:"win-music" },
  { id:"calc", name:"Calculator", icon:"/boot/efi/assets/icons/calc.png", win:"win-calculator" }
]

function buildLauncher() {
  appGrid.innerHTML = ""
  apps.forEach(a=>{
    const div=document.createElement("div")
    div.className="app"
    div.innerHTML=`<img src="${a.icon}"><div>${a.name}</div>`
    div.onclick=()=>openWindow(a.win)
    appGrid.appendChild(div)
  })
}
buildLauncher()
