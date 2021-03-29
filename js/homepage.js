/** Photograph List */

/** anotation de la page
 * les fonctions retrouvé sur cette page
 * 1. Afficher la liste des Photographes
 * 2. Filtrer par tags
 */

// import { data } from "./photographData";

// new article + element
function newArticleElt(
  articleClassData,
  aHrefData,
  aClassData,
  imgClassData,
  imgSrcData,
  imgAltData,
  artistName,
  asideClassData,
  cityAndCountry,
  tagline,
  price
) {
  let newArticle = document.createElement("article");
  let main = document.getElementsByTagName("main");
  let aLinkElt = document.createElement("a");
  let imgElt = document.createElement("img");
  let titleNameElt = document.createElement("h2");
  let asideElt = document.createElement("aside");
  let strongElt = document.createElement("strong");
  let pElt = document.createElement("p");
  let spanElt = document.createElement("span");
  let ulElt = document.createElement("ul");
  let liElt = document.createElement("li");

  main[0].appendChild(newArticle);

  newArticle.appendChild(aLinkElt);
  newArticle.appendChild(asideElt);
  newArticle.appendChild(ulElt);

  aLinkElt.appendChild(imgElt);
  aLinkElt.appendChild(titleNameElt);

  asideElt.appendChild(strongElt);
  asideElt.appendChild(pElt);
  asideElt.appendChild(spanElt);

  ulElt.appendChild(liElt);

  newArticle.setAttribute("class", articleClassData);

  aLinkElt.setAttribute("href", aHrefData);
  aLinkElt.setAttribute("class", aClassData);

  imgElt.setAttribute("class", imgClassData);
  imgElt.setAttribute("src", imgSrcData);
  imgElt.setAttribute("alt", imgAltData);

  titleNameElt.textContent = artistName;

  asideElt.setAttribute("class", asideClassData);

  strongElt.textContent = cityAndCountry;
  pElt.textContent = tagline;
  spanElt.textContent = price;
}

const articlePh1 = newArticleElt(
  "photograph__card",
  "./photographerPage.html",
  "photograph__card--link",
  "artist-pict",
  data.photographers[0].portrait,
  "Portrait représentant :" + data.photographers[0].name,
  data.photographers[0].name,
  "photograph__card--txt",
  data.photographers[0].city + "/" + data.photographers[0].country,
  data.photographers[0].tagline,
  data.photographers[0].price + "€/jour"
);
const articlePh2 = newArticleElt(
  "photograph__card",
  "./photographerPage.html",
  "photograph__card--link",
  "artist-pict",
  data.photographers[1].portrait,
  "Portrait représentant :" + data.photographers[1].name,
  data.photographers[1].name,
  "photograph__card--txt",
  data.photographers[1].city + "/" + data.photographers[1].country,
  data.photographers[1].tagline,
  data.photographers[1].price + "€/jour"
);
const articlePh3 = newArticleElt(
  "photograph__card",
  "./photographerPage.html",
  "photograph__card--link",
  "artist-pict",
  data.photographers[2].portrait,
  "Portrait représentant :" + data.photographers[2].name,
  data.photographers[2].name,
  "photograph__card--txt",
  data.photographers[2].city + "/" + data.photographers[2].country,
  data.photographers[2].tagline,
  data.photographers[2].price + "€/jour"
);
const articlePh4 = newArticleElt(
  "photograph__card",
  "./photographerPage.html",
  "photograph__card--link",
  "artist-pict",
  data.photographers[3].portrait,
  "Portrait représentant :" + data.photographers[3].name,
  data.photographers[3].name,
  "photograph__card--txt",
  data.photographers[3].city + "/" + data.photographers[3].country,
  data.photographers[3].tagline,
  data.photographers[3].price + "€/jour"
);
const articlePh5 = newArticleElt(
  "photograph__card",
  "./photographerPage.html",
  "photograph__card--link",
  "artist-pict",
  data.photographers[4].portrait,
  "Portrait représentant :" + data.photographers[4].name,
  data.photographers[4].name,
  "photograph__card--txt",
  data.photographers[4].city + "/" + data.photographers[4].country,
  data.photographers[4].tagline,
  data.photographers[4].price + "€/jour"
);
const articlePh6 = newArticleElt(
  "photograph__card",
  "./photographerPage.html",
  "photograph__card--link",
  "artist-pict",
  data.photographers[5].portrait,
  "Portrait représentant :" + data.photographers[5].name,
  data.photographers[5].name,
  "photograph__card--txt",
  data.photographers[5].city + "/" + data.photographers[5].country,
  data.photographers[5].tagline,
  data.photographers[5].price + "€/jour"
);

// const newNamePhotograph = document.createElement("h2");

// const photographCard = document.querySelectorAll(
//   "a[class=photograph__card--link]"
// );
// const firstPH = data.photographers[0];
// photographCard[0].appendChild(newNamePhotograph);
// newNamePhotograph.textContent = firstPH.name;

// // creat div with img
// function creatDivElt(linkClass, stringAL, profilPicture) {
//   let divElt = document.createElement("div");
//   divElt.setAttribute("class", linkClass);
//   divElt.setAttribute("aria-label", stringAL);
//   console.log(divElt);
//   divElt.innerHTML = profilPicture;
// }

// const creatDivMimiKeel = creatDivElt(
//   "artist-pict",
//   "Portrait représentant Mimi Keel",
//   "<img class='artist1' src='../pictures/PhotographersIDPhotos/MimiKeel.jpg' alt='photo de Mimi Keel' />"
// );
// console.log(creatDivMimiKeel);
// const creatDivERWilkens = creatDivElt(
//   "artist-pict",
//   "Portrait représentant Elie-Rose Wilkens"
// );
// console.log(creatDivERWilkens);
