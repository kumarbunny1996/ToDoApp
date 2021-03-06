/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app/cardLogic.js":
/*!*********************************!*\
  !*** ./src/js/app/cardLogic.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  events,\n  closeModal,\n  showInfo,\n  hideInfo\n} = __webpack_require__(/*! ../util */ \"./src/js/util.js\");\n\nconst {\n  draggingEvents\n} = __webpack_require__(/*! ./dragLogic */ \"./src/js/app/dragLogic.js\");\n\n__webpack_require__(/*! ../../css/common.css */ \"./src/css/common.css\");\n\n__webpack_require__(/*! ../../css/header.css */ \"./src/css/header.css\");\n\n__webpack_require__(/*! ../../css/cards.css */ \"./src/css/cards.css\");\n\nconst updateData = (listId, todoList, listObj) => {\n  let index = todoList.findIndex(list => {\n    return list.id == listId;\n  });\n  todoList.splice(index, 1, listObj);\n  localStorage.setItem(\"toDoList\", JSON.stringify(todoList));\n};\n\nconst addCardData = (listObj, title, desc) => {\n  let cardList = listObj.cardList;\n  let cardObj = {\n    card_id: Date.now(),\n    title: title,\n    description: desc,\n    isFavorite: false\n  };\n  cardList.unshift(cardObj);\n  listObj.cardList = cardList; //console.log(listObj);\n};\n\nconst updateCardListDom = (listId, listObj) => {\n  let cardCont = document.getElementsByClassName(\"cardList\");\n  let cardList = listObj.cardList;\n  if (cardCont === null || cardCont === undefined || cardCont.length == 0) return;\n\n  for (let i = 0; i < cardCont.length; i++) {\n    let result = \"\";\n\n    if (listId == cardCont[i].dataset.id && cardList.length != 0) {\n      for (let j = 0; j < cardList.length; j++) {\n        result += `\n              <div class=\"card-parent draggable\" draggable=\"true\" data-id=\"${cardList[j].card_id}\">\n                <div class=\"card-header\">\n                  <h2 style=\"font-size:20px; text-transform:capitalize;\">${cardList[j].title}</h2>\n                  <div class=\"icons\">\n                   <i class=\"far fa-star\" data-favorite=\"${cardList[j].isFavorite}\" data-id=\"${cardList[j].card_id}\" data-list=\"${listId}\" data-action=\"favorite\"></i>\n                   <i class=\"far fa-trash-alt\" data-id=\"${cardList[j].card_id}\" data-list=\"${listId}\" data-action=\"delete-card\"></i>\n                  </div>\n                </div>\n                <div class=\"cardDesc\" id=\"cardDesc\">\n                  <p class=\"desc\">${cardList[j].description}</p>\n                </div>\n              </div>\n        `;\n      }\n\n      cardCont[i].innerHTML = result;\n    }\n  }\n};\n\nconst addCardInps = (title, desc, listId) => {\n  let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n  if (todos === null || todos === undefined || todos.length == 0) return;\n  let listObj = todos.find(list => list.id == listId);\n\n  if (listObj) {\n    addCardData(listObj, title, desc);\n    updateData(listId, todos, listObj);\n    updateCardListDom(listId, listObj);\n    draggingEvents();\n    closeModal();\n  }\n};\n\nconst addCardLogic = e => {\n  let input = document.getElementById(\"card-inp\").value.toLowerCase();\n  let desc = document.getElementById(\"desc-inp\").value.toLowerCase();\n  let listId = e.target.dataset.id;\n  let title = input;\n  if (title === \"\") return showInfo(\"Title is Mandatory\");\n\n  if (document.getElementById(\"msg\")) {\n    hideInfo();\n  }\n\n  addCardInps(title, desc, listId);\n}; //favorite\n\n\nconst favoriteDomUpdate = (elem, isFavorite) => {\n  if (isFavorite === true) {\n    elem.style.color = \"orange\";\n  } else {\n    elem.style.color = \"grey\";\n  }\n};\n\nconst updateCardFavorite = (listObj, cardId, elem) => {\n  let cardList = listObj.cardList;\n  let card = cardList.find(card => card.card_id == cardId); //console.log(card);\n\n  if (card) {\n    let isFavorite = !card.isFavorite;\n    card.isFavorite = isFavorite;\n    let index = cardList.findIndex(card => {\n      return card.card_id == cardId;\n    });\n    cardList.splice(index, 1, card);\n    listObj.cardList = cardList;\n    favoriteDomUpdate(elem, isFavorite);\n  }\n}; // favorite logic\n\n\nconst favoriteCardLogic = e => {\n  e.stopPropagation();\n  let cardId = e.target.dataset.id;\n  let listId = e.target.dataset.list;\n  let data = e.target.dataset.action;\n\n  if (data == \"favorite\") {\n    let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n    if (todos === null || todos === undefined || todos.length == 0) return;\n    let listObj = todos.find(list => list.id == listId);\n\n    if (listObj) {\n      updateCardFavorite(listObj, cardId, e.target);\n      updateData(listId, todos, listObj);\n    }\n  } else return;\n}; // delete card\n\n\nconst deleteCardDom = element => {\n  if (element.getAttribute(\"data-action\") === \"delete-card\") {\n    element.parentElement.parentElement.parentElement.remove();\n  }\n}; //if cardList is empty\n\n\nconst noCardComp = listObj => {\n  let cardCont = document.getElementsByClassName(\"cardList\");\n  let cardList = listObj.cardList;\n  let listId = listObj.id;\n  if (cardCont === null || cardCont === undefined || cardCont.length == 0) return;\n\n  for (let i = 0; i < cardCont.length; i++) {\n    if (listId == cardCont[i].dataset.id && cardList.length == 0) {\n      cardCont[i].innerHTML = `\n              <div class=\"no-card\">\n                <p>No Card Available</p>\n              </div>\n            `;\n    }\n  }\n};\n\nconst updateCardList = (listObj, cardId, elem) => {\n  let cardList = listObj.cardList;\n  let card = cardList.find(card => card.card_id == cardId); //console.log(card);\n\n  if (card) {\n    let index = cardList.findIndex(card => {\n      return card.card_id == cardId;\n    });\n    cardList.splice(index, 1);\n    listObj.cardList = cardList;\n    deleteCardDom(elem);\n\n    if (cardList.length == 0) {\n      noCardComp(listObj);\n    }\n  }\n}; // delete card logic\n\n\nconst deleteCardLogic = e => {\n  e.stopPropagation();\n  let cardId = e.target.dataset.id;\n  let listId = e.target.dataset.list;\n  let data = e.target.dataset.action;\n\n  if (data == \"delete-card\") {\n    let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n    if (todos === null || todos === undefined || todos.length == 0) return;\n    let listObj = todos.find(list => list.id == listId);\n\n    if (listObj) {\n      updateCardList(listObj, cardId, e.target);\n      updateData(listId, todos, listObj);\n    }\n  }\n};\n\nconst addCardEventLogic = () => {\n  events(\"#add-card\", \"click\", e => {\n    addCardLogic(e);\n  });\n};\n\nconst favoriteCardEvent = () => {\n  events(\"#listContent\", \"click\", e => {\n    favoriteCardLogic(e);\n  });\n};\n\nconst deleteCardEvent = () => {\n  events(\"#listContent\", \"click\", e => {\n    deleteCardLogic(e);\n  });\n};\n\nconst cardDomEvents = () => {\n  favoriteCardEvent();\n  deleteCardEvent();\n  draggingEvents();\n};\n\nmodule.exports = {\n  updateCardListDom,\n  addCardEventLogic,\n  cardDomEvents,\n  noCardComp\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/app/cardLogic.js?");

