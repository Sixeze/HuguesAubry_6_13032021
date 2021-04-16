fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // create seclect custom-select box (dropdown menu)
    const sortMenu = document.getElementsByClassName("sort-menu");
    let s;
    for (s = 0; s < sortMenu.length; s++) {
      const selectElt = sortMenu[s].getElementsByTagName("select")[0];
      const lenghOfSelectElt = selectElt.length;

      // for each elt create a DIV with the same comportement of selected elt
      const divElt = document.createElement("DIV");
      const nameOption = selectElt.options[selectElt.selectedIndex].innerHTML;
      divElt.setAttribute("class", "sort-select");
      divElt.setAttribute("aria-hidden", nameOption);
      divElt.setAttribute("tabindex", "0");
      divElt.innerHTML = nameOption;
      sortMenu[s].appendChild(divElt);

      // create a new div with option list for elts
      const divElt2 = document.createElement("DIV");
      divElt2.setAttribute("class", "dropdown-menu dropdown-hide");
      for (let t = 1; t < lenghOfSelectElt; t++) {
        const divElt3 = document.createElement("DIV");
        divElt3.innerHTML = selectElt.options[t].innerHTML;

        divElt3.addEventListener("click", function () {
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
        divElt2.appendChild(divElt3);
      }
      sortMenu[s].appendChild(divElt2);
      divElt.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
        e.stopPropagation();
        // closeDropdown(this);
        this.nextSibling.classList.toggle("dropdown-hide");
        this.classList.toggle("arrow");
      });
    }
  })
  .catch((error) => console.log("Erreur : " + error));

// const dataMedia = phData.media[m];

// dataMedia.sort((a, b) => a.photographerId - b.photographerId);
// console.log(dataMedia);
// sort date

// media.sort((a, b) => a.photographerId - b.photogra
