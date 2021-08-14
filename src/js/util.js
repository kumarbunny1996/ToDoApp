let events = (element, event, eventHandler) =>
  document.querySelector(element).addEventListener(event, eventHandler);

const removeOverlay = () => {
  if (document.getElementById("modal")) {
    document.body.removeChild(document.getElementById("modal"));
  }
};

const modalDoc = (value) => {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.id = "modal";
  modal.setAttribute("data-id", "modal");
  modal.innerHTML = `
        <div class="modal-content" id="modal-content">
            ${value}
        </div>
    `;
  document.body.appendChild(modal);
};

//close the model

const closeModal = (e) => {
  document.body.style.overflowY = "scroll";
  const modal = document.getElementById("modal");
  const cont = document.getElementById("modal-content");
  modal.removeChild(cont);
  modal.style.visibility = "hidden";
  removeOverlay();
};

const showModal = (domValue) => {
  modalDoc(domValue);
  document.body.style.overflowY = "hidden";
  document.getElementById("modal").style.visibility = "visible";
  events("#cancel-btn", "click", (e) => {
    closeModal(e);
  });
};

const showInfo = (info = "") => {
  let input = document.getElementById("modal-inp");
  let msg = document.createElement("p");
  msg.className = "msg-style";
  msg.id = "msg";
  msg.innerText = `${info}`;
  input.appendChild(msg);
};

const hideInfo = () => {
  let input = document.getElementById("modal-inp");
  let msg = document.getElementById("msg");
  input.removeChild(msg);
};

module.exports = {
  showModal,
  events,
  closeModal,
  showInfo,
  hideInfo,
};
