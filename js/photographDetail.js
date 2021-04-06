// fetch json file
fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    console.table(phData.photographers);
    console.table(phData.media);
  });

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
    });
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

// dataOfJson.media;
// console.log(dataOfJson.media);

// function showGoodPict() {
//   let t;
//   for (t = 0; t < dataOfJson.photographers.length; t += 1) {
//     const pHId = dataOfJson.photographers[t].id;
//     pHId;
//     console.log(dataOfJson.photographers[t].id);
//   }

//   let i;
//   for (i = 0; i < dataOfJson.media.length; i += 1) {
//     const dataId = dataOfJson.media[i].photographerId;
//     dataId;
//     console.log(dataId);
//   }
// }
// console.log(showGoodPict());

window.onload = () => {
  creatHeaderProfil();
  creatPictureCard();
};
