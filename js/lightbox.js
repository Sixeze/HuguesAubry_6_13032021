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

    /**
     * @property {HTMLElement} element // <section class="lightbox" aria-label="lightbox gallery"> <== sectionLightBox ==>
     * @property {string[]} medias = galleryForLightBox path to lightBox media
     * @property {string} url media href active
     */
    class Lightbox {
      // lightbox inisializer comportement
      static init() {
        const getMediaLinks = Array.from(
          document.querySelectorAll("a[href$='.jpg'], a[href$='.mp4']")
        );

        const galleryForLightBox = getMediaLinks.map((medialink) =>
          medialink.getAttribute("href")
        );

        // console.log(galleryForLightBox);
        getMediaLinks.forEach((medialink) =>
          medialink.addEventListener("click", (e) => {
            e.preventDefault();

            new Lightbox(
              e.currentTarget.getAttribute("href"), // param url
              galleryForLightBox // param medias
            );
            // console.log(e.currentTarget);
            // console.log(e.currentTarget.getAttribute("href"));
            document.removeEventListener("click", this.e);
          })
        );
      }

      /**
       * @param {string[]} medias = galleryForLightBox path to lightBox media
       * @param {string} url href of media open
       */
      constructor(url, medias) {
        this.element = this.buildDom(url);
        this.showMediaLoaded(url);
        this.medias = medias;
        console.log(this.medias);
        this.onKeyDown = this.onKeyDown.bind(this);
        divBlockPage.appendChild(this.element);
        document.addEventListener("keydown", this.onKeyDown);
      }

      /**
       *
       * @param {string} url
       */
      showMediaLoaded(url) {
        this.url = null;
        const media = new Image();
        const h2 = this.element.querySelector(".card-title");
        const container = this.element.querySelector(
          ".lightbox__container--media"
        );
        container.innerHTML = "";
        media.onload = () => {
          container.prepend(media);
          media.setAttribute(
            "alt",
            `${url
              .replace(".jpg", "")
              .replace(/_/g, " ")
              .replace(".mp4", "")
              .replace("media/artistsVideos/", "")
              .replace("media/artistsPictures/", "")}`
          );
          h2.textContent = `${url
            .replace(".jpg", "")
            .replace(/_/g, " ")
            .replace(".mp4", "")
            .replace("media/artistsVideos/", "")
            .replace("media/artistsPictures/", "")}`;
          container.appendChild(h2);

          this.url = url;
          // console.log(media);
        };
        media.src = url;

        // <img src="${url}" alt=""/>
      }

      /**
       *
       * @param {keyboardEvent} e
       */
      onKeyDown(e) {
        if (e.key == "Escape") {
          this.close(e);
        } else if (e.key == "ArrowLeft") {
          this.prev(e);
        } else if (e.key == "ArrowRight") {
          this.next(e);
        }
      }

      /**
       * close lightbox to click svg X
       * @param {MouseEvent|KeyboardEvent} e
       */
      close(e) {
        e.preventDefault();
        const backgroundLightBox = document.querySelector(".lightbox");

        backgroundLightBox.style.display = "none";
        backgroundLightBox.setAttribute("aria-hidden", "true");
        document.removeEventListener("keydown", this.onKeyDown);
        document.location.reload();
      }

      /**
       * select to go previus media
       * @param {MouseEvent|KeyboardEvent} e
       */
      prev(e) {
        e.preventDefault();
        let m = this.medias.findIndex((media) => media === this.url);
        if (m == 0) {
          m = this.medias.length;
        }
        this.showMediaLoaded(this.medias[m - 1]);
        // debugger;
      }

      /**
       * select to go next media
       * @param {MouseEvent|KeyboardEvent} e
       */
      next(e) {
        e.preventDefault();
        let m = this.medias.findIndex((media) => media === this.url);
        if (m == this.medias.length - 1) {
          m = -1;
        }
        // console.log([m]);
        // console.log(this.medias.length - 1);
        this.showMediaLoaded(this.medias[m + 1]);
        // debugger;
      }

      /**
       * @method
       * @param {string} url href de l'image
       * @returns elementHTML  // <section class="lightbox" aria-label="lightbox gallery"> <== sectionLightBox ==>
       */
      buildDom(url) {
        // console.log(url);
        const sectionLightBox = document.createElement("section");
        sectionLightBox.classList.add("lightbox");
        sectionLightBox.setAttribute("aria-label", "lightbox gallery");
        sectionLightBox.innerHTML = `<div class="lightbox__container">
                        <button class="lightbox__container--close">fermer</button>
                        <button class="lightbox__container--prev">précédent</button>
                        <button class="lightbox__container--next">suivant</button>
                        <div class="lightbox__container--media">
                            <h2 class="card-title">${url}</h2>;
                        </div>
                      </div>`;
        sectionLightBox
          .querySelector(".lightbox__container--close")
          .addEventListener("click", this.close.bind(this));
        sectionLightBox
          .querySelector(".lightbox__container--prev")
          .addEventListener("click", this.prev.bind(this));
        sectionLightBox
          .querySelector(".lightbox__container--next")
          .addEventListener("click", this.next.bind(this));

        return sectionLightBox;
      }
    }

    Lightbox.init();
  })
  .catch((error) => console.log("Erreur : " + error));

// lightbox(...mediaFilterArray) {
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
