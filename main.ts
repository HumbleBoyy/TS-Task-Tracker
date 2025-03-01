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

type TodoType = {
    id:number,
    value:string,
    isDone:boolean
}

const todos:TodoType[] = getState("todos") || []

elForm?.addEventListener("submit", (e:Event):void=> {
    e.preventDefault()
    const data:TodoType = {
        id:todos.length ? todos[todos.length -1].id + 1 : 1,
        value:(elInput as HTMLInputElement).value,
        isDone:false
    }
    todos.push(data)
    renderTodos(todos, elList);
    (e.target as HTMLFormElement).reset()
    setState("todos", todos)
})
function renderTodos(arr:TodoType[], list:Element | null):void{
       if(list) list.innerHTML = ""
       arr.forEach((item:TodoType, index:number)=> {
          let elItem:Element = document.createElement("li")
          elItem.className = "flex items-center justify-between p-2 rounded-md bg-white"
          elItem.innerHTML = `
             <div class="flex items-center gap-1">
                <span>${index + 1}</span>
                <strong>${item.value}</strong>
             </div>
             <button onclick="handleDelete(${index})" class="bg-red-500 p-2 text-white rounded-md">Delete</button>
          `

          list?.appendChild(elItem)
       })
}

renderTodos(todos, elList)

function handleDelete(id:number):void{
    todos.splice(id, 1)
    renderTodos(todos, elList)
    setState("todos", todos)
}