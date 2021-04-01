/** page photographe :
 * lorsque l'on clique sur une photo d'artiste ceci ouvre la page photographe de l'artiste avec les bonne image, le bon nom et le bon carroussel
 * changer le H1 page et le h2 form pour qu'il soit en adéquation avec la page de l'artiste
 *
 */

// quand tu click sur data.photographer[0] et que ca ouvre le lien alinkElt on atterit sur une page
// avec les infos du photograph [0]

// const pHcard = document.getElementsByClassName("photograph__card")[0];

// pHcard.addEventListener("click", openPhPage({}));l
// let aLinkElt = document.createElement("a");

// if (aLinkElt.data.photographers[i].onclick) {
// show.data.photographers[i].elt
// }

// tag main Dom
const mainPHPage = document.getElementsByTagName("main");

// creat header profil photograph
function creatHeaderProfil() {
  const newHeader = document.createElement("header");
  mainPHPage[0].prepend(newHeader);
  newHeader.setAttribute("class", "ph-info");
  newHeader.setAttribute("aria-label", "photographer information");

  const sectionElt = document.createElement("section");
  newHeader.appendChild(sectionElt);
  sectionElt.setAttribute("class", "ph-card");

  const h1Elt = document.createElement("h1");
  sectionElt.appendChild(h1Elt);
  h1Elt.setAttribute("class", "ph-card__artist");
  h1Elt.textContent = data.photographers[0].name;

  const asideElt = document.createElement("aside");
  h1Elt.appendChild(asideElt);
  asideElt.setAttribute("class", "ph-card__information");

  const pElt = document.createElement("p");
  asideElt.appendChild(pElt);
  pElt.setAttribute("class", "ph-card__information--city");
  pElt.textContent =
    data.photographers[0].city + "/" + data.photographers[0].country;

  const p2Elt = document.createElement("p");
  asideElt.appendChild(p2Elt);
  p2Elt.setAttribute("class", "ph-card__information--tagline");
  p2Elt.textContent = data.photographers[0].tagline;

  const ulTag = document.createElement("ul");
  asideElt.appendChild(ulTag);
  ulTag.setAttribute("class", "tagBox");
  const tagsData = data.photographers[0].tags;
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

  const contactButton = document.createElement("button");
  newHeader.appendChild(contactButton);
  contactButton.setAttribute("type", "button");
  contactButton.setAttribute("class", "ph-contact btn");
  contactButton.setAttribute("title", "contactez-moi");
  contactButton.textContent = "contactez-moi";

  const pictureElt = document.createElement("img");
  newHeader.appendChild(pictureElt);
  pictureElt.setAttribute("class", "profil-picture");
  pictureElt.setAttribute("src", data.photographers[0].portrait);
  pictureElt.setAttribute(
    "alt",
    "Portrait représentant: " + data.photographers[0].name
  );
}

// portofolio
const articlePhPage = document.getElementsByTagName("article");

function creatPictureCard() {
  let i;
  for (i = 0; i < data.media.length; i += 1) {
    const newSection = document.createElement("section");
    articlePhPage[0].appendChild(newSection);
    newSection.setAttribute("class", "artist-cards");

    const aLinkLightbox = document.createElement("a");
    newSection.prepend(aLinkLightbox);
    aLinkLightbox.setAttribute("href", "#");
    aLinkLightbox.setAttribute("id", "openLightbox");

    const imgIdElt = document.createElement("img");
    aLinkLightbox.appendChild(imgIdElt);
    imgIdElt.setAttribute("src", ""); //inclure le bon chemin d'image
    imgIdElt.setAttribute("alt", ""); //data.media[i].tags
    imgIdElt.setAttribute("class", "artist-cards__picture");

    const asideTxtElt = document.createElement("aside");
    newSection.appendChild(asideTxtElt);
    asideTxtElt.setAttribute("class", "artist-cards__information");

    const h2TittlePicture = document.createElement("h2");
    asideTxtElt.appendChild(h2TittlePicture);
    h2TittlePicture.setAttribute("class", "card-title");
    h2TittlePicture.textContent = data.media[i].id;

    const pPriceElt = document.createElement("p");
    asideTxtElt.appendChild(pPriceElt);
    pPriceElt.setAttribute("class", "card-price");
    pPriceElt.textContent = data.media[i].price + " €";

    const spanLikeElt = document.createElement("span");
    pPriceElt.appendChild(spanLikeElt);
    spanLikeElt.setAttribute("class", "card-likeNumbers");
    spanLikeElt.textContent = data.media[i].likes;

    const iconeHeartElt = document.createElement("i");
    pPriceElt.appendChild(iconeHeartElt);
    iconeHeartElt.setAttribute("class", "fas fa-heart");
    iconeHeartElt.setAttribute("aria-label", "like");
    iconeHeartElt.setAttribute("role", "button");
    iconeHeartElt.setAttribute("tabindex", "0");
  }
}

window.onload = () => {
  creatHeaderProfil();
  creatPictureCard();
};

// const photographPage = creatHeaderProfil();
// photographPage;
