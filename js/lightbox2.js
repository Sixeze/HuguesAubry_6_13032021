fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const params = new URL(document.location).searchParams;
    const urlIdNumber = params.get("dataph");
    const mediaFilterArray = phData.media.filter(
      (media) => media.photographerId == urlIdNumber
    );
    console.log(mediaFilterArray);

    class Lightbox {
      constructor(listMedia) {
        this.listMedia = listMedia;
      }

      init(idMedia) {
        var media = this.listMedia.find((p) => p.id == idMedia);
        console.log(media);
        this.showMedia(media);
        this.element.style.display = "block";
      }

      showMedia(media) {
        this.currentMedia = media;
        var mediaElement = null;
        if (media.image != undefined) {
          mediaElement = `<img src="photos/sample/${this.name}/${
            media.image
          }" alt="${media.alt}"><p class="text-lightbox">${media.image
            .replace(".jpg", "")
            .replace(/_/g, " ")}</p>`;
        }
        if (media.video != undefined) {
          mediaElement = `<video class="artist-cards__video" preload="metadata">
                                                <source src="${srcFolder}"
                                                date="${media.date}"
                                                tag="${media.tags}"
                                                alt="${media.alt}"
                                                >
                                            </video>
                                            <h2>${url
                                              .replace(".jpg", "")
                                              .replace(/_/g, " ")
                                              .replace(".mp4", "")}</h2>`;
        }
        this.element.querySelector(".lightbox_container").innerHTML =
          mediaElement;
      }
    }
    let lightBox = new Lightbox();
    lightBox.init(mediaFilterArray);
  });
//   .catch((error) => console.log("Erreur : " + error));
