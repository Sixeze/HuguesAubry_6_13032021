// HTML element get for construct

const sectionTags = document.getElementById("cards-select");
const mainSection = document.querySelector("main.main");

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // Get data from json ** Recupere les données du json
    const artistData = phData.photographers;
    console.log(artistData);

    // create html collection <ul> with id
    let navBar = document.getElementsByTagName("nav")[0];
    const ulTagElt = document.createElement("ul");
    ulTagElt.setAttribute("id", "tags");
    navBar.appendChild(ulTagElt);

    // create a new array with all <tags>
    const mediaTags = [];

    for (let p in artistData) {
      for (let t in artistData[p].tags) {
        mediaTags.push(artistData[p].tags[t]);
      }
    }
    console.log("console log de mediaTags " + mediaTags);

    //create new array with only one off choise for create li.link-tag
    let uniqueTags = mediaTags.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    console.log("console log de uniqueTags " + uniqueTags);

    let htmlLiTagElts = "";

    for (let u in uniqueTags) {
      htmlLiTagElts += `<li class="link-tag">#<a class="a-link" href="#" title="${uniqueTags[u]}" >${uniqueTags[u]}</a></li> `;
    }

    ulTagElt.innerHTML = htmlLiTagElts;

    const linkTags = document.querySelectorAll("li.link-tag");
    const aTagElts = document.querySelectorAll("a.a-link");
    console.log(aTagElts);
    for (let aTagElt of aTagElts) {
      aTagElt.addEventListener("click", function (e) {
        mainSection.style.display = "none";
        sectionTags.style.display = "block";
        // console.log(uniqueTags);

        aTagElt.parentElement.style.backgroundColor = "#901C1C";
        aTagElt.style.color = "#fff";
        console.log(window.event);
        e = e || window.event;
        let target = e.target;
        // console.log(target);

        let text = target.textContent || target.innerText;
        console.log(text);
        for (let u in uniqueTags) {
          if (text == uniqueTags[u]) {
            e.preventDefault();

            for (let i in phData.photographers) {
              const tagsData = phData.photographers[i].tags;
              for (let t in tagsData) {
                if (uniqueTags[u] == tagsData[t])
                  sectionTags.innerHTML = `le tag selectionné est <strong>${uniqueTags[u]}</strong> </br> #<a href="#" title="${tagsData[t]}" >${tagsData[t]}</a>`;
                const newArticle = document.createElement("article");
                sectionTags.appendChild(newArticle);

                newArticle.setAttribute("class", "photograph__card");
                newArticle.setAttribute("id", "photographer");
                newArticle.innerHTML = `<a href="./photographerPage.html?dataph=${phData.photographers[i].id}"
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
                const ulTagBox = document.getElementsByClassName("tagBox");
                const liTagElt = document.createElement("li");
                ulTagBox[i].appendChild(liTagElt);
                liTagElt.setAttribute("class", "tag-linked");
                liTagElt.innerHTML += `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a> `;
              }
            }
          }
        }
      });
    }

    // console.log(filterByTag);
  })
  .catch((error) => console.log("Erreur : " + error));

// if (linkTag) {
//   // la il faut que tu arrive a écrire un if le lien est clické
//   console.log("linkTag.value");
//   arrTag.push(linkTag.value);
// } else {
//   console.log("linkTag");
//   arrTag.filter((e) => e !== linkTag.value);
// }
// console.log(linkTag.value);
//   const artistData = phData.photographers;
// // console.log(artistData);

// // create a new array with all <tags>
// const mediaTags = [];
// artistData.forEach((photographer) => {
//   photographer.tags.forEach((tag) => {
//     mediaTags.push(tag);
//   });
// });
// // console.log(mediaTags);

// // create html collection <ul> with id
// const ulTagElt = document.createElement("ul");
// ulTagElt.setAttribute("id", "tags");
// navBar.appendChild(ulTagElt);

// //create new array with only one off choise for create li.link-tag
// const arrayTag = new Set(mediaTags);
// // console.log(arrayTag);
// const tagsArray = Array.from(arrayTag);
// // console.log(tagsArray);
// for (let t = 0; t < tagsArray.length; t += 1) {
//   // console.table(tagsArray[t]);

//   const liTagElt = document.createElement("li");
//   ulTagElt.appendChild(liTagElt);
//   liTagElt.setAttribute("class", "link-tag");
//   liTagElt.innerHTML = `<a href="#" title="${tagsArray[t]}" >#${tagsArray[t]}</a> `;

//   // when <li> are clicked select tags
//   liTagElt.addEventListener("click", function () {
//     // sectionTags.style.display = "block";

//     // create a New array with only tag clicked
//     /**Lors du click, tu filtres le tableau de tags précemment créé (ligne 80).
//      * Pourquoi ? Je ne comprends pas l'intérêt et ce que tu cherches à faire ici.
//      * D'ailleurs, tu logs "les tags sélectionnés sont ...".
//      * Alors qu'il ne devrait y avoir qu'un seul tag sélectionné (tagsArray[t]). */
//     const newMediaTags = mediaTags.filter((elt) => {
// for (let i = 0; i < phData.photographers.length; i += 1) {
//   const tagsData = phData.photographers[i].tags;

//   for (let o = 0; o < tagsData.length; o += 1) {
//     if (elt == `${tagsArray[t]}` && elt == `${tagsData[o]}`) {
// const newArticle = document.createElement("article");
// sectionTags.appendChild(newArticle);

// newArticle.setAttribute("class", "photograph__card");
// newArticle.setAttribute("id", "photographer");
// newArticle.innerHTML += `<a href="./photographerPage.html?dataph=${phData.photographers[i].id}"
//                               class="photograph__card--link">
//                               <img src="media/PhotographersIDPhotos/${phData.photographers[i].portrait}"
//                               alt="Portrait représentant:  ${phData.photographers[i].name}"
//                               class="artist-pict">
//                               <h2>${phData.photographers[i].name}</h2></a>
//                               <aside class="photograph__card--txt">
//                               <strong>${phData.photographers[i].city}/${phData.photographers[i].country}</strong>
//                               <p>${phData.photographers[i].tagline}</p>
//                               <span>${phData.photographers[i].price}€/jour</span>
//                               <ul class="tagBox"></ul></aside>`;

//       for (let t = 0; t < tagsData.length; t += 1) {
//         const ulTagBox = document.getElementsByClassName("tagBox");
//         const liTagElt = document.createElement("li");
//         ulTagBox[i].appendChild(liTagElt);
//         liTagElt.setAttribute("class", "tag-linked");
//         liTagElt.innerHTML = `<a href="#" title="${tagsData[0]}" >#${tagsData[0]}</a> `;
//       }
//     }
//   }
//       }

//       return elt;
//     });
//     console.log(newMediaTags);
//   });

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