/***/ }),

/***/ "./src/js/app/dragLogic.js":
/*!*********************************!*\
  !*** ./src/js/app/dragLogic.js ***!
  \*********************************/
/***/ ((module) => {

eval("// drag and drop functinality\nconst updateCardListDom = (listId, listObj) => {\n  let cardCont = document.getElementsByClassName(\"cardList\");\n  let cardList = listObj.cardList;\n  if (cardCont === null || cardCont === undefined || cardCont.length == 0) return;\n\n  for (let i = 0; i < cardCont.length; i++) {\n    let result = \"\";\n\n    if (listId == cardCont[i].dataset.id && cardList.length != 0) {\n      for (let j = 0; j < cardList.length; j++) {\n        result += `\n              <div class=\"card-parent draggable\" draggable=\"true\" data-id=\"${cardList[j].card_id}\">\n                <div class=\"card-header\">\n                  <h2 style=\"font-size:20px; text-transform:capitalize;\">${cardList[j].title}</h2>\n                  <div class=\"icons\">\n                   <i class=\"far fa-star\" data-favorite=\"${cardList[j].isFavorite}\" data-id=\"${cardList[j].card_id}\" data-list=\"${listId}\" data-action=\"favorite\"></i>\n                   <i class=\"far fa-trash-alt\" data-id=\"${cardList[j].card_id}\" data-list=\"${listId}\" data-action=\"delete-card\"></i>\n                  </div>\n                </div>\n                <div class=\"cardDesc\" id=\"cardDesc\">\n                  <p class=\"desc\">${cardList[j].description}</p>\n                </div>\n              </div>\n        `;\n      }\n\n      cardCont[i].innerHTML = result;\n    }\n  }\n}; // find the dragged card in store\n\n\nconst updateData = (listId, todoList, listObj) => {\n  let index = todoList.findIndex(list => {\n    return list.id == listId;\n  });\n  todoList.splice(index, 1, listObj);\n  localStorage.setItem(\"toDoList\", JSON.stringify(todoList));\n};\n\nconst deleteDraggedCard = (e, listId) => {\n  if (listId) {\n    let cardId = e.target.dataset.id;\n    let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n    if (todos === null || todos === undefined || todos.length == 0) return;\n    let listObj = todos.find(list => list.id == listId);\n    let cardList = listObj.cardList;\n    let card = cardList.find(card => card.card_id == cardId); // console.log(card);\n\n    if (card) {\n      let index = cardList.findIndex(card => {\n        return card.card_id == cardId;\n      });\n      cardList.splice(index, 1);\n      listObj.cardList = cardList;\n      updateData(listId, todos, listObj);\n    }\n  }\n}; //find index of dragged elem\n\n\nconst findDraggedIndex = (e, elem) => {\n  let nodeList = elem.querySelectorAll(\".draggable\");\n  let nodeArr = [...nodeList];\n  let index = nodeArr.indexOf(e.target);\n  return index;\n}; // update store of cards\n\n\nconst updateListOfCards = (e, index) => {\n  let listId = e.target.parentElement.dataset.id;\n  let cardId = e.target.dataset.id; // console.log(listId, cardId);\n\n  if (listId && cardId) {\n    let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n    let cards = todos.map(todo => todo.cardList);\n    let cardsArr = [].concat(...cards);\n    let card = cardsArr.find(card => cardId == card.card_id); //console.log(card);\n\n    let listObj = todos.find(list => listId == list.id);\n    let cardList = listObj.cardList;\n    cardList.splice(index, 0, card);\n    listObj.cardList = cardList;\n    updateData(listId, todos, listObj);\n    updateCardListDom(listId, listObj);\n    draggingEvents();\n  }\n}; // drag and drop functionality\n// dragging start\n\n\nconst startDragging = () => {\n  let draggables = document.querySelectorAll(\".draggable\");\n  let listId;\n  draggables.forEach(draggable => {\n    draggable.addEventListener(\"dragstart\", e => {\n      listId = e.target.parentElement.dataset.id;\n      draggable.classList.add(\"dragging\");\n    });\n    draggable.addEventListener(\"dragend\", e => {\n      let elem = e.target.parentElement;\n      if (elem == null) return;\n      let id = elem.dataset.id;\n      draggable.classList.remove(\"dragging\");\n      if (listId == id) return;\n      let index = findDraggedIndex(e, elem);\n      updateListOfCards(e, index);\n      deleteDraggedCard(e, listId);\n    });\n  });\n}; //drop containers\n\n\nconst draggingOver = () => {\n  let containers = document.querySelectorAll(\".drag-container\");\n  containers.forEach(container => {\n    container.addEventListener(\"dragover\", e => {\n      e.preventDefault();\n      let children = container.children;\n      const afterElement = getDragAfterElement(container, e.clientY);\n      const draggable = document.querySelector(\".dragging\");\n\n      if (afterElement == null) {\n        children[1].appendChild(draggable);\n      } else {\n        children[1].insertBefore(draggable, afterElement);\n      }\n    });\n  });\n};\n\nfunction getDragAfterElement(container, y) {\n  const draggableElements = [...container.querySelectorAll(\".draggable:not(.dragging)\")]; // elems which not have dragging class\n\n  return draggableElements.reduce((closest, child) => {\n    const box = child.getBoundingClientRect();\n    const offset = y - box.top - box.height / 2; // distance b/w center of box and cursor //negative num is dead center\n\n    if (offset < 0 && offset > closest.offset) {\n      return {\n        offset: offset,\n        element: child\n      };\n    } else {\n      return closest; // previous returnrd value\n    }\n  }, {\n    offset: Number.NEGATIVE_INFINITY\n  }).element; // return reduced value\n}\n\nconst draggingEvents = () => {\n  startDragging();\n  draggingOver();\n};\n\nmodule.exports = {\n  draggingEvents\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/app/dragLogic.js?");

/***/ }),

