fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // GET Params Number of URL
    const params = new URL(document.location).searchParams;
    const urlIdNumber = params.get("dataph");
    // console.log(`l'id de la page est : ${urlIdNumber} `);

    // element tag to Dom
    const mainPHPage = document.getElementsByTagName("main");
    const articlePhPage = document.getElementsByTagName("article");

    // analyse if URL parameter is same of photograph.id parameter
    const photographer = phData.photographers.find((p) => p.id == urlIdNumber);
    console.log(photographer);

    // filter Array
    const mediaFilterArray = phData.media.filter(
      (media) => media.photographerId == urlIdNumber
    );
    // console.log(mediaFilterArray);

    // create HTML elements
    const newHeader = document.createElement("header");
    mainPHPage[0].prepend(newHeader);
    newHeader.setAttribute("class", "ph-info");
    newHeader.setAttribute("aria-label", "photographer information");
    newHeader.innerHTML = `<section class="ph-card">
                                  <h1 class="ph-card__artist">${photographer.name}</h1>
                                  <aside class="ph-card__information">
                                  <p class="ph-card__information--city">${photographer.city}/${photographer.country}</p>
                                  <p class="ph-card__information--tagline">${photographer.tagline}</p>
                                  <ul class="tagBox"></ul></aside></section>
                                  <button type="button" class="ph-contact btn" title="contactez-moi">contactez-moi</button>
                                  <img src="media/PhotographersIDPhotos/${photographer.portrait}"
                                      alt="Portrait représentant ${photographer.portrait}"
                                        class="profil-picture">`;

    // Tags Elements
    for (let t in photographer.tags) {
      const ulTagBox = document.getElementsByClassName("tagBox");
      const liTagElt = document.createElement("li");
      ulTagBox[0].appendChild(liTagElt);
      liTagElt.setAttribute("class", "link-tag");
      liTagElt.innerHTML = `<a href="#" tittle="${photographer.tags[t]}" >#${photographer.tags[t]}</a> `;
    }

    // Section for show media
    const showMedia = (mediaFilterArray) => {
      for (let m in mediaFilterArray) {
        const media = mediaFilterArray[m];
        const idForMedia = media.photographerId;
        const srcImage = media.image;
        if (urlIdNumber == idForMedia) {
          const newSection = document.createElement("section");
          articlePhPage[0].appendChild(newSection);
          newSection.setAttribute("class", "artist-cards");
          let videoOrImage;
          let title = "";
          let srcFolder = "";
          if (srcImage) {
            title = media.image;
            srcFolder = `media/artistsPictures/${title}`;
            videoOrImage = `<img src="media/artistsPictures/${media.image}"
                                          alt="${media.alt}"
                                          tag="${media.tags}"
                                          date="${media.date}"
                                          class="artist-cards__picture"></img>`;
          } else {
            title = media.video;
            srcFolder = `media/artistsVideos/${title}`;
            videoOrImage = `<video class="artist-cards__video" poster="media/logo/logo.png" preload="metadata">
                                                <source src="media/artistsVideos/${media.video}"
                                                date="${media.date}"
                                                tag="${media.tags}"
                                                alt="${media.alt}"
                                                >
                                            </video>`;
          }
          newSection.innerHTML += `<a href="${srcFolder}" id="openLightbox">${videoOrImage}</a>
                                    <aside class="artist-cards__information">
                                    <h2 class="card-title">${media.alt}</h2>
                                    <p class="card-price">${media.price}€</p>
                                    <span class="card-likeNumbers" aria-label="like" role="button" tabindex="0">
                                    <p class="like">${media.likes}</p>
                                    <i class="fas fa-heart red-heart"></i></span>
                                    </aside>`;

          // ${title.replace(".jpg","").replace(/_/g," ").replace(".mp4","")}       ${media.alt}

          // let spanHeartLike = document.querySelector(".card-likeNumbers p");
          // console.log(spanHeartLike);
          // const spanHeartButton = document.querySelectorAll(
          //   ".card-likeNumbers"
          // );
          // spanHeartButton.forEach((span) =>
          //   span.addEventListener("click", function () {
          //     const likeCount = document.querySelector(".like");

          //     likeCount.textContent = media.likes++;
          //   })
          // );
          // const redHeartButton = document.querySelectorAll(".red-heart");
          // redHeartButton.forEach((heart) =>
          //   heart.addEventListener("click", function (l) {
          //     const likeCounts = document.getElementsByClassName("like");
          //     for (let l in likeCounts) {
          //       l.preventDefault;
          //       likeCounts[l].textContent = media.likes++;
          //     }
          //   })
          // );
          // const redHeartButton = document.querySelector(".red-heart");
          // redHeartButton.addEventListener("click", function () {
          //   const likeCount = document.querySelector(".like");

          //   likeCount.textContent = media.likes++;
          // });
        }

        // spanHeartLikes.forEach((heartLike) => console.log(heartLike));
      }
      // let spanHeartLikes = document.querySelectorAll(".card-likeNumbers");
      // console.log(spanHeartLikes);
      // spanHeartLikes.forEach((heartLike) => console.log(heartLike));

      // const pLikes = document.querySelectorAll(".card-likeNumbers p");
      // console.log(pLikes);
      // pLikes.forEach((like) => console.log(like));

      // create a new array with Numbers of likes
      // let totalLikesArray = [];
      // let pEltNumbers = document.querySelectorAll(
      //   ".card-likeNumbers p[class='like']"
      // );
      // console.log(pEltNumbers);
      // pEltNumbers.forEach((EltNumber) => {
      //   let number = parseInt(EltNumber.innerText);
      //   totalLikesArray.push(number);
      // });

      // console.log(totalLikesArray.reduce((total, likes) => total + likes));

      // let totalIncremente = totalLikesArray.reduce(
      //   (total, likes) => total + likes
      // );

      // console.log(plopChiffre);

      let totalLikes = mediaFilterArray
        .map((media) => media.likes)
        .reduce((total, likes) => total + likes);
      console.log(totalLikes);
      console.log(photographer.price);

      const totalLikesBox = document.querySelector("aside[class='counter']");
      const spanLikesBox = document.createElement("span");
      const spanPriceBox = document.createElement("span");

      spanLikesBox.classList.add("like-compt");
      spanLikesBox.innerHTML = `${totalLikes} <i class="fas fa-heart fa-1x blackHeart" aria-label="like"></i>`;
      spanPriceBox.classList.add("ratePerDay");
      spanPriceBox.innerHTML = `${photographer.price}€ / jour`;
      totalLikesBox.appendChild(spanLikesBox);
      totalLikesBox.appendChild(spanPriceBox);
      console.log(totalLikesBox);

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
    };

    showMedia(mediaFilterArray);
  })
  .catch((error) => console.log("Erreur : " + error));
