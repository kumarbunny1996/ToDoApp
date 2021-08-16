require("../../css/common.css");
require("../../css/header.css");
require("../../css/lists.css");
let { events, showModal } = require("../util");
let { addLogicEvent } = require("../app/listLogic");

const toDoListPage = () => {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
       <header>
          <h1>ToDoList</h1>
          <input type="text" id="myInput" placeholder="Search for todos.." autocomplete="off">
          <input type="button" id="myBtn" value="Search" hidden="true">
          <button id="addList" class="btn">Add List</button>
       </header>
       <div class="listContent" id="listContent"></div>
    `;
};

const dialogDom = () => {
  return `
      <div class="modal-header">Add List</div>
      <div class="modal-inp" id="modal-inp">
         <h3 class="title-head">Title</h3>
         <input class="title-inp" id="title-inp" type="text" name="title" autocomplete="off" />
      </div>
      <div class="btns" id="btns">
         <button class="cancel-btn" id="cancel-btn">Cancel</button>
         <button class="btn" id="add-list">Add</button>
      </div>
   `;
};

const addListEvent = () => {
  let dialogValue = dialogDom();
  events("#addList", "click", (e) => {
    showModal(dialogValue);
    addLogicEvent();
  });
};

module.exports = { toDoListPage, dialogDom, addListEvent };