/***/ "./src/js/app/listLogic.js":
/*!*********************************!*\
  !*** ./src/js/app/listLogic.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  cardContentComp\n} = __webpack_require__(/*! ../components/cardListComp */ \"./src/js/components/cardListComp.js\");\n\nconst {\n  listContentComp,\n  NoListContComp\n} = __webpack_require__(/*! ../components/listsComp */ \"./src/js/components/listsComp.js\");\n\nconst {\n  events,\n  closeModal,\n  showInfo,\n  hideInfo\n} = __webpack_require__(/*! ../util */ \"./src/js/util.js\");\n\nconst {\n  draggingEvents\n} = __webpack_require__(/*! ./dragLogic */ \"./src/js/app/dragLogic.js\");\n\nconst setTodoObj = (todos = [], value = \"\") => {\n  let todoObj = {\n    id: Date.now(),\n    title: value,\n    cardList: []\n  };\n  todos.push(todoObj);\n  localStorage.setItem(\"toDoList\", JSON.stringify(todos));\n  init();\n};\n\nconst init = () => {\n  listContentComp();\n  cardContentComp();\n  draggingEvents();\n  closeModal();\n};\n\nconst addListLogic = e => {\n  let input = document.getElementById(\"title-inp\").value;\n  let value = input.toLowerCase();\n  if (value === \"\") return showInfo(\"Title is Mandatory\");\n\n  if (document.getElementById(\"msg\")) {\n    hideInfo();\n  }\n\n  validateTitle(value);\n};\n\nconst validateTitle = (value = \"\") => {\n  let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n\n  if (todos === null || todos === undefined || todos.length == 0) {\n    let toDosList = [];\n    setTodoObj(toDosList, value);\n  } else {\n    let listObj = todos.find(list => value === list.title); //console.log(listObj);\n\n    if (listObj) {\n      showInfo(\"Title must be unique, this title already exits\");\n      return;\n    } else {\n      if (document.getElementById(\"msg\")) {\n        hideInfo();\n      }\n\n      setTodoObj(todos, value);\n    }\n  }\n}; //deletes the dom\n\n\nconst deleteListDom = element => {\n  if (element.getAttribute(\"data-action\") === \"delete\") {\n    element.parentElement.parentElement.remove();\n  }\n};\n\nconst removeData = listId => {\n  let todoList = JSON.parse(localStorage.getItem(\"toDoList\"));\n  let index = todoList.findIndex(list => {\n    return list.id == listId;\n  });\n  todoList.splice(index, 1);\n  localStorage.setItem(\"toDoList\", JSON.stringify(todoList));\n  if (todoList.length == 0) NoListContComp();\n}; //remove list logic\n\n\nconst deleteListLogic = e => {\n  e.stopPropagation();\n  let listId = e.target.dataset.id;\n  let data = e.target.dataset.action;\n\n  if (data === \"delete\") {\n    deleteListDom(e.target);\n    removeData(listId);\n  }\n};\n\nconst addLogicEvent = () => {\n  events(\"#add-list\", \"click\", e => {\n    addListLogic(e);\n  });\n};\n\nconst deleteLogicEvent = () => {\n  events(\"#listContent\", \"click\", e => {\n    deleteListLogic(e);\n  });\n};\n\nmodule.exports = {\n  addLogicEvent,\n  deleteLogicEvent\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/app/listLogic.js?");

