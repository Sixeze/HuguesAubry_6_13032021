// HTML element get for construct
const navBar = document.getElementsByTagName("nav")[0];
const mainPhElt = document.getElementsByClassName("main photograph");

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const artistData = phData.photographers;
    // console.table(artistData);

    const mediaTags = [];
    artistData.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        mediaTags.push(tag);
      });
    });

    const ulTagElt = document.createElement("ul");
    ulTagElt.setAttribute("id", "tags");
    navBar.appendChild(ulTagElt);

    const arrayTag = new Set(mediaTags);
    const tagsArray = Array.from(arrayTag);
    for (let t = 0; t < tagsArray.length; t += 1) {
      // console.table(tagsArray[t]);

      const liTagElt = document.createElement("li");
      ulTagElt.appendChild(liTagElt);
      liTagElt.setAttribute("class", "link-tag");
      liTagElt.innerHTML = `<a href="#" title="${tagsArray[t]}" >#${tagsArray[t]}</a> `;

      liTagElt.addEventListener("click", function () {
        /**
         * newMediaTags = Array filter
         */
        const newMediaTags = mediaTags.filter((elt) => {
          if (elt == `${tagsArray[t]}`) {
            return true;
          }
        });

        for (let na = 1; na <= newMediaTags.length; na += 1) {
          const mainSection = document.getElementsByTagName("main");
          const newArticle = document.createElement("article");
          mainSection[0].appendChild(newArticle);
          newArticle.setAttribute("class", "photograph__card");
        }
      });
    }
  });
// .catch((error) => console.log("Erreur : " + error))

/**
 * généralité  foreach
 * ecoute le click tag fonction
 * chercher dans le json tout les ph qui ont le tag selectionné. (filtrer un tableau de données)
 *    - new array récupere les photographe qui ont le tag
 *    - boucle for sur le new array
 *
 * affiche les cards qui ont le tag selectionné
 * function() {
 *    let showtag = document.
 *  */

// console.log(tagsSelected);

// tagsSelected.addEventListener("click", function () {
//   console.log("youpi");
// });
// console.log(tagsArray);
// const newTags = tagsArray.filter((tag, key) => {
//   console.log(tag, key);
//   return;
// });
// console.log(newTags);

// const newMediaTags = mediaTags.filter((elt) => {
//   if (elt == "fashion") {
//     return true;
//   }
// });
