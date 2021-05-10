fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const params = new URL(document.location).searchParams;
    const urlIdNumber = params.get("dataph");
    const mediaFilterArray = phData.media.filter(
      (media) => media.photographerId == urlIdNumber
    );
    console.log(mediaFilterArray);

    // Get DOM elements
    const divBlockPage = document.querySelector("div.block_page");

    class Lightbox {
      static init() {
        const getMediaLinks = document.querySelectorAll(
          "a[href$='.jpg'], a[href$='.mp4']"
        );
        getMediaLinks.forEach((link) =>
          link.addEventListener("click", (e) => {
            e.preventDefault();

            new Lightbox(e.currentTarget.getAttribute("href"));
            console.log(e.currentTarget.getAttribute("href"));
          })
        );

        const getNameLinks = document.querySelectorAll("h2.card-title");
        getNameLinks.forEach((title) => {
          console.log(title.textContent);
          title.textContent;
        });
      }

      constructor(url) {
        const element = this.buildDom(url);

        divBlockPage.appendChild(element);
      }

      buildDom(url) {
        console.log(url);
        const sectionLightBox = document.createElement("section");
        sectionLightBox.classList.add("lightbox");
        sectionLightBox.setAttribute("aria-label", "lightbox gallery");
        sectionLightBox.innerHTML = `<div class="lightbox__container">
                        <button class="lightbox__container--close">fermer</button>
                        <button class="lightbox__container--left">précédent</button>
                        <button class="lightbox__container--right">suivant</button>
                        <div class="lightbox__container--img">
                        <img src="${url}" alt=""/>
                         <h2 class="card-title">${url
                           .replace(".jpg", "")
                           .replace(/_/g, " ")
                           .replace(".mp4", "")}</h2>
                         </div>
                      </div>`;
        return sectionLightBox;
      }
    }

    Lightbox.init();
  });
//   .catch((error) => console.log("Erreur : " + error));

// function lightbox(...mediaFilterArray) {
//   let galleryTest = gallery;
//   galleryTest.forEach((item) => {
//     console.log(item);
//   });
//   console.log(galleryTest);
//   for (let m in mediaFilterArray) {
//     const media = mediaFilterArray[m];
//     const srcImage = media.image;
//     let videoOrImage;

//     if (srcImage) {
//       videoOrImage = `<img src=""
//                                       alt="${media.alt}"
//                                       tag="${media.tags}"
//                                       date="${media.date}"
//                                       class="artist-cards__picture"></img>`;
//     } else {
//       videoOrImage = `<video class="artist-cards__video" preload="metadata">
//                                             <source src=""
//                                             date="${media.date}"
//                                             tag="${media.tags}"
//                                             alt="${media.alt}"
//                                             >
//                                         </video>`;
//     }
//     divBlockPage.appendChild(sectionLightBox);
//     sectionLightBox.classList.add("lightbox");
//     sectionLightBox.setAttribute("aria-label", "lightbox gallery");
//     sectionLightBox.innerHTML = `<div class="lightbox__container">
//                         <button class="lightbox__container--close">fermer</button>
//                         <button class="lightbox__container--left">précédent</button>
//                         <button class="lightbox__container--right">suivant</button>
//                         <div class="lightbox__container--img">
//                         ${videoOrImage}
//                          <h2 class="card-title">${mediaFilterArray[m].alt}</h2>
//                          </div>
//                       </div>`;
//   }
// }

// lightbox(...mediaFilterArray);

// const getNameLinks = Array.from(document.querySelectorAll("h2.card-title"));
// console.log(getNameLinks);
// const test = getNameLinks.map((link) => link.textContent);
// console.log(test);

// const getMediaLinks = Array.from(
//   document
//     .querySelectorAll("a[href$='.jpg'], a[href$='.mp4']")
//     .forEach((link) =>
//       link.addEventListener("click", (e) => {
//         e.preventDefault;
//       })
//     )
// );

// const gallery = getMediaLinks.map((mediaLink) =>
//   mediaLink.getAttribute("href")
// );
// console.log(getMediaLinks);
// console.log(gallery);

// getMediaLinks.forEach((mediaLink) =>
//   mediaLink.addEventListener("click", function (e) {
//     e.preventDefault();
//     sectionLightBox.style.display = "block";
//     console.log("ouvre la lightbox");
//   })
// );

// console.log(divBlockPage);

// const lightboxImage = gallery.forEach((item) => {
//   console.log(item);

//  const btnCloseLightBox = sectionLightBox.querySelector(
//       "div.lightbox__container button.lightbox__container--close"
//     );
//     console.log(btnCloseLightBox);
//     btnCloseLightBox.addEventListener("click", function () {
//       console.log("click de fermeture");
//       sectionLightBox.style.display = "none";
//     });
//