/***/ }),

/***/ "./src/js/app/searchLogic.js":
/*!***********************************!*\
  !*** ./src/js/app/searchLogic.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  cardContentComp\n} = __webpack_require__(/*! ../components/cardListComp */ \"./src/js/components/cardListComp.js\");\n\nconst {\n  listContentComp,\n  addCardEvent\n} = __webpack_require__(/*! ../components/listsComp */ \"./src/js/components/listsComp.js\");\n\nconst {\n  events\n} = __webpack_require__(/*! ../util */ \"./src/js/util.js\");\n\nconst {\n  cardDomEvents\n} = __webpack_require__(/*! ./cardLogic */ \"./src/js/app/cardLogic.js\");\n\nconst {\n  deleteLogicEvent\n} = __webpack_require__(/*! ./listLogic */ \"./src/js/app/listLogic.js\");\n\nconst searchLogic = () => {\n  let searchValue = document.getElementById(\"myInput\").value.toLowerCase();\n  if (searchValue === \"\") return;\n  let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n  if (todos === null || todos === undefined || todos.length == 0) return;\n  let cardList = todos.map(todo => todo.cardList);\n  let cards = [].concat(...cardList);\n  let searchFil = cards.filter(card => {\n    let matchDesc = card.description.search(searchValue);\n    return card.title === searchValue || matchDesc !== -1;\n  });\n  searchResultComp();\n\n  if (searchFil.length == 0) {\n    NoSearchListContComp();\n  } else {\n    searchResultsDom(searchFil);\n  }\n};\n\nconst searchResultComp = () => {\n  let mainCont = document.getElementById(\"main-content\");\n  let listCont = document.getElementById(\"listContent\");\n  mainCont.removeChild(listCont);\n  let searchCont = document.createElement(\"div\");\n  searchCont.className = \"searchCont\";\n  searchCont.id = \"searchCont\";\n  searchCont.innerHTML = `\n    <button class=\"clr-btn\" id=\"clear\"> clear results</button>\n    <div class=\"searchList\" id=\"searchList\"></div>\n  `;\n  mainCont.appendChild(searchCont);\n};\n\nconst searchResultsDom = (results = []) => {\n  let searchList = document.getElementById(\"searchList\");\n  let result = \"\";\n\n  for (let j = 0; j < results.length; j++) {\n    result += `\n              <div class=\"card-parent draggable\" data-id=\"${results[j].card_id}\">\n                <div class=\"card-header\">\n                  <h2 style=\"font-size:20px; text-transform: capitalize;\">${results[j].title}</h2>\n                </div>\n                <div class=\"cardDesc\" id=\"cardDesc\">\n                  <p class=\"desc\">${results[j].description}</p>\n                </div>\n              </div>\n        `;\n  }\n\n  searchList.innerHTML = result;\n};\n\nconst NoSearchListContComp = () => {\n  let listCont = document.getElementById(\"searchList\");\n  listCont.innerHTML = `\n    <div class=\"no-cont\">\n      <p>No List Available</p>\n    </div>\n  `;\n};\n\nconst clearLogic = e => {\n  listContentComp();\n  addCardEvent();\n  deleteLogicEvent();\n  cardContentComp();\n  cardDomEvents();\n};\n\nconst searchEvent = () => {\n  events(\"#myInput\", \"keyup\", e => {\n    if (e.keyCode === 13) {\n      e.preventDefault();\n      document.getElementById(\"myBtn\").click();\n      searchLogic();\n      clearEvent();\n    }\n  });\n};\n\nconst clearEvent = () => {\n  events(\"#clear\", \"click\", e => {\n    clearLogic(e);\n  });\n};\n\nmodule.exports = {\n  searchEvent\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/app/searchLogic.js?");

