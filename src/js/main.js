const { favoriteCardEvent, deleteCardEvent } = require("./app/cardLogic");
const { deleteLogicEvent } = require("./app/listLogic");
const { toDoListPage, addListEvent } = require("./components/appComp");
const { cardContentComp } = require("./components/cardListComp");
const { listContentComp, addCardEvent } = require("./components/listsComp");

toDoListPage();
addListEvent();
listContentComp();
addCardEvent();
deleteLogicEvent();
cardContentComp();
favoriteCardEvent();
deleteCardEvent();
