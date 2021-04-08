// URL Params

// const x = location.search;
// console.log(x);

// let params = new URL(document.location).searchParams;
// console.log(params);
// let name1 = params.get("dataph");
// console.log(name1);

// const params = new URLSearchParams(location.search);
// console.log(params);

// fetch json file
// fetch("./js/data.json")
//   .then((response) => response.json())
//   .then((phData) => {
//     console.table(phData.photographers);
//     let params = new URL(document.location).searchParams;
//     let urlIdNumber = params.get("dataph");
//     let idPh = phData.photographers[0].id;
//     console.log(idPh);
//     console.log(urlIdNumber);
//     if (urlIdNumber == idPh) {
//       console.log("youpi");
//     } else {
//       console.log("badMove");
//     }
//   });

// fetch("./js/data.json")
//   .then((response) => response.json())
//   .then((phData) => {
//     for (let i = 0; i < phData.photographers.length; i += 1) {
//       let url = `http://127.0.0.1:5501/photographerPage.html?dataph=${value}`;
//       console.log(`voici : ${this.value}`);
//       if (url.value == phData.photographers[i].id) {
//       }

//       console.log(phData.photographers[i]);
//       console.log(phData.photographers[i].id);
//     }
//     console.log(phData);
//     console.log(phData.photographers);
//     // ./photographerPage.html?dataph=${phData.photographers[i].id}
//   });
// // photographerPage.html?dataph=243

// tag main Dom
const mainPHPage = document.getElementsByTagName("main");

// creat header profil photograph
function creatHeaderProfil() {
  fetch("./js/data.json")
    .then((response) => response.json())
    .then((phData) => {
      const dataForPh = phData.photographers[0];
      const newHeader = document.createElement("header");
      mainPHPage[0].prepend(newHeader);
      newHeader.setAttribute("class", "ph-info");
      newHeader.setAttribute("aria-label", "photographer information");
      newHeader.innerHTML = `<section class="ph-card">
                                  <h1 class="ph-card__artist">${dataForPh.name}</h1>
                                  <aside class="ph-card__information">
                                  <p class="ph-card__information--city">${dataForPh.city}/${dataForPh.country}</p>
                                  <p class="ph-card__information--tagline">${dataForPh.tagline}</p>
                                  <ul class="tagBox"></ul></aside></section>
                                  <button type="button" class="ph-contact btn" title="contactez-moi">contactez-moi</button>
                                  <img src="media/PhotographersIDPhotos/${dataForPh.portrait}"
                                      alt="Portrait représentant ${dataForPh.portrait}"
                                        class="profil-picture">`;

      const tagsData = phData.photographers[0].tags;
      for (let t = 0; t < tagsData.length; t += 1) {
        const ulTagBox = document.getElementsByClassName("tagBox");
        const liTagElt = document.createElement("li");
        ulTagBox[0].appendChild(liTagElt);
        liTagElt.setAttribute("class", "link-tag");
        liTagElt.innerHTML = `<a href="#" tittle="${tagsData[t]}" >#${tagsData[t]}</a> `;
      }
    })
    .catch((error) => console.log("Erreur : " + error));
}

// create portofolio
const articlePhPage = document.getElementsByTagName("article");

function creatPictureCard() {
  fetch("./js/data.json")
    .then((response) => response.json())
    .then((phData) => {
      const dataForMedia = phData.media;
      let m;
      for (m = 0; m < dataForMedia.length; m += 1) {
        const newSection = document.createElement("section");
        articlePhPage[0].appendChild(newSection);
        newSection.setAttribute("class", "artist-cards");
        newSection.innerHTML = `<a href="#" id="openLightbox">
                                  <img src="media/artistsPictures/${dataForMedia[m].image}"
                                   id="${dataForMedia[m].id}"
                                   alt="${dataForMedia[m].alt}"
                                   tag="${dataForMedia[m].tags}"
                                   date="${dataForMedia[m].date}"
                                   class="artist-cards__picture">
                                  </a>
                                  <aside class="artist-cards__information">
                                  <h2 class="card-title">${dataForMedia[m].alt}</h2>
                                  <p class="card-price">${dataForMedia[m].price}€
                                  <span class="card-likeNumbers">${dataForMedia[m].likes}</span>
                                  <i class="fas fa-heart" aria-label="like" role="button" tabindex="0"></i></p></aside>`;
      }
      // <embed src="media/artistsVideos/${dataForMedia[m].video}"></embed>
    });
}

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

window.onload = () => {
  creatHeaderProfil();
  creatPictureCard();
};
