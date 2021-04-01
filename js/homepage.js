/** anotation de la page
 * les fonctions retrouvé sur cette page
 * 1. Afficher la liste des Photographes
 * 2. Filtrer par tags
 */

// import { data } from "./photographData";

// new article + element
const mainSection = document.getElementsByTagName("main");

function creatArticleCard() {
  let i;
  for (i = 0; i < data.photographers.length; i += 1) {
    const newArticle = document.createElement("article");
    mainSection[0].appendChild(newArticle);
    newArticle.setAttribute("class", "photograph__card");

    const aLinkElt = document.createElement("a");
    newArticle.appendChild(aLinkElt);
    aLinkElt.setAttribute("href", "./photographerPage.html");
    aLinkElt.setAttribute("class", "photograph__card--link");

    const imgElt = document.createElement("img");
    aLinkElt.appendChild(imgElt);
    imgElt.setAttribute("class", "artist-pict");
    imgElt.setAttribute("src", data.photographers[i].portrait);
    imgElt.setAttribute(
      "alt",
      "Portrait représentant: " + data.photographers[i].name
    );

    const titleNameElt = document.createElement("h2");
    aLinkElt.appendChild(titleNameElt);
    titleNameElt.textContent = data.photographers[i].name;

    const asideElt = document.createElement("aside");
    newArticle.appendChild(asideElt);
    asideElt.setAttribute("class", "photograph__card--txt");

    const strongElt = document.createElement("strong");
    asideElt.appendChild(strongElt);
    strongElt.textContent =
      data.photographers[i].city + "/" + data.photographers[i].country;

    const pElt = document.createElement("p");
    asideElt.appendChild(pElt);
    pElt.textContent = data.photographers[i].tagline;

    const spanElt = document.createElement("span");
    asideElt.appendChild(spanElt);
    spanElt.textContent = data.photographers[i].price + "€/jour";

    const ulTag = document.createElement("ul");
    asideElt.appendChild(ulTag);
    ulTag.setAttribute("class", "tagBox");
    const tagsData = data.photographers[i].tags;
    for (let t = 0; t < tagsData.length; t += 1) {
      const liTagElt = document.createElement("li");
      ulTag.appendChild(liTagElt);
      liTagElt.setAttribute("class", "link-tag");
      const aTagElt = document.createElement("a");
      liTagElt.appendChild(aTagElt);
      aTagElt.setAttribute("href", "#");
      aTagElt.setAttribute("title", tagsData[t]);
      aTagElt.textContent = "#" + tagsData[t];
    }
  }
}

window.onload = () => {
  creatArticleCard();
};

// function newArticleElt(
//   articleClassData,
//   aHrefData,
//   aClassData,
//   imgClassData,
//   imgSrcData,
//   imgAltData,
//   artistName,
//   asideClassData,
//   cityAndCountry,
//   tagline,
//   price
// ) {
//   const newArticle = document.createElement("article");
//   const main = document.getElementsByTagName("main");
//   const aLinkElt = document.createElement("a");
//   const imgElt = document.createElement("img");
//   const titleNameElt = document.createElement("h2");
//   const asideElt = document.createElement("aside");
//   const strongElt = document.createElement("strong");
//   const pElt = document.createElement("p");
//   const spanElt = document.createElement("span");

//   main[0].appendChild(newArticle);

//   newArticle.appendChild(aLinkElt);
//   newArticle.appendChild(asideElt);

//   aLinkElt.appendChild(imgElt);
//   aLinkElt.appendChild(titleNameElt);

//   asideElt.appendChild(strongElt);
//   asideElt.appendChild(pElt);
//   asideElt.appendChild(spanElt);

//   newArticle.setAttribute("class", articleClassData);

//   aLinkElt.setAttribute("href", aHrefData);
//   aLinkElt.setAttribute("class", aClassData);

//   imgElt.setAttribute("class", imgClassData);
//   imgElt.setAttribute("src", imgSrcData);
//   imgElt.setAttribute("alt", imgAltData);

//   titleNameElt.textContent = artistName;

//   asideElt.setAttribute("class", asideClassData);

//   strongElt.textContent = cityAndCountry;
//   pElt.textContent = tagline;
//   spanElt.textContent = price;
// }

