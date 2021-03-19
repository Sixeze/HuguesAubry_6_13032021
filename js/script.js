const bgModal = document.getElementsByClassName("bground")[0];
const btnModal = document.getElementsByClassName("ph-contact btn")[0];
const closeModal = document.getElementById("cross-close");

// When the user clicks the button, open the modal
btnModal.onclick = function () {
  bgModal.style.display = "block";
};

// When the user clicks on <svg> (x), close the modal
closeModal.onclick = function () {
  bgModal.style.display = "none";
};

// when the user clicks everywhere out of the modal
window.onclick = function (close) {
  if (close.target == bgModal) {
    bgModal.style.display = "none";
  }
};
