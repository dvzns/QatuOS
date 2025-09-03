window.addEventListener("load", () => {
  const boot = document.getElementById("bootScreen")
  const enter = document.getElementById("enterScreen")
  const enterBtn = document.getElementById("enterBtn")
  const dock = document.getElementById("dock")
  const wallpaper = document.getElementById("wallpaper")
  const topbar = document.getElementById("topbar")
  const loading = document.getElementById("loadingScreen")
  setTimeout(() => {
    boot.style.opacity = "0"
    setTimeout(()=> boot.classList.add("hidden"), 600)
    enter.classList.remove("hidden")
    enter.style.opacity = "1"
  }, 1400)
  enterBtn.addEventListener("click", () => {
    enter.style.opacity = "0"
    setTimeout(()=> {
      enter.classList.add("hidden")
      loading.classList.remove("hidden")
      loading.style.opacity = "1"
      setTimeout(()=> {
        loading.style.opacity = "0"
        setTimeout(()=> {
          loading.classList.add("hidden")
          wallpaper.style.opacity = "1"
          topbar.style.opacity = "1"
          dock.style.display = "flex"
          setTimeout(()=> dock.style.opacity = "1", 60)
          startClock()
          updateBattery()
        }, 600)
      }, 1400)
    }, 280)
  })
  qsa(".boot-option").forEach(b => {
    b.addEventListener("click", () => {
      qsa(".boot-option").forEach(x=>x.classList.remove("active"))
      b.classList.add("active")
    })
  })
})
function startClock() {
  const timeEl = document.getElementById("time")
  if (!timeEl) return
  const tick = ()=> {
    const now = new Date()
    timeEl.textContent = now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})
  }
  tick()
  setInterval(tick, 1000)
}
function updateBattery() {
  const battEl = document.getElementById("battery")
  if (!battEl) return
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      const refresh = ()=> battEl.textContent = Math.round(battery.level * 100) + "%"
      refresh()
      battery.addEventListener("levelchange", refresh)
    })
  } else {
    battEl.textContent = "100%"
  }
}