/***/ }),

/***/ "./src/js/components/appComp.js":
/*!**************************************!*\
  !*** ./src/js/components/appComp.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ../../css/common.css */ \"./src/css/common.css\");\n\n__webpack_require__(/*! ../../css/header.css */ \"./src/css/header.css\");\n\n__webpack_require__(/*! ../../css/lists.css */ \"./src/css/lists.css\");\n\nlet {\n  events,\n  showModal\n} = __webpack_require__(/*! ../util */ \"./src/js/util.js\");\n\nlet {\n  addLogicEvent\n} = __webpack_require__(/*! ../app/listLogic */ \"./src/js/app/listLogic.js\");\n\nconst toDoListPage = () => {\n  const mainContent = document.getElementById(\"main-content\");\n  mainContent.innerHTML = `\n       <header>\n          <h1>ToDoList</h1>\n          <input type=\"text\" id=\"myInput\" placeholder=\"Search for todos..\" autocomplete=\"off\">\n          <input type=\"button\" id=\"myBtn\" value=\"Search\" hidden=\"true\">\n          <button id=\"addList\" class=\"btn\">Add List</button>\n       </header>\n       <div class=\"listContent\" id=\"listContent\"></div>\n    `;\n};\n\nconst dialogDom = () => {\n  return `\n      <div class=\"modal-header\">Add List</div>\n      <div class=\"modal-inp\" id=\"modal-inp\">\n         <h3 class=\"title-head\">Title</h3>\n         <input class=\"title-inp\" id=\"title-inp\" type=\"text\" name=\"title\" autocomplete=\"off\" />\n      </div>\n      <div class=\"btns\" id=\"btns\">\n         <button class=\"cancel-btn\" id=\"cancel-btn\">Cancel</button>\n         <button class=\"btn\" id=\"add-list\">Add</button>\n      </div>\n   `;\n};\n\nconst addListEvent = () => {\n  let dialogValue = dialogDom();\n  events(\"#addList\", \"click\", e => {\n    showModal(dialogValue);\n    addLogicEvent();\n  });\n};\n\nmodule.exports = {\n  toDoListPage,\n  dialogDom,\n  addListEvent\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/components/appComp.js?");

/***/ }),

/***/ "./src/js/components/cardListComp.js":
/*!*******************************************!*\
  !*** ./src/js/components/cardListComp.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ../../css/common.css */ \"./src/css/common.css\");\n\n__webpack_require__(/*! ../../css/header.css */ \"./src/css/header.css\");\n\n__webpack_require__(/*! ../../css/cards.css */ \"./src/css/cards.css\");\n\nconst cardContentComp = () => {\n  let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n  if (todos === null || todos === undefined || todos.length == 0) return;\n  cardArrayComp(todos);\n};\n\nconst cardArray = (cardArr = [], cardCont = []) => {\n  for (let i = 0; i < cardArr.length; i++) {\n    let result = \"\";\n    let cardList = cardArr[i].cardList;\n    let listId = cardCont[i].dataset.id;\n\n    if (cardArr[i].id == listId && cardList.length != 0) {\n      for (let j = 0; j < cardList.length; j++) {\n        result += `\n              <div class=\"card-parent draggable\" data-id=\"${cardList[j].card_id}\" draggable=\"true\">\n                <div class=\"card-header\">\n                  <h2 style=\"font-size:20px; text-transform: capitalize;\">${cardList[j].title}</h2>\n                  <div class=\"icons\">\n                   <i class=\"far fa-star\" data-favorite=\"${cardList[j].isFavorite}\" data-id=\"${cardList[j].card_id}\" data-list=\"${cardArr[i].id}\" data-action=\"favorite\"></i>\n                   <i class=\"far fa-trash-alt\" data-id=\"${cardList[j].card_id}\" data-list=\"${cardArr[i].id}\" data-action=\"delete-card\"></i>\n                  </div>\n                </div>\n                <div class=\"cardDesc\" id=\"cardDesc\">\n                  <p class=\"desc\">${cardList[j].description}</p>\n                </div>\n              </div>\n        `;\n      }\n\n      cardCont[i].innerHTML = result;\n    } else {\n      cardCont[i].innerHTML = `\n              <div class=\"no-card\">\n                <p>No Card Available</p>\n              </div>\n            `;\n    }\n  }\n};\n\nconst cardArrayComp = (cardArr = []) => {\n  let cardCont = document.getElementsByClassName(\"cardList\");\n  if (cardCont === null || cardCont === undefined || cardCont.length == 0) return;\n  cardArray(cardArr, cardCont);\n};\n\nmodule.exports = {\n  cardContentComp\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/components/cardListComp.js?");

/***/ }),

