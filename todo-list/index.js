const textImput = document.getElementById("todos");
const todoAddBtn = document.getElementById("add-btn");
const todoItems = document.querySelector("#todo-name");
const todoClearBtn = document.querySelector("#clear")

class Storage {
  static addTodoStorage(todoArr){
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }
  static getStorage(){
    let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }

}

let title = "";
let todoArr = Storage.getStorage();

todoAddBtn.addEventListener("click",(e) =>{
  e.preventDefault();
  let id = todoArr.length + 1;
  let title = textImput.value;
  const todo = new Todo(id,title);
  todoArr = [...todoArr,todo]
  IU.alert("Başriyla Eklendi");
  IU.clearInput();
  IU.displayTodos();
  Storage.addTodoStorage(todoArr);
})


class Todo {
  constructor(id,title){
    this.id = id; 
    this.title = title;
  }
}

class IU {

  static displayTodos(){
     let result = ""; 

    if(todoArr.length === 0){
        todoItems.innerHTML = "Liste Boş ";
    }else{
    todoArr.map((item) => {
        result += `
        <li class="flex justify-between border px-4 py-3 flex-items-center justify-between ">
            <span>${item.title}</span>
            <button class="text-red-400 remove" data-id="${item.id}" >Sil</button>
            </li>        `
    })
    todoItems.innerHTML = result;
    }
  }
   static clearInput(){
    textImput.value = ""
  }
  static removeTodo(){
    todoItems.addEventListener("click", (e) => {
      if(e.target.classList.contains("remove")){
        e.target.parentElement.remove();
        let btnId = e.target.dataset.id;
        IU.removeArrayTodo(btnId);
      }
    })
  }
  static removeArrayTodo(id){
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addTodoStorage(todoArr);
    IU.displayTodos();
    IU.alert("Todo Silindi");
  }
  static clearTodos(){
    todoClearBtn.addEventListener("click", () => {
      todoArr = [];
      Storage.addTodoStorage(todoArr);
      IU.displayTodos();
      IU.alert("Liste Temizlendi");
    })
  }z
  static alert(text){
    window.alert(text)
  }
}

window.addEventListener("DOMContentLoaded", () => {
  IU.removeTodo();
  IU.displayTodos();
  IU.clearTodos();
});
