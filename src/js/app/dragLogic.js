// drag and drop functinality

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
              <div class="card-parent draggable" draggable="true" data-id="${cardList[j].card_id}">
                <div class="card-header">
                  <h2 style="font-size:20px; text-transform:capitalize;">${cardList[j].title}</h2>
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

// find the dragged card in store

const updateData = (listId, todoList, listObj) => {
  let index = todoList.findIndex((list) => {
    return list.id == listId;
  });
  todoList.splice(index, 1, listObj);
  localStorage.setItem("toDoList", JSON.stringify(todoList));
};

const deleteDraggedCard = (e, listId) => {
  if (listId) {
    let cardId = e.target.dataset.id;
    let todos = JSON.parse(localStorage.getItem("toDoList"));
    if (todos === null || todos === undefined || todos.length == 0) return;
    let listObj = todos.find((list) => list.id == listId);
    let cardList = listObj.cardList;
    let card = cardList.find((card) => card.card_id == cardId);
    // console.log(card);
    if (card) {
      let index = cardList.findIndex((card) => {
        return card.card_id == cardId;
      });
      cardList.splice(index, 1);
      listObj.cardList = cardList;
      updateData(listId, todos, listObj);
    }
  }
};

//find index of dragged elem

const findDraggedIndex = (e, elem) => {
  let nodeList = elem.querySelectorAll(".draggable");
  let nodeArr = [...nodeList];
  let index = nodeArr.indexOf(e.target);
  return index;
};

// update store of cards
const updateListOfCards = (e, index) => {
  let listId = e.target.parentElement.dataset.id;
  let cardId = e.target.dataset.id;
  // console.log(listId, cardId);
  if (listId && cardId) {
    let todos = JSON.parse(localStorage.getItem("toDoList"));
    let cards = todos.map((todo) => todo.cardList);
    let cardsArr = [].concat(...cards);
    let card = cardsArr.find((card) => cardId == card.card_id);
    //console.log(card);
    let listObj = todos.find((list) => listId == list.id);
    let cardList = listObj.cardList;
    cardList.splice(index, 0, card);
    listObj.cardList = cardList;
    updateData(listId, todos, listObj);
    updateCardListDom(listId, listObj);
    draggingEvents();
  }
};

// drag and drop functionality
// dragging start

const startDragging = () => {
  let draggables = document.querySelectorAll(".draggable");
  let listId;
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      listId = e.target.parentElement.dataset.id;
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", (e) => {
      let elem = e.target.parentElement;
      if (elem == null) return;
      let id = elem.dataset.id;
      draggable.classList.remove("dragging");
      if (listId == id) return;
      let index = findDraggedIndex(e, elem);
      updateListOfCards(e, index);
      deleteDraggedCard(e, listId);
    });
  });
};

//drop containers
const draggingOver = () => {
  let containers = document.querySelectorAll(".drag-container");
  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      let children = container.children;
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        children[1].appendChild(draggable);
      } else {
        children[1].insertBefore(draggable, afterElement);
      }
    });
  });
};

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ]; // elems which not have dragging class

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2; // distance b/w center of box and cursor //negative num is dead center
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest; // previous returnrd value
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element; // return reduced value
}

const draggingEvents = () => {
  startDragging();
  draggingOver();
};

module.exports = {
  draggingEvents,
};
