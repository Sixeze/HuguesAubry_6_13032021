// ====== open and close form ======
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

// ====== open & close lightbox
const bgLightbox = document.getElementsByClassName("bground-lightbox")[0];
const openLightbox = document.getElementById("openLightbox");
const closeLightbox = document.getElementById("lightbox-cross-close");

// When the user clicks the button, open the modal
openLightbox.onclick = function () {
  bgLightbox.style.display = "block";
};

// When the user clicks on <svg> (x), close the modal
closeLightbox.onclick = function () {
  bgLightbox.style.display = "none";
};

// when the user clicks everywhere out of the modal
window.onclick = function (close) {
  if (close.target == bgLightbox) {
    bgLightbox.style.display = "none";
  }
};
