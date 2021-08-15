const { events, closeModal, showInfo, hideInfo } = require("../util");
const { cardContentComp } = require("../components/cardListComp");

require("../../css/common.css");
require("../../css/header.css");
require("../../css/cards.css");

const updateData = (listId, todoList, listObj) => {
  let index = todoList.findIndex((list) => {
    return list.id == listId;
  });
  todoList.splice(index, 1, listObj);
  localStorage.setItem("toDoList", JSON.stringify(todoList));
};

const addCardData = (listObj, title, desc) => {
  let cardList = listObj.cardList;
  let cardObj = {
    card_id: Date.now(),
    title: title,
    description: desc,
    isFavorite: false,
  };
  cardList.unshift(cardObj);
  listObj.cardList = cardList;
  console.log(listObj);
};

const updateCardListDom = (listId, listObj) => {
  let cardCont = document.getElementsByClassName("cardList");
  let cardList = listObj.cardList;
  if (cardCont === null || cardCont === undefined || cardCont.length == 0)
    return;
  for (let i = 0; i < cardCont.length; i++) {
    let result = "";
    if (listId == cardCont[i].dataset.id && cardList.length != 0) {
      for (let j = 0; j < cardList.length; j++) {
        result += `
              <div class="card-parent" data-id="${cardList[j].card_id}">
                <div class="card-header">
                  <h2>${cardList[j].title}</h2>
                  <div class="icons">
                   <i class="far fa-star" data-favorite="${cardList[j].isFavorite}" data-id="${cardList[j].card_id}" data-list="${listId}" data-action="favorite"></i>
                   <i class="far fa-trash-alt" data-id="${cardList[j].card_id}" data-list="${listId}" data-action="delete-card"></i>
                  </div>
                </div>
                <div class="cardDesc" id="cardDesc">
                  <p class="desc">${cardList[j].description}</p>
                </div>
              </div>
        `;
      }
      cardCont[i].innerHTML = result;
    }
  }
};

const addCardInps = (title, desc, listId) => {
  let todos = JSON.parse(localStorage.getItem("toDoList"));
  if (todos === null || todos === undefined || todos.length == 0) return;
  let listObj = todos.find((list) => list.id == listId);
  if (listObj) {
    addCardData(listObj, title, desc);
    updateData(listId, todos, listObj);
    updateCardListDom(listId, listObj);
    closeModal();
  }
};

const addCardLogic = (e) => {
  let input = document.getElementById("card-inp").value;
  let desc = document.getElementById("desc-inp").value;
  let listId = e.target.dataset.id;
  let title = input;
  if (title === "") return showInfo("Title is Mandatory");
  if (document.getElementById("msg")) {
    hideInfo();
  }
  addCardInps(title, desc, listId);
};

//favorite

const favoriteDomUpdate = (elem, isFavorite) => {
  if (isFavorite === true) {
    elem.style.color = "orange";
  } else {
    elem.style.color = "grey";
  }
};

const updateCardFavorite = (listObj, cardId, elem) => {
  let cardList = listObj.cardList;
  let card = cardList.find((card) => card.card_id == cardId);
  console.log(card);
  if (card) {
    let isFavorite = !card.isFavorite;
    card.isFavorite = isFavorite;
    let index = cardList.findIndex((card) => {
      return card.card_id == cardId;
    });
    cardList.splice(index, 1, card);
    listObj.cardList = cardList;
    favoriteDomUpdate(elem, isFavorite);
  }
};

// favorite logic

const favoriteCardLogic = (e) => {
  e.stopPropagation();
  let cardId = e.target.dataset.id;
  let listId = e.target.dataset.list;
  let data = e.target.dataset.action;
  if (data == "favorite") {
    let todos = JSON.parse(localStorage.getItem("toDoList"));
    if (todos === null || todos === undefined || todos.length == 0) return;
    let listObj = todos.find((list) => list.id == listId);
    if (listObj) {
      updateCardFavorite(listObj, cardId, e.target);
      updateData(listId, todos, listObj);
    }
  } else return;
};

// delete card

const deleteCardDom = (element) => {
  if (element.getAttribute("data-action") === "delete-card") {
    element.parentElement.parentElement.parentElement.remove();
  }
};

//if cardList is empty

const noCardComp = (listObj) => {
  let cardCont = document.getElementsByClassName("cardList");
  let cardList = listObj.cardList;
  let listId = listObj.id;
  if (cardCont === null || cardCont === undefined || cardCont.length == 0)
    return;
  for (let i = 0; i < cardCont.length; i++) {
    if (listId == cardCont[i].dataset.id && cardList.length == 0) {
      cardCont[i].innerHTML = `
              <div class="no-card">
                <p>No Card Available</p>
              </div>
            `;
    }
  }
};

const updateCardList = (listObj, cardId, elem) => {
  let cardList = listObj.cardList;
  let card = cardList.find((card) => card.card_id == cardId);
  console.log(card);
  if (card) {
    let index = cardList.findIndex((card) => {
      return card.card_id == cardId;
    });
    cardList.splice(index, 1);
    listObj.cardList = cardList;
    deleteCardDom(elem);
    if (cardList.length == 0) {
      noCardComp(listObj);
    }
  }
};

// delete card logic
const deleteCardLogic = (e) => {
  e.stopPropagation();
  let cardId = e.target.dataset.id;
  let listId = e.target.dataset.list;
  let data = e.target.dataset.action;
  if (data == "delete-card") {
    let todos = JSON.parse(localStorage.getItem("toDoList"));
    if (todos === null || todos === undefined || todos.length == 0) return;
    let listObj = todos.find((list) => list.id == listId);
    if (listObj) {
      updateCardList(listObj, cardId, e.target);
      updateData(listId, todos, listObj);
    }
  }
};

const addCardEventLogic = () => {
  events("#add-card", "click", (e) => {
    addCardLogic(e);
  });
};

const favoriteCardEvent = () => {
  events("#listContent", "click", (e) => {
    favoriteCardLogic(e);
  });
};

const deleteCardEvent = () => {
  events("#listContent", "click", (e) => {
    deleteCardLogic(e);
  });
};

module.exports = {
  addCardEventLogic,
  favoriteCardEvent,
  deleteCardEvent,
  noCardComp,
};