/***/ "./src/js/components/listsComp.js":
/*!****************************************!*\
  !*** ./src/js/components/listsComp.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ../../css/common.css */ \"./src/css/common.css\");\n\n__webpack_require__(/*! ../../css/header.css */ \"./src/css/header.css\");\n\n__webpack_require__(/*! ../../css/lists.css */ \"./src/css/lists.css\");\n\nconst {\n  addCardEventLogic\n} = __webpack_require__(/*! ../app/cardLogic */ \"./src/js/app/cardLogic.js\");\n\nlet {\n  events,\n  showModal\n} = __webpack_require__(/*! ../util */ \"./src/js/util.js\");\n\nconst listContentComp = () => {\n  if (document.getElementById(\"searchCont\")) {\n    removeSearchComp();\n  }\n\n  let todos = JSON.parse(localStorage.getItem(\"toDoList\"));\n\n  if (todos === null || todos === undefined || todos.length == 0) {\n    NoListContComp();\n  } else {\n    listArrayComp(todos);\n  }\n};\n\nconst NoListContComp = () => {\n  let listCont = document.getElementById(\"listContent\");\n  listCont.innerHTML = `\n    <div class=\"no-cont\">\n      <p>No List Available</p>\n    </div>\n  `;\n};\n\nconst removeSearchComp = () => {\n  let mainCont = document.getElementById(\"main-content\");\n  let searchCont = document.getElementById(\"searchCont\");\n  mainCont.removeChild(searchCont);\n  let listContent = document.createElement(\"div\");\n  listContent.className = \"listContent\";\n  listContent.id = \"listContent\";\n  mainCont.appendChild(listContent);\n};\n\nconst listArrayComp = (listArr = []) => {\n  let listCont = document.getElementById(\"listContent\");\n  let result = \"\";\n\n  for (let i = 0; i < listArr.length; i++) {\n    result += `\n            <div class=\"list-parent drag-container\" data-id=\"${listArr[i].id}\">\n              <div class=\"list-header\">\n                <h2 style=\"font-size:24px; font-weight:900; text-transform: capitalize;\">${listArr[i].title}</h2>\n                <i class=\"far fa-trash-alt icon-style\" data-id=\"${listArr[i].id}\" data-action=\"delete\"></i>\n              </div>\n              <div class=\"cardList\" id=\"cardList\" data-id=\"${listArr[i].id}\"></div>\n              <button class=\"card-btn\" id=\"card-btn\" data-id=\"${listArr[i].id}\" data-action=\"add-card\" ><i class=\"fas fa-plus\"></i> Add Card</button>\n            </div>\n        `;\n  }\n\n  listCont.innerHTML = result;\n};\n\nconst cardDialogDom = id => {\n  return `\n      <div class=\"modal-header\">Add Card</div>\n      <div class=\"modal-inp\" id=\"modal-inp\">\n         <h3 class=\"title-head\">Title *</h3>\n         <input class=\"title-inp\" id=\"card-inp\" type=\"text\" name=\"title\" autocomplete=\"off\" />\n      </div>\n       <div class=\"modal-inp\" id=\"modal-desc\">\n         <h3 class=\"title-head\">Description</h3>\n         <textarea class=\"desc-inp\" id=\"desc-inp\" name=\"description\"></textarea>\n      </div>\n      <div class=\"btns\" id=\"btns\">\n         <button class=\"cancel-btn\" id=\"cancel-btn\" data-id=\"${id}\">Cancel</button>\n         <button class=\"btn\" id=\"add-card\" data-id=\"${id}\">Add</button>\n      </div>\n   `;\n};\n\nconst addCardEvent = () => {\n  events(\"#listContent\", \"click\", e => {\n    e.stopPropagation();\n    let listId = e.target.dataset.id;\n    let data = e.target.dataset.action;\n\n    if (data === \"add-card\") {\n      let dialogValue = cardDialogDom(listId); // if (document.getElementById(\"modal\")) {\n      //   document.body.removeChild(document.getElementById(\"modal\"));\n      // }\n\n      showModal(dialogValue);\n      addCardEventLogic();\n    }\n  });\n};\n\nmodule.exports = {\n  listContentComp,\n  addCardEvent,\n  NoListContComp,\n  removeSearchComp\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/components/listsComp.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  cardDomEvents\n} = __webpack_require__(/*! ./app/cardLogic */ \"./src/js/app/cardLogic.js\");\n\nconst {\n  deleteLogicEvent\n} = __webpack_require__(/*! ./app/listLogic */ \"./src/js/app/listLogic.js\");\n\nconst {\n  searchEvent\n} = __webpack_require__(/*! ./app/searchLogic */ \"./src/js/app/searchLogic.js\");\n\nconst {\n  toDoListPage,\n  addListEvent\n} = __webpack_require__(/*! ./components/appComp */ \"./src/js/components/appComp.js\");\n\nconst {\n  cardContentComp\n} = __webpack_require__(/*! ./components/cardListComp */ \"./src/js/components/cardListComp.js\");\n\nconst {\n  listContentComp,\n  addCardEvent\n} = __webpack_require__(/*! ./components/listsComp */ \"./src/js/components/listsComp.js\");\n\ntoDoListPage();\nsearchEvent();\naddListEvent();\nlistContentComp();\naddCardEvent();\ndeleteLogicEvent();\ncardContentComp();\ncardDomEvents();\n\n//# sourceURL=webpack://todolistapp/./src/js/main.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((module) => {