// for (let i = 0; i < data.photographers.length; i += 1) {
//   const ulTag = document.createElement("ul");
//   ulTag.setAttribute("class", "tagBox");
//   console.log(ulTag);
//   const tagsData = data.photographers[i].tags;
//   for (let t = 0; t < tagsData.length; t += 1) {
//     const liTagElt = document.createElement("li");
//     ulTag.appendChild(liTagElt);
//     liTagElt.setAttribute("class", "link-tag");
//     const aTagElt = document.createElement("a");
//     liTagElt.appendChild(aTagElt);
//     aTagElt.setAttribute("href", "#");
//     aTagElt.setAttribute("title", tagsData[t]);
//     aTagElt.textContent = "#" + tagsData[t];

//     console.log(liTagElt);
//     console.log(aTagElt);
//   }
// }

// const articlePh1 = newArticleElt(
//   "photograph__card",
//   "./photographerPage.html",
//   "photograph__card--link",
//   "artist-pict",
//   data.photographers[0].portrait,
//   "Portrait représentant :" + data.photographers[0].name,
//   data.photographers[0].name,
//   "photograph__card--txt",
//   data.photographers[0].city + "/" + data.photographers[0].country,
//   data.photographers[0].tagline,
//   data.photographers[0].price + "€/jour"
// );
// const articlePh2 = newArticleElt(
//   "photograph__card",
//   "./photographerPage.html",
//   "photograph__card--link",
//   "artist-pict",
//   data.photographers[1].portrait,
//   "Portrait représentant :" + data.photographers[1].name,
//   data.photographers[1].name,
//   "photograph__card--txt",
//   data.photographers[1].city + "/" + data.photographers[1].country,
//   data.photographers[1].tagline,
//   data.photographers[1].price + "€/jour"
// );
// const articlePh3 = newArticleElt(
//   "photograph__card",
//   "./photographerPage.html",
//   "photograph__card--link",
//   "artist-pict",
//   data.photographers[2].portrait,
//   "Portrait représentant :" + data.photographers[2].name,
//   data.photographers[2].name,
//   "photograph__card--txt",
//   data.photographers[2].city + "/" + data.photographers[2].country,
//   data.photographers[2].tagline,
//   data.photographers[2].price + "€/jour"
// );
// const articlePh4 = newArticleElt(
//   "photograph__card",
//   "./photographerPage.html",
//   "photograph__card--link",
//   "artist-pict",
//   data.photographers[3].portrait,
//   "Portrait représentant :" + data.photographers[3].name,
//   data.photographers[3].name,
//   "photograph__card--txt",
//   data.photographers[3].city + "/" + data.photographers[3].country,
//   data.photographers[3].tagline,
//   data.photographers[3].price + "€/jour"
// );
// const articlePh5 = newArticleElt(
//   "photograph__card",
//   "./photographerPage.html",
//   "photograph__card--link",
//   "artist-pict",
//   data.photographers[4].portrait,
//   "Portrait représentant :" + data.photographers[4].name,
//   data.photographers[4].name,
//   "photograph__card--txt",
//   data.photographers[4].city + "/" + data.photographers[4].country,
//   data.photographers[4].tagline,
//   data.photographers[4].price + "€/jour"
// );
// const articlePh6 = newArticleElt(
//   "photograph__card",
//   "./photographerPage.html",
//   "photograph__card--link",
//   "artist-pict",
//   data.photographers[5].portrait,
//   "Portrait représentant :" + data.photographers[5].name,
//   data.photographers[5].name,
//   "photograph__card--txt",
//   data.photographers[5].city + "/" + data.photographers[5].country,
//   data.photographers[5].tagline,
//   data.photographers[5].price + "€/jour"
// );

// function openProfilPage() {
//   window.location = "photographerPage.html";
// }

// aLinkElt.addEventListener("click", openProfilPage);

// console.log(aLinkElt);

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

// const tagUlCard = document.createElement("ul");
// const liElt = document.createElement("li");
// ulElt.appendChild(liElt);
// liElt.setAttribute("class", "link-tag");
// function tagsData(i) {
//   let linkTags = data.photographers[i].tags;
//   for (let i = 0; i < linkTags.length; i += 1) {}
// }
