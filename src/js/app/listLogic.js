const { cardContentComp } = require("../components/cardListComp");
const { listContentComp } = require("../components/listsComp");
const { events, closeModal, showInfo, hideInfo } = require("../util");

const addListLogic = (e) => {
  let input = document.getElementById("title-inp").value;
  let value = input;
  if (value === "") return showInfo("Title is Mandatory");
  if (document.getElementById("msg")) {
    hideInfo();
  }
  validateTitle(value);
};

const validateTitle = (value = "") => {
  let todos = JSON.parse(localStorage.getItem("toDoList"));
  //console.log(todos);
  if (todos === null || todos === undefined || todos === []) {
    let toDosList = [];
    let todoObj = {
      id: Date.now(),
      title: value,
      cardList: [],
    };
    // console.log(todoObj);
    toDosList.push(todoObj);
    localStorage.setItem("toDoList", JSON.stringify(toDosList));
    listContentComp();
    cardContentComp();
    closeModal();
  } else {
    let listObj = todos.find((list) => value === list.title);
    console.log(listObj);
    if (listObj) {
      showInfo("Title must be unique, this title already exits");
      return;
    } else {
      if (document.getElementById("msg")) {
        hideInfo();
      }
      let todoObj = {
        id: Date.now(),
        title: value,
        cardList: [],
      };
      todos.push(todoObj);
      localStorage.setItem("toDoList", JSON.stringify(todos));
      listContentComp();
      cardContentComp();
      closeModal();
    }
  }
};

//deletes the dom
function deleteListDom(element) {
    if (element.getAttribute('data-action') === 'delete') {
        element.parentElement.parentElement.remove();
    }
}

const removeData = (listId)=>{
  let todoList = JSON.parse(localStorage.getItem("toDoList"));
   let index = todoList.findIndex((list) => {
     return list.id == listId;
   });
   todoList.splice(index, 1);
   localStorage.setItem("toDoList", JSON.stringify(todoList));
}

//remove list logic
const deleteListLogic = (e) => {
  e.stopPropagation();
    let listId = e.target.dataset.id;
    let data = e.target.dataset.action;
    if (data === 'delete') {
        deleteListDom(e.target);
        removeData(listId);
    }
};

const addLogicEvent = () => {
  events("#add-btn", "click", (e) => {
    addListLogic(e);
  });
};

const deleteLogicEvent = () => {
  events("#listContent", "click", (e) => {
    deleteListLogic(e);
  });
};

module.exports = { addLogicEvent, deleteLogicEvent };