fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // GET Params Number of URL
    const params = new URL(document.location).searchParams;
    const urlIdNumber = params.get("dataph");
    // console.log(`l'id de la page est : ${urlIdNumber} `);

    // element tag to Dom
    const mainPHPage = document.getElementsByTagName("main");

    // analyse if URL parameter is same of photograph.id parameter
    const photographer = phData.photographers.find((p) => p.id == urlIdNumber);
    // console.log(photographer);

    // filter Array
    const mediaFilterArray = phData.media.filter(
      (media) => media.photographerId == urlIdNumber
    );
    // console.log(mediaFilterArray);

    // create HTML elements
    const createNewHeader = () => {
      const newHeader = document.createElement("header");
      mainPHPage[0].prepend(newHeader);
      newHeader.setAttribute("class", "ph-info");
      newHeader.setAttribute("aria-label", "photographer information");
      newHeader.innerHTML = `<article class="ph-card">
                              <h1 class="ph-card__artist">${photographer.name}</h1>
                              <aside class="ph-card__information">
                                <p class="ph-card__information--city">${photographer.city}/${photographer.country}</p>
                                <p class="ph-card__information--tagline">${photographer.tagline}</p>
                                <ul class="tagBox"></ul>
                              </aside>
                            </article>
                            <button type="button" id="openForm" aria-haspopup="dialog" aria-controls="dialog" class="ph-contact btn" title="contactez-moi">contactez-moi</button>
                            <img src="media/PhotographersIDPhotos/${photographer.portrait}"
                                alt="Portrait représentant ${photographer.portrait}"
                                class="profil-picture">`;

      // Tags Elements
      for (let t in photographer.tags) {
        const ulTagBox = document.getElementsByClassName("tagBox");
        const liTagElt = document.createElement("li");
        ulTagBox[0].appendChild(liTagElt);
        liTagElt.setAttribute("class", "link-tag");
        liTagElt.innerHTML = `<a href="#" title="${photographer.tags[t]}" >#${photographer.tags[t]}</a> `;
      }
    };

    // Section for show media
    const showMedia = (...mediaFilterArray) => {
      const showMediaSection = document.querySelector("#show-media");
      showMediaSection.innerHTML = "";
      for (let m in mediaFilterArray) {
        const media = mediaFilterArray[m];
        const srcImage = media.image;
        let videoOrImage;
        let title = "";
        let srcFolder = "";

        if (srcImage) {
          title = media.image;
          srcFolder = `media/artistsPictures/${title}`;
          videoOrImage = `<img src="${srcFolder}"
                                          alt="${media.alt}"
                                          tag="${media.tags}"
                                          date="${media.date}"
                                          class="artist-cards__picture">
                                          </img>`;
        } else {
          title = media.video;
          srcFolder = `media/artistsVideos/${title}`;
          videoOrImage = `<video class="artist-cards__video" preload="metadata">
                                                <source src="${srcFolder}"
                                                date="${media.date}"
                                                tag="${media.tags}"
                                                alt="${media.alt}"
                                                >
                                            </video>`;
        }
        showMediaSection.innerHTML += `<article class="artist-cards">
                                            <a href="${srcFolder}" aria-haspopup="dialog" aria-controls="dialog" role="button">${videoOrImage}</a>
                                            <aside class="artist-cards__information">
                                                  <h2 class="card-title">${title
                                                    .replace(".jpg", "")
                                                    .replace(/_/g, " ")
                                                    .replace(".mp4", "")}</h2>
                                                  <p class="card-price">${
                                                    media.price
                                                  }€</p>
                                                  <span class="card-likeNumbers" aria-label="like" role="button" tabindex="0">
                                                      <p class="like">${
                                                        media.likes
                                                      }</p>
                                                      <i class="fas fa-heart red-heart"></i>
                                                  </span>
                                            </aside>
                                      </article>`;

        // ${title.replace(".jpg","").replace(/_/g," ").replace(".mp4","")}       ${media.alt}
      }

      let spanHeartLikes = document.querySelectorAll(".card-likeNumbers");
      spanHeartLikes.forEach((heartLike) =>
        heartLike.addEventListener("click", function () {
          // count like for each string Number
          const pLikes = heartLike.querySelector(
            ".card-likeNumbers p[class='like']"
          );
          console.log(pLikes);
          let pStringNumber = pLikes.innerText;
          // console.log(pStringNumber);
          let number = parseInt(pStringNumber);
          // console.log(number);
          pLikes.textContent = ++number;

          // count like for total string Number
          const spanLikes = document.querySelector(".like-compt");
          // console.log(spanLikes);
          let spanNumber = parseInt(spanLikes.innerText);
          // console.log(spanNumber);
          spanLikes.textContent = ++spanNumber;
        })
      );

      let totalLikes = mediaFilterArray
        .map((media) => media.likes)
        .reduce((total, likes) => total + likes);
      // console.log(totalLikes);
      // console.log(photographer.price);

      const totalLikesBox = document.querySelector("aside[class='counter']");

      totalLikesBox.innerHTML = `<span class="like-compt">${totalLikes}
                                    <i class="fas fa-heart fa-1x blackHeart" aria-label="like"></i>
                                  </span>
                                  <span class="ratePerDay">${photographer.price}€ / jour</span>`;

      // console.log(totalLikesBox);
    };

    const selectForSort = document.getElementsByTagName("select")[0];
    selectForSort.addEventListener("change", function () {
      let sortResult = null;
      const mediaSortResult = mediaFilterArray.filter(
        (media) => media.sortResult
      );
      console.log(mediaSortResult);

      switch (this.value) {
        case "0":
          sortResult = mediaFilterArray.sort((a, b) => b.likes - a.likes);
          break;
        case "1":
          sortResult = mediaFilterArray.sort(
            (a, b) => Date.parse(b.date) - Date.parse(a.date)
          );
          console.log(mediaFilterArray);
          console.log(sortResult.url);

          break;
        case "2":
          sortResult = mediaFilterArray.sort((a, b) =>
            a.alt.localeCompare(b.alt)
          );
          console.log(mediaFilterArray);
          break;
      }
      showMedia(...sortResult);
      Lightbox.init();
    });
    createNewHeader();
    showMedia(...mediaFilterArray);
    Lightbox.init();
  })
  .catch((error) => console.log("Erreur : " + error));
