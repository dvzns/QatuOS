const termOut=document.getElementById("termOut")
const termIn=document.getElementById("termIn")
function tprint(t){const d=document.createElement("div");d.textContent=t;termOut.appendChild(d);termOut.scrollTop=termOut.scrollHeight}
tprint("QatuOS Terminal. type 'help'")
termIn.addEventListener("keydown",e=>{
  if(e.key!=="Enter") return
  const cmd=termIn.value.trim();termIn.value=""
  tprint("$ "+cmd)
  if(!cmd) return
  if(cmd==="help") tprint("help,clear,about,echo [text]")
  else if(cmd==="clear") termOut.innerHTML=""
  else if(cmd==="about") tprint("QatuOS Web Demo")
  else if(cmd.startsWith("echo ")) tprint(cmd.slice(5))
  else tprint("Unknown command")
})

const filesArea=document.getElementById("filesArea")
const sampleFiles=[
  {name:"Desktop",type:"folder",icon:"/boot/efi/assets/icons/folder.png"},
  {name:"Documents",type:"folder",icon:"/boot/efi/assets/icons/folder.png"},
  {name:"Pictures",type:"folder",icon:"/boot/efi/assets/icons/folder.png"},
  {name:"readme.txt",type:"file",icon:"/boot/efi/assets/icons/file.png"}
]
function buildFiles(folder){
  filesArea.innerHTML=""
  sampleFiles.forEach(f=>{
    const div=document.createElement("div")
    div.className="file"
    div.innerHTML=`<img src="${f.icon}" style="width:56px;height:56px;margin-bottom:8px"><div>${f.name}</div>`
    div.addEventListener("dblclick",()=>{
      if(f.type==="folder"){filesArea.innerHTML=`<div style="padding:14px;color:#fff">Opened ${f.name}</div>`}
    })
    filesArea.appendChild(div)
  })
}
buildFiles("root")

document.getElementById("saveNote").addEventListener("click",()=>{
  save("qatu_notes",document.getElementById("notesText").value)
})
document.getElementById("notesText").value=load("qatu_notes","")

document.getElementById("musicFile").addEventListener("change",e=>{
  const f=e.target.files[0]
  if(f){document.getElementById("musicPlayer").src=URL.createObjectURL(f)}
})

function buildCalculator(){
  const area=document.getElementById("calculatorArea")
  area.innerHTML=""
  const display=document.createElement("div")
  display.style.width="100%";display.style.height="40px";display.style.marginBottom="8px";display.style.background="rgba(255,255,255,.06)";display.style.borderRadius="8px";display.style.display="flex";display.style.alignItems="center";display.style.justifyContent="flex-end";display.style.padding="8px";display.style.fontSize="18px"
  area.appendChild(display)
  const buttons=["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"]
  const wrap=document.createElement("div")
  buttons.forEach(b=>{
    const btn=document.createElement("button")
    btn.className="calculator-btn"
    btn.textContent=b
    btn.addEventListener("click",()=>{
      if(b==="="){try{display.textContent=eval(display.textContent)}catch(e){display.textContent="err"}}
      else display.textContent+=b
    })
    wrap.appendChild(btn)
  })
  area.appendChild(wrap)
}
buildCalculator()
