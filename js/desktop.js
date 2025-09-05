let zIndexCounter = 100

function makeWindow(title, content) {
  const win = document.createElement("div")
  win.className = "window"
  win.style.zIndex = ++zIndexCounter

  const header = document.createElement("div")
  header.className = "window-header"

  const controls = document.createElement("div")
  controls.className = "win-controls"

  const closeBtn = document.createElement("div"); closeBtn.className = "win-btn red"
  const minBtn = document.createElement("div"); minBtn.className = "win-btn yellow"
  const maxBtn = document.createElement("div"); maxBtn.className = "win-btn green"

  controls.appendChild(closeBtn)
  controls.appendChild(minBtn)
  controls.appendChild(maxBtn)
  header.appendChild(controls)

  const body = document.createElement("div")
  body.className = "window-body"
  body.innerHTML = content

  win.appendChild(header)
  win.appendChild(body)
  document.body.appendChild(win)

  requestAnimationFrame(() => win.classList.add("active"))

  win.addEventListener("mousedown", () => win.style.zIndex = ++zIndexCounter)

  let dragging = false, dx = 0, dy = 0
  header.addEventListener("pointerdown", e => {
    dragging = true
    dx = e.clientX - win.offsetLeft
    dy = e.clientY - win.offsetTop
    win.style.zIndex = ++zIndexCounter
    win.querySelectorAll("iframe").forEach(f => f.style.pointerEvents = "none")
  })

  document.addEventListener("pointermove", e => {
    if (!dragging) return
    win.style.left = (e.clientX - dx) + "px"
    win.style.top = (e.clientY - dy) + "px"
  })

  document.addEventListener("pointerup", () => {
    if (dragging) {
      dragging = false
      win.querySelectorAll("iframe").forEach(f => f.style.pointerEvents = "auto")
    }
    if (resizing) {
      resizing = false
      win.querySelectorAll("iframe").forEach(f => f.style.pointerEvents = "auto")
    }
  })

  const resizer = document.createElement("div")
  resizer.style.width = "12px"
  resizer.style.height = "12px"
  resizer.style.position = "absolute"
  resizer.style.right = "0"
  resizer.style.bottom = "0"
  resizer.style.cursor = "nwse-resize"
  win.appendChild(resizer)

  let resizing = false, rx = 0, ry = 0
  resizer.addEventListener("pointerdown", e => {
    e.stopPropagation()
    resizing = true
    rx = e.clientX
    ry = e.clientY
    win.querySelectorAll("iframe").forEach(f => f.style.pointerEvents = "none")
  })

  document.addEventListener("pointermove", e => {
    if (!resizing) return
    const nw = win.offsetWidth + (e.clientX - rx)
    const nh = win.offsetHeight + (e.clientY - ry)
    win.style.width = Math.max(280, nw) + "px"
    win.style.height = Math.max(180, nh) + "px"
    rx = e.clientX
    ry = e.clientY
  })

  closeBtn.addEventListener("click", () => {
    win.classList.remove("active")
    setTimeout(() => win.remove(), 260)
  })

  minBtn.addEventListener("click", () => {
    win.style.display = "none"
    const taskIcon = document.createElement("div")
    taskIcon.className = "task-icon"
    taskIcon.textContent = title
    taskIcon.onclick = () => {
      win.style.display = "block"
      win.style.zIndex = ++zIndexCounter
      taskIcon.remove()
    }
    document.body.appendChild(taskIcon)
  })

  maxBtn.addEventListener("click", () => {
    if (win.classList.contains("fullscreen")) {
      win.classList.remove("fullscreen")
      win.style.top = "12vh"
      win.style.left = "12vw"
      win.style.width = "720px"
      win.style.height = "480px"
    } else {
      win.classList.add("fullscreen")
      win.style.top = "0"
      win.style.left = "0"
      win.style.width = "100%"
      win.style.height = "100%"
    }
  })

  header.addEventListener("dblclick", () => {
    maxBtn.click()
  })

  return win
}

