// HTML element get for construct
const navBar = document.getElementsByTagName("nav")[0];
const sectionTags = document.getElementsByClassName("tags-selected");

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // Get data from json ** Recupere les données du json
    const artistData = phData.photographers;
    // console.log(artistData);

    // create a new array with all <tags>
    const mediaTags = [];
    artistData.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        mediaTags.push(tag);
      });
    });
    console.log(mediaTags);

    // create html collection <ul> with id
    const ulTagElt = document.createElement("ul");
    ulTagElt.setAttribute("id", "tags");
    navBar.appendChild(ulTagElt);

    //create new array with only one off choise for create li.link-tag
    const arrayTag = new Set(mediaTags);
    // console.log(arrayTag);
    const tagsArray = Array.from(arrayTag);
    console.log(tagsArray);
    for (let t = 0; t < tagsArray.length; t += 1) {
      // console.table(tagsArray[t]);

      const liTagElt = document.createElement("li");
      ulTagElt.appendChild(liTagElt);
      liTagElt.setAttribute("class", "link-tag");
      liTagElt.innerHTML = `<a href="#" title="${tagsArray[t]}" >#${tagsArray[t]}</a> `;

      // when <li> are clicked select tags
      liTagElt.addEventListener("click", function () {
        // sectionTags.style.display = "block";

        // create a New array with only tag clicked
        const newMediaTags = mediaTags.filter((elt) => {
          for (let i = 0; i < phData.photographers.length; i += 1) {
            const tagsData = phData.photographers[i].tags;

            for (let o = 0; o < tagsData.length; o += 1) {
              if (elt == `${tagsArray[t]}` && elt == `${tagsData[o]}`) {
                sectionTags[0].innerHTML = `<a href="./photographerPage.html?dataph=${phData.photographers[i].id}"
                                              class="photograph__card--link">
                                              <img src="media/PhotographersIDPhotos/${phData.photographers[i].portrait}"
                                              alt="Portrait représentant:  ${phData.photographers[i].name}"
                                              class="artist-pict">
                                              <h2>${phData.photographers[i].name}</h2></a>
                                              <aside class="photograph__card--txt">
                                              <strong>${phData.photographers[i].city}/${phData.photographers[i].country}</strong>
                                              <p>${phData.photographers[i].tagline}</p>
                                              <span>${phData.photographers[i].price}€/jour</span>
                                              <ul class="tagBox"></ul></aside>`;
                // const ulTagBox = document.getElementsByClassName("tagBox");
                // const liTagElt = document.createElement("li");
                // ulTagBox[i].appendChild(liTagElt);
                // liTagElt.setAttribute("class", "tag-linked");
                // liTagElt.innerHTML = `<a href="#" title="${tagsData[o]}" >#${tagsData[o]}</a> `;
              }
            }
          }
          // if (elt == `${tagsArray[t]}`) {
          //   console.log(tagsArray[t]);
          //   // sectionTags.innerHTML = `${tagsArray[t]}`;
          //   return true;
          // }
        });

        // console.log("les tags selectionnés sont : " + newMediaTags);
        // sectionTags.innerHTML = `${newMediaTags}`;

        // for (let tag of newMediaTags) {
        //   console.log(tag);
        // }
      });

      // for (let i = 0; i < phData.photographers.length; i += 1) {
      //   const tagsData = phData.photographers[i].tags;
      //   console.log(tagsData);
      // }
    }
  });
// .catch((error) => console.log("Erreur : " + error))

/**

 * ecoute le click tag fonction
 * chercher dans le json tout les ph qui ont le tag selectionné. (filtrer un tableau de données)
 *    - new array récupere les photographe qui ont le tag
 *    - boucle for sur le new array
 *
 * affiche les cards qui ont le tag selectionné
 * function() {
 *    let showtag = document.
 *  */

// for (let na = 1; na <= newMediaTags.length; na += 1) {
//   console.log(newMediaTags);
//   sectionTags.innerHTML = `${newMediaTags}`;
// }

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

// fetch("./js/data.json")
//   .then((response) => response.json())
//   .then((phData) => {
//     const newCards = () => {
//       let i;
//       for (i = 0; i < phData.photographers.length; i += 1) {
//         const newArticle = document.createElement("article");

//         sectionTags.appendChild(newArticle);

//         newArticle.setAttribute("class", "photograph__card");
//         newArticle.setAttribute("id", "photographer");
//         newArticle.innerHTML = `<a href="./photographerPage.html?dataph=${phData.photographers[i].id}"
//                                     class="photograph__card--link">
//                                     <img src="media/PhotographersIDPhotos/${phData.photographers[i].portrait}"
//                                     alt="Portrait représentant:  ${phData.photographers[i].name}"
//                                     class="artist-pict">
//                                     <h2>${phData.photographers[i].name}</h2></a>
//                                     <aside class="photograph__card--txt">
//                                     <strong>${phData.photographers[i].city}/${phData.photographers[i].country}</strong>
//                                     <p>${phData.photographers[i].tagline}</p>
//                                     <span>${phData.photographers[i].price}€/jour</span>
//                                     <ul class="tagBox"></ul></aside>`;

//         const tagsData = phData.photographers[i].tags;
//         for (let t = 0; t < tagsData.length; t += 1) {
//           const ulTagBox = document.getElementsByClassName("tagBox");
//           const liTagElt = document.createElement("li");
//           ulTagBox[i].appendChild(liTagElt);
//           liTagElt.setAttribute("class", "tag-linked");
//           liTagElt.innerHTML = `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a> `;
//         }
//       }
//     };
//     newCards();
//   });
