"use strict";
// Store data 
const setState = (key, value) => {
    if (typeof value == "string") {
        localStorage.setItem(key, value);
    }
    else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
const getState = (key) => {
    const data = localStorage.getItem(key);
    if (data != null) {
        try {
            return JSON.parse(data);
        }
        catch (err) {
            return data;
        }
    }
};
let elForm = document.querySelector(".todo_form");
let elInput = document.querySelector(".todo_input");
let elList = document.querySelector(".list");
const todos = getState("todos") || [];
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        value: elInput.value,
        isDone: false
    };
    todos.push(data);
    renderTodos(todos, elList);
    e.target.reset();
    setState("todos", todos);
});
function renderTodos(arr, list) {
    if (list)
        list.innerHTML = "";
    arr.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = "flex items-center justify-between p-2 rounded-md bg-white";
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
          `;
        list === null || list === void 0 ? void 0 : list.appendChild(elItem);
    });
}
renderTodos(todos, elList);
// Delete Part
function handleDelete(id) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}
// Edit Part
function handleEdit(id) {
    const newData = todos.find(item => item.id == id);
}
