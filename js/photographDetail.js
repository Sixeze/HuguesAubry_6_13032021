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
                                    <span class="card-likeNumbers">
                                    <p id="${media.id}">${media.likes}</p>
                                    <i class="fas fa-heart red-heart" aria-label="like" role="button" tabindex="0"></i></span>
                                    </aside>`;
          // ${title.replace(".jpg","").replace(/_/g," ").replace(".mp4","")}       ${media.alt}
        }
        let liked = mediaFilterArray.likes;

        const likeCount = () => {
          liked++;
          document.querySelector(`#${media.id}`).textContent = liked;
          console.log(document.querySelector(`#${media.id}`));
        };
        document.querySelector(".fas").addEventListener("click", likeCount);
      }
    };

    //     // counter for like cards
    //   }
    // }
    // console.log(likeCount);
    // const likeCount = document.getElementById(`${media.id}`);
    // console.log(likeCount);
    // const redHeartButton = document.querySelectorAll(".red-heart");
    // redHeartButton.forEach((heart) =>
    //   heart.addEventListener("click", function () {
    //     const likeCount = document.getElementById(`${media.id}`);
    //     console.log(likeCount);

    //     likeCount.textContent = media.likes++;
    //     console.log(media.like++);
    //   })
    // );
    // const totalLikes = document.getElementsByClassName(".like-compt")[0];
    // console.log(totalLikes);
    // const spanNumber = document.getElementsByClassName("card-likeNumbers")[0];
    // console.log(spanNumber);

    showMedia(mediaFilterArray);
  })
  .catch((error) => console.log("Erreur : " + error));