eval("let events = (element, event, eventHandler) => document.querySelector(element).addEventListener(event, eventHandler);\n\nconst removeOverlay = () => {\n  if (document.getElementById(\"modal\")) {\n    document.body.removeChild(document.getElementById(\"modal\"));\n  }\n};\n\nconst modalDoc = value => {\n  const modal = document.createElement(\"div\");\n  modal.className = \"modal-overlay\";\n  modal.id = \"modal\";\n  modal.setAttribute(\"data-id\", \"modal\");\n  modal.innerHTML = `\n        <div class=\"modal-content\" id=\"modal-content\">\n            ${value}\n        </div>\n    `;\n  document.body.appendChild(modal);\n}; //close the model\n\n\nconst closeModal = e => {\n  document.body.style.overflowY = \"scroll\";\n  const modal = document.getElementById(\"modal\");\n  const cont = document.getElementById(\"modal-content\");\n  modal.removeChild(cont);\n  modal.style.visibility = \"hidden\";\n  removeOverlay();\n};\n\nconst showModal = domValue => {\n  modalDoc(domValue);\n  document.body.style.overflowY = \"hidden\";\n  document.getElementById(\"modal\").style.visibility = \"visible\";\n  events(\"#cancel-btn\", \"click\", e => {\n    closeModal(e);\n  });\n};\n\nconst showInfo = (info = \"\") => {\n  let input = document.getElementById(\"modal-inp\");\n  let msg = document.createElement(\"p\");\n  msg.className = \"msg-style\";\n  msg.id = \"msg\";\n  msg.innerText = `${info}`;\n  input.appendChild(msg);\n};\n\nconst hideInfo = () => {\n  let input = document.getElementById(\"modal-inp\");\n  let msg = document.getElementById(\"msg\");\n  input.removeChild(msg);\n};\n\nmodule.exports = {\n  showModal,\n  events,\n  closeModal,\n  showInfo,\n  hideInfo\n};\n\n//# sourceURL=webpack://todolistapp/./src/js/util.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/cards.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/cards.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".cardList {\\n  width: 100%;\\n    margin-bottom: 20px;\\n}\\n.card-parent {\\n  width: 100%;\\n    margin-bottom: 30px;\\n    border: 2px solid #dcdbdb;\\n    padding: 8px;\\n    border-radius: 5px;\\n    cursor: move;\\n}\\n.card-header{\\n  display: flex;\\n    justify-content: space-between;\\n    font-size: 18px;\\n    text-align: center;\\n    margin-bottom: 10px;\\n}\\n.cardDesc{\\n  text-align: center;\\n    font-size: 15px;\\n}\\n.no-card {\\n  font-size: 15px;\\n    text-align: center;\\n    transform: translateY(50%);\\n}\\n.desc {\\n  line-break: anywhere;\\n}\\n[data-favorite |= true] {\\n  color: rgb(255, 159, 14);\\n}\\n.icons {\\n  cursor: pointer;\\n}\\n.draggable.dragging {\\n  opacity: .5;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/cards.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/common.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/common.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}\\n\\nbody {\\n  font-family: arial;\\n  color: grey;\\n  background-color: #fff;\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n  overflow-x: hidden;\\n}\\n\\nli {\\n  list-style-type: none;\\n}\\n\\na {\\n  text-decoration: none;\\n}\\n\\nbutton {\\n  border: none;\\n  background-color: none;\\n}\\n\\ninput {\\n  outline: none;\\n}\\n\\n.main-content {\\n  width: 100%;\\n  height: 100%;\\n  padding: 20px;\\n}\\n\\n.btn {\\n  border: none;\\n  text-decoration: none;\\n  background-color: #2186c9;\\n  text-align: center;\\n  height: 40px;\\n  width: 200px;\\n  color: #fff;\\n  padding: 5px 0px;\\n  font-size: 18px;\\n  cursor: pointer;\\n  font-weight: 700;\\n  box-shadow: 1px 1px 0.5px 1px #2186c9, 1px 1px 0.5px 1px #2186c9;\\n  outline: none;\\n  transition: all 0.1s ease;\\n  border-radius: 5px;\\n}\\n/* .btn:hover {\\n  background-color: #fff;\\n  color: #2186c9;\\n} */\\n.modal-overlay {\\n  background-color: #032f3e;\\n  opacity: 0.95;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  height: 100%;\\n  width: 100%;\\n  z-index: 2;\\n  transition: 0.1s linear;\\n  visibility: visible !important;\\n  background-color: black !important;\\n  /* Fallback color */\\n  background-color: rgba(0, 0, 0, 0.4) !important;\\n  /* Black w/ opacity */\\n}\\n.modal-content {\\n  background-color: #fff;\\n  width: 400px;\\n  padding: 20px;\\n  border-radius: 5px;\\n  position: absolute;\\n  top: 25%;\\n  left: 35%;\\n}\\n.modal-header {\\n  font-weight: 700;\\n  font-size: 22px;\\n  text-align: center;\\n  border-bottom: 2px solid #c3c3c3;\\n}\\n.modal-inp {\\n  margin-top: 20px;\\n  margin-bottom: 30px;\\n}\\n.title-head {\\n  margin-bottom: 8px;\\n}\\n.title-inp {\\n  width: 100%;\\n  height: 40px;\\n  outline: none;\\n  font-size: 16px;\\n  padding: 5px;\\n  border: 2px solid #b7b7b7;\\n  /* margin-bottom: 12px; */\\n  border-radius: 5px;\\n}\\n.btns {\\n  display: flex;\\n  justify-content: space-between;\\n}\\n\\n.cancel-btn {\\n  width: 100px;\\n  height: 40px;\\n  background-color: #e4e4e4;\\n  font-size: 18px;\\n  border: 2px solid #cacaca;\\n  border-radius: 5px;\\n  cursor: pointer;\\n}\\n\\n.desc-inp {\\n  width: 100%;\\n  height: 100px;\\n  outline: none;\\n  font-size: 16px;\\n  padding: 5px;\\n  border: 2px solid #b7b7b7;\\n  /* margin-bottom: 12px; */\\n  border-radius: 5px;\\n}\\n.msg-style {\\n  margin-top: 8px;\\n  text-align: center;\\n  font-size: 14px;\\n}\\n.clr-btn {\\n  color: #0781ff;\\n    margin-bottom: 30px;\\n    font-size: 18px;\\n    background-color: #fff;\\n    border: 1px solid #019ee8;\\n    padding: 10px;\\n    cursor: pointer;\\n    border-radius: 5px;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/common.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/header.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/header.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../public/search.png */ \"./public/search.png\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"header {\\n  display: flex;\\n  color: grey;\\n  width: 100%;\\n  justify-content: space-between;\\n  font-size: 18px;\\n}\\n\\n#myInput {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n  background-position: 10px 12px;\\n  background-repeat: no-repeat;\\n  background-size: 5% 50%;\\n  width: 40%;\\n  font-size: 16px;\\n  padding: 12px 20px 12px 40px;\\n  border: 1px solid #ddd;\\n  margin-bottom: 12px;\\n  border-radius: 5px;\\n}\\n#myInput:focus {\\n  border: 2px solid rgb(22, 129, 216);\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/header.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/lists.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/lists.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".listContent {\\n  width: 100%;\\n  height: 100%;\\n  margin-top: 20px;\\n  display: grid;\\n  grid-template-columns: 30% 30% 30%;\\n  grid-column-gap: 12px;\\n  grid-row-gap: 60px;\\n  justify-content: center;\\n}\\n.no-cont {\\n  position: absolute;\\n  top: 50%;\\n  left: 45%;\\n}\\n.list-parent {\\n  width: 100%;\\n  height: 100%;\\n  position: relative;\\n  padding: 10px;\\n  padding-bottom: 0px;\\n  border-radius: 5px 5px 0px 0px;\\n  border: 1px solid rgb(233, 233, 233);\\n  border-top: 3px solid rgb(22, 129, 216);\\n}\\n.list-header {\\n  display: flex;\\n  justify-content: space-between;\\n  font-size: 20px;\\n  text-align: center;\\n  margin-top: 10px;\\n  margin-bottom: 20px;\\n}\\n.icon-style {\\n  cursor: pointer;\\n}\\n.card-btn {\\n  color: rgb(22, 129, 216);\\n  border-radius: 0px 0px 5px 5px;\\n  font-size: 16px;\\n  background-color: #e4e2e2;\\n  width: 100%;\\n  height: 35px;\\n  cursor: pointer;\\n  position: absolute;\\n  bottom: 0px;\\n  left: 0px;\\n  top: 100%;\\n}\\n.searchCont {\\n  padding: 40px;\\n}\\n\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/lists.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://todolistapp/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://todolistapp/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/css/cards.css":
/*!***************************!*\
  !*** ./src/css/cards.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_cards_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./cards.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/cards.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_cards_css__WEBPACK_IMPORTED_MODULE_6__.default, options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_cards_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_cards_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_cards_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/cards.css?");

/***/ }),

