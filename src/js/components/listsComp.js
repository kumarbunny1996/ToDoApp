require("../../css/common.css");
require("../../css/header.css");
require("../../css/lists.css");
let { events, showModal } = require("../util");

const listContentComp = () => {
  let todos = JSON.parse(localStorage.getItem("toDoList"));
  //console.log(todos);
  if (todos === null || todos === undefined || todos === []) {
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

const listArrayComp = (listArr = []) => {
  let listCont = document.getElementById("listContent");
  let result = "";
  for (let i = 0; i < listArr.length; i++) {
    result += `
            <div class="list-parent" data-id="${listArr[i].id}">
              <div class="list-header">
                <h2>${listArr[i].title}</h2>
                <i class="far fa-trash-alt icon-style" data-id="${listArr[i].id}" data-action="delete"></i>
              </div>
              <div class="cardList" id="cardList" data-id="${listArr[i].id}"></div>
              <button class="card-btn" id="card-btn"><i class="fas fa-plus"></i> Add Card</button>
            </div>
        `;
  }
  listCont.innerHTML = result;
};

const cardDialogDom = () => {
  return `
      <div class="modal-header">Add Card</div>
      <div class="modal-inp">
         <h3 class="title-head">Title *</h3>
         <input class="title-inp" id="title-inp" type="text" name="title" />
      </div>
       <div class="modal-inp" id="modal-inp">
         <h3 class="title-head">Description</h3>
         <input class="desc-inp" id="desc-inp" type="text" name="description" />
      </div>
      <div class="btns" id="btns">
         <button class="cancel-btn" id="cancel-btn">Cancel</button>
         <button class="btn" id="add-btn">Add</button>
      </div>
   `;
};

const addCardEvent = () => {
  let dialogValue = cardDialogDom();
  events("#card-btn", "click", (e) => {
    showModal(dialogValue);
  });
};

module.exports = {
  listContentComp,
  addCardEvent,
};
