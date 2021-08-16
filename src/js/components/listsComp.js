require("../../css/common.css");
require("../../css/header.css");
require("../../css/lists.css");
const { addCardEventLogic } = require("../app/cardLogic");
let { events, showModal } = require("../util");

const listContentComp = () => {
  if (document.getElementById("searchCont")) {
    removeSearchComp();
  }
  let todos = JSON.parse(localStorage.getItem("toDoList"));
  if (todos === null || todos === undefined || todos.length == 0) {
    NoListContComp();
  } else {
    listArrayComp(todos);
  }
};

const NoListContComp = () => {
  let listCont = document.getElementById("listContent");
  listCont.innerHTML = `
    <div class="no-cont">
      <p>No List Available</p>
    </div>
  `;
};

const removeSearchComp = () => {
  let mainCont = document.getElementById("main-content");
  let searchCont = document.getElementById("searchCont");
  mainCont.removeChild(searchCont);
  let listContent = document.createElement("div");
  listContent.className = "listContent";
  listContent.id = "listContent";
  mainCont.appendChild(listContent);
};
const listArrayComp = (listArr = []) => {
  let listCont = document.getElementById("listContent");
  let result = "";
  for (let i = 0; i < listArr.length; i++) {
    result += `
            <div class="list-parent drag-container" data-id="${listArr[i].id}">
              <div class="list-header">
                <h2 style="font-size:24px; font-weight:900; text-transform: capitalize;">${listArr[i].title}</h2>
                <i class="far fa-trash-alt icon-style" data-id="${listArr[i].id}" data-action="delete"></i>
              </div>
              <div class="cardList" id="cardList" data-id="${listArr[i].id}"></div>
              <button class="card-btn" id="card-btn" data-id="${listArr[i].id}" data-action="add-card" ><i class="fas fa-plus"></i> Add Card</button>
            </div>
        `;
  }
  listCont.innerHTML = result;
};

const cardDialogDom = (id) => {
  return `
      <div class="modal-header">Add Card</div>
      <div class="modal-inp" id="modal-inp">
         <h3 class="title-head">Title *</h3>
         <input class="title-inp" id="card-inp" type="text" name="title" />
      </div>
       <div class="modal-inp" id="modal-desc">
         <h3 class="title-head">Description</h3>
         <textarea class="desc-inp" id="desc-inp" name="description"></textarea>
      </div>
      <div class="btns" id="btns">
         <button class="cancel-btn" id="cancel-btn" data-id="${id}">Cancel</button>
         <button class="btn" id="add-card" data-id="${id}">Add</button>
      </div>
   `;
};

const addCardEvent = () => {
  events("#listContent", "click", (e) => {
    e.stopPropagation();
    let listId = e.target.dataset.id;
    let data = e.target.dataset.action;
    if (data === "add-card") {
      let dialogValue = cardDialogDom(listId);
      // if (document.getElementById("modal")) {
      //   document.body.removeChild(document.getElementById("modal"));
      // }
      showModal(dialogValue);
      addCardEventLogic();
    }
  });
};

module.exports = {
  listContentComp,
  addCardEvent,
  NoListContComp,
  removeSearchComp,
};
