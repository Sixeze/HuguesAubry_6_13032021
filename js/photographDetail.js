fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // GET Params Number of URL
    const params = new URL(document.location).searchParams;
    const urlIdNumber = params.get("dataph");

    // element tag to Dom
    const mainPHPage = document.getElementsByTagName("main");

    // analyse if URL parameter is same of photograph.id parameter
    const photographer = phData.photographers.find((p) => p.id == urlIdNumber);

    // filter Array
    const mediaFilterArray = phData.media.filter(
      (media) => media.photographerId == urlIdNumber
    );

    // create HTML elements
    const createNewHeader = () => {
      const newHeader = document.createElement("header");
      mainPHPage[0].prepend(newHeader);
      newHeader.setAttribute("class", "ph-info");
      newHeader.setAttribute("aria-label", "photographer information");
      // newHeader.setAttribute("tabindex", "0");
      newHeader.innerHTML = `<article class="ph-card">
                              <h1 tabindex="0" class="ph-card__artist">${photographer.name}</h1>
                              <span class="sr-only">${photographer.name}</span>
                              <aside class="ph-card__information">
                                <h2 tabindex="0" class="ph-card__information--city">${photographer.city}, ${photographer.country}</h2>
                                <span class="sr-only">${photographer.city}, ${photographer.country}</span>
                                <h3 tabindex="0" class="ph-card__information--tagline">${photographer.tagline}</h3>
                                <ul class="tagBox"></ul>
                              </aside>
                            </article>
                            <button type="button" id="openForm" aria-haspopup="dialog" aria-controls="dialog" class="ph-contact btn" >contactez-moi</button>
                            <img src="media/PhotographersIDPhotos/${photographer.portrait}"
                                alt="Portrait représentant : ${photographer.name}"
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
      for (const mediaData of mediaFilterArray) {
        let media = new MediaFactory(mediaData);
        showMediaSection.innerHTML += media.show();
      }

      const likeCountSpanElts = document.querySelectorAll(
        "span.card-likeNumbers"
      );
      likeCountSpanElts.forEach((span) => {
        ["click", "keypress"].forEach((event) =>
          span.addEventListener(event, counterLike)
        );

        function counterLike() {
          let pLikes = span.childNodes[1];
          console.log(span);

          let spanELement = mediaFilterArray.filter((elt) => elt.id == span.id);
          let spanLikes = document.querySelector(".like-compt");
          let spanNumber = parseInt(spanLikes.innerText);

          if (!span.change) {
            spanELement[0].likes++;
            spanLikes.textContent = ++spanNumber;
            span.change = true;
            span.classList.add("liked");
          } else {
            spanELement[0].likes--;
            spanLikes.textContent = --spanNumber;
            span.change = false;
            span.classList.remove("liked");
          }

          pLikes.textContent = spanELement[0].likes;
        }
      });

      const totalLikes = mediaFilterArray
        .map((media) => media.likes)
        .reduce((total, likes) => total + likes);

      const totalLikesBox = document.querySelector("aside[class='counter']");

      totalLikesBox.innerHTML = `<span class="like-compt" aria-label="total like">${totalLikes}</span>
                                  <span class="sr-only">${totalLikes}</span>
                                  <i class="fas fa-heart fa-1.1x blackHeart" aria-label="like"></i>
                                  <span class="ratePerDay" aria-label="price per day">${photographer.price}€ / jour</span>
                                  <span class="sr-only">${photographer.price}</span>`;
    };

    const selectForSort = document.getElementsByTagName("select")[0];
    selectForSort.addEventListener("change", function () {
      let sortResult = null;
      const mediaSortResult = mediaFilterArray.filter(
        (media) => media.sortResult
      );

      switch (this.value) {
        case "0":
          sortResult = mediaFilterArray.sort((a, b) => b.likes - a.likes);
          break;
        case "1":
          sortResult = mediaFilterArray.sort(
            (a, b) => Date.parse(b.date) - Date.parse(a.date)
          );

          break;
        case "2":
          sortResult = mediaFilterArray.sort((a, b) =>
            a.alt.localeCompare(b.alt)
          );
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
