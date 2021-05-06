// console.log(mediaSort);
// create seclect custom-select box (dropdown menu)
const sortMenu = document.getElementsByClassName("sort-menu");
let s;
for (s = 0; s < sortMenu.length; s++) {
  const selectElt = sortMenu[s].getElementsByTagName("select")[0];
  const lenghOfSelectElt = selectElt.length;

  // for each elt create a DIV with the same comportement of selected elt
  const divElt = document.createElement("DIV");
  // const nameOption = selectElt.options[selectElt.selectedIndex].innerHTML;
  // console.log(nameOption);
  divElt.setAttribute("class", "sort-select");
  // divElt.setAttribute("aria-hidden", nameOption);
  divElt.setAttribute("tabindex", "0");
  divElt.innerHTML = "trier par";
  sortMenu[s].appendChild(divElt);

  // create a new div with option list for elts
  const containerDiv = document.createElement("DIV");
  // console.log(containerDiv);
  containerDiv.setAttribute("class", "dropdown-menu dropdown-hide");
  for (let t = 1; t < lenghOfSelectElt; t++) {
    const optionDiv = document.createElement("DIV");
    // console.log(optionDiv);
    optionDiv.innerHTML = selectElt.options[t].innerHTML;

    optionDiv.addEventListener("click", function () {
      //  When an item is selected, update <sort-select> box and selected item
      const parentElt = this.parentNode.parentNode.getElementsByTagName(
        "select"
      )[0];
      const sortSelectElt = this.parentNode.previousSibling;
      for (let u = 0; u < parentElt.length; u++) {
        if (parentElt.options[u].innerHTML == this.innerHTML) {
          parentElt.selectedIndex = u;
          sortSelectElt.innerHTML = this.innerHTML;
          const sameSortElt = this.parentNode.getElementsByClassName(
            "same-Sort-selected"
          );
          for (let v = 0; v < sameSortElt.length; v++) {
            sameSortElt[v].removeAttribute("class");
          }
          this.setAttribute("class", "same-Sort-selected");
          break;
        }
      }
      sortSelectElt.click();
    });
    containerDiv.appendChild(optionDiv);
  }
  sortMenu[s].appendChild(containerDiv);
  divElt.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
    e.stopPropagation();
    // closeDropdown(this);
    this.nextSibling.classList.toggle("dropdown-hide");
    this.classList.toggle("arrow");
  });
}

// const dataMedia = phData.media[m];

// dataMedia.sort((a, b) => a.photographerId - b.photographerId);
// console.log(dataMedia);
// sort date

// const params = new URL(document.location).searchParams;
// const urlIdNumber = params.get("dataph");
// // filter Array
// const mediaFilterArray = phData.media.filter(
//   (media) => media.photographerId == urlIdNumber
// );
