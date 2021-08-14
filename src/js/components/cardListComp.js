const { addCardEvent } = require("./listsComp");

require("../../css/common.css");
require("../../css/header.css");
require("../../css/cards.css");

const cardContentComp = () => {
  let cards = JSON.parse(localStorage.getItem("toDoList"));
  if (cards === null || cards === undefined || cards === []) return;
  cardArrayComp(cards);
  addCardEvent();
};

const cardArray = (cardArr = [], cardCont = []) => {
  for (let i = 0; i < cardArr.length; i++) {
    let result = "";
    let cardList = cardArr[i].cardList;
    let listId = cardCont[i].dataset.id;

    if (cardArr[i].id === listId && cardList.length != 0) {
      for (let j = 0; j < cardList.length; j++) {
        result += `
              <div class="card-parent" data-id="${cardList[j].card_id}">
                <div class="card-header">
                  <h2>${cardList[j].title}</h2>
                  <div class="icons">
                    <span data-favorite="${cardList[j].isFavorite}"><i class="far fa-star"></i></span>
                    <span><i class="far fa-trash-alt"></i></span>
                  </div>
                </div>
                <div class="cardDesc" id="cardDesc">
                  <p>${cardList[j].description}</p>
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
  if (cardCont === null || cardCont === undefined || cardCont === []) return;
  cardArray(cardArr, cardCont);
};

module.exports = {
  cardContentComp,
};
