function fadeIn(el) {
  if (!el) return
  el.classList.remove("hidden")
  requestAnimationFrame(()=>{ el.style.opacity = "1" })
}
function fadeOut(el, wait=600) {
  if (!el) return
  el.style.opacity = "0"
  setTimeout(()=>{ el.classList.add("hidden") }, wait)
}
function qs(sel){ return document.querySelector(sel) }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)) }
