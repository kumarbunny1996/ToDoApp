const { cardContentComp } = require("../components/cardListComp");
const { listContentComp, addCardEvent } = require("../components/listsComp");
const { events } = require("../util");
const { cardDomEvents } = require("./cardLogic");
const { deleteLogicEvent } = require("./listLogic");

const searchLogic = () => {
  let searchValue = document.getElementById("myInput").value.toLowerCase();
  if (searchValue === "") return;
  let todos = JSON.parse(localStorage.getItem("toDoList"));
  if (todos === null || todos === undefined || todos.length == 0) return;
  let cardList = todos.map((todo) => todo.cardList);
  let cards = [].concat(...cardList);
  let searchFil = cards.filter((card) => {
    let matchDesc = card.description.search(searchValue);
    return card.title === searchValue || matchDesc !== -1;
  });
  searchResultComp();
  if (searchFil.length == 0) {
    NoSearchListContComp();
  } else {
    searchResultsDom(searchFil);
  }
};

const searchResultComp = () => {
  let mainCont = document.getElementById("main-content");
  let listCont = document.getElementById("listContent");
  mainCont.removeChild(listCont);
  let searchCont = document.createElement("div");
  searchCont.className = "searchCont";
  searchCont.id = "searchCont";
  searchCont.innerHTML = `
    <button class="clr-btn" id="clear"> clear results</button>
    <div class="searchList" id="searchList"></div>
  `;
  mainCont.appendChild(searchCont);
};

const searchResultsDom = (results = []) => {
  let searchList = document.getElementById("searchList");
  let result = "";
  for (let j = 0; j < results.length; j++) {
    result += `
              <div class="card-parent draggable" data-id="${results[j].card_id}">
                <div class="card-header">
                  <h2 style="font-size:20px; text-transform: capitalize;">${results[j].title}</h2>
                </div>
                <div class="cardDesc" id="cardDesc">
                  <p class="desc">${results[j].description}</p>
                </div>
              </div>
        `;
  }
  searchList.innerHTML = result;
};

const NoSearchListContComp = () => {
  let listCont = document.getElementById("searchList");
  listCont.innerHTML = `
    <div class="no-cont">
      <p>No List Available</p>
    </div>
  `;
};

const clearLogic = (e) => {
  listContentComp();
  addCardEvent();
  deleteLogicEvent();
  cardContentComp();
  cardDomEvents();
};

const searchEvent = () => {
  events("#myInput", "keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("myBtn").click();
      searchLogic();
      clearEvent();
    }
  });
};

const clearEvent = () => {
  events("#clear", "click", (e) => {
    clearLogic(e);
  });
};

module.exports = {
  searchEvent,
};