function openBrowser() {
  makeWindow("Browser", `<iframe src="../qatubrowser/index.html" style="width:100%;height:100%;border:none;"></iframe>`)
}
function openRizz() {
  makeWindow("Solo Central", `<iframe src="../solocentral/index.html" style="width:100%;height:100%;border:none;"></iframe>`)
}
function openTerminal() {
  const termContent = document.createElement("div")
  termContent.style.cssText = "padding:8px;color:#0f0;font-family:monospace;background:#000;height:100%;overflow:auto;display:flex;flex-direction:column"

  const output = document.createElement("div")
  output.style.flex = "1"
  termContent.appendChild(output)

  const inputWrap = document.createElement("div")
  inputWrap.style.display = "flex"
  inputWrap.style.alignItems = "center"

  const prompt = document.createElement("span")
  prompt.textContent = "qatu@QatuOS:~$ "
  inputWrap.appendChild(prompt)

  const input = document.createElement("input")
  input.type = "text"
  input.style.cssText = "background:none;border:none;outline:none;color:#0f0;flex:1;font-family:monospace;font-size:14px"
  inputWrap.appendChild(input)

  termContent.appendChild(inputWrap)

  function write(text) {
    const line = document.createElement("div")
    line.textContent = text
    output.appendChild(line)
    output.scrollTop = output.scrollHeight
  }

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const cmd = input.value.trim()
      write(`qatu@QatuOS:~$ ${cmd}`)
      handleCommand(cmd)
      input.value = ""
    }
  })

  function handleCommand(cmd) {
  if (cmd === "help") {
    write("Available commands: help, clear, echo, qatu <cmd>")
    write("qatu commands: dark, light, kill")
  } else if (cmd.startsWith("echo ")) {
    write(cmd.slice(5))
  } else if (cmd === "clear") {
    output.innerHTML = ""
  } else if (cmd.startsWith("qatu ")) {
    const realCmd = cmd.slice(5)
    if (realCmd === "dark") {
      document.body.classList.add("dark-mode")
      document.body.classList.remove("light-mode")
      write("qatu: dark mode enabled")
    } else if (realCmd === "light") {
      document.body.classList.add("light-mode")
      document.body.classList.remove("dark-mode")
      write("qatu: light mode enabled")
    } else if (realCmd === "kill") {
      write("qatu: restarting session...")
      write("qatu: killing qatuos...")
      write("USB Removable Drive has been Removed")
      write("deleting /boot/efi/start ...")
      setTimeout(() => location.reload(), 1000)
    } else {
      write(`qatu: unknown command '${realCmd}'`)
    }
  } else if (cmd) {
    write(`command not found: ${cmd}`)
  }
}


  const win = makeWindow("Terminal", "")
  win.querySelector(".window-body").appendChild(termContent)
  input.focus()
}

function openFiles() {
  makeWindow("Files", `<div style="padding:16px">Files</div>`)
}
function openSettings() {
  makeWindow("Settings", `<div style="padding:16px">Settings</div>`)
}

document.getElementById("browserBtn").onclick = openBrowser
document.getElementById("solocentralBtn").onclick = openRizz
document.getElementById("termBtn").onclick = openTerminal
document.getElementById("filesBtn").onclick = openFiles
document.getElementById("settingsBtn").onclick = openSettings

const launcherBtn = document.getElementById("launcherBtn")
const launcher = document.getElementById("launcher")
if (launcherBtn && launcher) {
  launcherBtn.addEventListener("click", () => {
    if (launcher.classList.contains("show")) {
      launcher.classList.remove("show")
      setTimeout(() => launcher.classList.add("hidden"), 200)
    } else {
      launcher.classList.remove("hidden")
      requestAnimationFrame(() => launcher.classList.add("show"))
    }
  })
}

document.querySelectorAll(".launcher-app").forEach(app => {
  app.addEventListener("click", () => {
    const appName = app.textContent.trim()
    if (appName === "Browser") openBrowser()
    if (appName === "Terminal") openTerminal()
    if (appName === "Files") openFiles()
    if (appName === "Settings") openSettings()
    launcher.classList.remove("show")
    setTimeout(() => launcher.classList.add("hidden"), 200)
  })
})
