/** la lightbox "carroussel" */

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
