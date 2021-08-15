const { cardContentComp } = require("../components/cardListComp");
const { listContentComp, NoListContComp } = require("../components/listsComp");
const { events, closeModal, showInfo, hideInfo } = require("../util");

const addListLogic = (e) => {
  let input = document.getElementById("title-inp").value;
  let value = input.toLowerCase();
  if (value === "") return showInfo("Title is Mandatory");
  if (document.getElementById("msg")) {
    hideInfo();
  }
  validateTitle(value);
};

const validateTitle = (value = "") => {
  let todos = JSON.parse(localStorage.getItem("toDoList"));
  if (todos === null || todos === undefined || todos.length == 0) {
    let toDosList = [];
    let todoObj = {
      id: Date.now(),
      title: value,
      cardList: [],
    };
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
const deleteListDom = (element) => {
  if (element.getAttribute("data-action") === "delete") {
    element.parentElement.parentElement.remove();
  }
};

const removeData = (listId) => {
  let todoList = JSON.parse(localStorage.getItem("toDoList"));
  let index = todoList.findIndex((list) => {
    return list.id == listId;
  });
  todoList.splice(index, 1);
  localStorage.setItem("toDoList", JSON.stringify(todoList));
  if (todoList.length == 0) NoListContComp();
};

//remove list logic
const deleteListLogic = (e) => {
  e.stopPropagation();
  let listId = e.target.dataset.id;
  let data = e.target.dataset.action;
  if (data === "delete") {
    deleteListDom(e.target);
    removeData(listId);
  }
};

const addLogicEvent = () => {
  events("#add-list", "click", (e) => {
    addListLogic(e);
  });
};

const deleteLogicEvent = () => {
  events("#listContent", "click", (e) => {
    deleteListLogic(e);
  });
};

module.exports = { addLogicEvent, deleteLogicEvent };