/***/ "./src/css/common.css":
/*!****************************!*\
  !*** ./src/css/common.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./common.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/common.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__.default, options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/common.css?");

/***/ }),

/***/ "./src/css/header.css":
/*!****************************!*\
  !*** ./src/css/header.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./header.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/header.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__.default, options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/header.css?");

/***/ }),

/***/ "./src/css/lists.css":
/*!***************************!*\
  !*** ./src/css/lists.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_lists_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./lists.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/lists.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_lists_css__WEBPACK_IMPORTED_MODULE_6__.default, options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_lists_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_lists_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_lists_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);\n\n\n//# sourceURL=webpack://todolistapp/./src/css/lists.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://todolistapp/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://todolistapp/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var style = document.createElement(\"style\");\n  options.setAttributes(style, options.attributes);\n  options.insert(style);\n  return style;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://todolistapp/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(style) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    style.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://todolistapp/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute(\"media\", media);\n  } else {\n    style.removeAttribute(\"media\");\n  }\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, style);\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var style = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(style, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(style);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://todolistapp/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, style) {\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://todolistapp/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./public/search.png":
/*!***************************!*\
  !*** ./public/search.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"f2d70afd1ebdca42594e.png\";\n\n//# sourceURL=webpack://todolistapp/./public/search.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;