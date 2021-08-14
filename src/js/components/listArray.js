const listArray = () => {
  let list = [
    {
      id: "1",
      title: "todo1",
      cardList: [
        {
          id: "1",
          card_id: "1",
          title: "card1",
          description:
            "lorewnn mmjcj wjfkjkf jnfknjkire hroioijfefioefieifh hjnjfnefhw jnkefhwoe hffhnfkl",
          isFavorite: false,
        },

        {
          id: "1",
          card_id: "2",
          title: "card2",
          description:
            "lorewnn mmjcj wjfkjkf jnfknjkire hroioijfefioefieifh hjnjfnefhw jnkefhwoe hffhnfkl",
          isFavorite: true,
        },
      ],
    },
    {
      id: "2",
      title: "todo2",
      cardList: [],
    },
    {
      id: "3",
      title: "todo3",
      cardList: [
        {
          id: "3",
          card_id: "3",
          title: "card3",
          description:
            "lorewnn mmjcj wjfkjkf jnfknjkire hroioijfefioefieifh hjnjfnefhw jnkefhwoe hffhnfkl",
          isFavorite: false,
        },

        {
          id: "3",
          card_id: "4",
          title: "card4",
          description:
            "lorewnn mmjcj wjfkjkf jnfknjkire hroioijfefioefieifh hjnjfnefhw jnkefhwoe hffhnfkl",
          isFavorite: true,
        },
      ],
    },
  ];

  localStorage.setItem("toDoList", JSON.stringify(list));
};
module.exports = listArray;
