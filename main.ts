// Store data 
const setState = (key:string, value:any):void => {
     if(typeof value == "string"){
         localStorage.setItem(key, value)
     }else{
        localStorage.setItem(key, JSON.stringify(value))
     }
}

const getState = (key:string):any => {
    const data = localStorage.getItem(key)
    if(data != null){
        try{
            return JSON.parse(data)
        }catch(err){
            return data
        }
    }
}




let elForm:Element | null = document.querySelector(".todo_form")
let elInput:Element | null = document.querySelector(".todo_input")
let elList:Element | null = document.querySelector(".list")

interface TodoType  {
    id:number,
    value:string,
    isDone:boolean
}

const todos:TodoType[] = getState("todos") || []
let isEdit:boolean = false
let editedid:number | null = null

elForm?.addEventListener("submit", (e:Event):void=> {
    e.preventDefault()
     if(isEdit){
        const newData = todos.find(item => item.id === editedid);
        if(newData){
            newData.value = (elInput as HTMLInputElement).value
        }
     }else{
        const data:TodoType = {
            id:todos.length ? todos[todos.length -1].id + 1 : 1,
            value:(elInput as HTMLInputElement).value,
            isDone:false
        }
        todos.push(data)
     }
    renderTodos(todos, elList);
    (e.target as HTMLFormElement).reset()
    location.reload()
    setState("todos", todos)
})
function renderTodos(arr:TodoType[], list:Element | null):void{
       if(list) list.innerHTML = ""
       arr.forEach((item:TodoType, index:number)=> {
          let elItem:Element = document.createElement("li")
          elItem.className = "flex items-center justify-between p-2 rounded-md bg-white"
          elItem.innerHTML = `
             <div class="flex items-center justify-between gap-1 w-full">
                <div class="flex items-center gap-1">
                  <span class="text-[20px]">${index + 1})</span>
                  <strong class="text-[22px] line-clamp-1 w-[400px]">${item.value}</strong>
                </div>
                <div class="flex items-center gap-1">
                   <button onclick="handleEdit(${item.id})" class="bg-blue-500 py-2 px-3 text-white rounded-md cursor-pointer"><i class="fa-solid fa-pen-to-square"></i></button>
                   <button onclick="handleDelete(${index})" class="bg-red-500 py-2 px-3 text-white rounded-md cursor-pointer "><i class="fa-solid fa-trash"></i></button>
                </div>
             </div>
          `

          list?.appendChild(elItem)
       })
}

renderTodos(todos, elList)

// Delete Part
function handleDelete(id:number):void{
    todos.splice(id, 1)
    renderTodos(todos, elList)
    setState("todos", todos)
}


// Edit Part

function handleEdit(id:number):void{
    const newData = todos.find(item => item.id === id);
    if(newData){
        (elInput as HTMLInputElement).value = newData?.value
        isEdit = true
        editedid = id
    }
}