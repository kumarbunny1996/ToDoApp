const { cardDomEvents } = require("./app/cardLogic");
const { deleteLogicEvent } = require("./app/listLogic");
const { searchEvent } = require("./app/searchLogic");
const { toDoListPage, addListEvent } = require("./components/appComp");
const { cardContentComp } = require("./components/cardListComp");
const { listContentComp, addCardEvent } = require("./components/listsComp");

toDoListPage();
searchEvent();
addListEvent();
listContentComp();
addCardEvent();
deleteLogicEvent();
cardContentComp();
cardDomEvents();
