
require("../../css/common.css");
require("../../css/header.css");
require("../../css/cards.css");

const cardContentComp = () => {
  let todos = JSON.parse(localStorage.getItem("toDoList"));
  if (todos === null || todos === undefined || todos.length == 0) return;
  cardArrayComp(todos);
};

const cardArray = (cardArr = [], cardCont = []) => {
  for (let i = 0; i < cardArr.length; i++) {
    let result = "";
    let cardList = cardArr[i].cardList;
    let listId = cardCont[i].dataset.id;

    if (cardArr[i].id == listId && cardList.length != 0) {
      for (let j = 0; j < cardList.length; j++) {
        result += `
              <div class="card-parent draggable" data-id="${cardList[j].card_id}" draggable="true">
                <div class="card-header">
                  <h2 style="font-size:20px; text-transform: capitalize;">${cardList[j].title}</h2>
                  <div class="icons">
                   <i class="far fa-star" data-favorite="${cardList[j].isFavorite}" data-id="${cardList[j].card_id}" data-list="${cardArr[i].id}" data-action="favorite"></i>
                   <i class="far fa-trash-alt" data-id="${cardList[j].card_id}" data-list="${cardArr[i].id}" data-action="delete-card"></i>
                  </div>
                </div>
                <div class="cardDesc" id="cardDesc">
                  <p class="desc">${cardList[j].description}</p>
                </div>
              </div>
        `;
      }
      cardCont[i].innerHTML = result;
    } else {
      cardCont[i].innerHTML = `
              <div class="no-card">
                <p>No Card Available</p>
              </div>
            `;
    }
  }
};

const cardArrayComp = (cardArr = []) => {
  let cardCont = document.getElementsByClassName("cardList");
  if (cardCont === null || cardCont === undefined || cardCont.length == 0)
    return;
  cardArray(cardArr, cardCont);
};

module.exports = {
  cardContentComp,
};
