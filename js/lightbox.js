// Get DOM elements
const divBlockPage = document.querySelector("div.block_page");

/**
 * @property {HTMLElement} element // <section class="lightbox" aria-label="lightbox gallery"> <== sectionLightBox ==>
 * @property {string[]} listMedia = galleryForLightBox path to lightBox media
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

          galleryForLightBox // param listMedia
        );
        // console.log(e.currentTarget);
        // console.log(e.currentTarget.getAttribute("href"));
        const container = document.querySelector(".lightbox__container--media");
        container.focus();
        document.removeEventListener("click", this.e);
      })
    );
  }

  /**
   * @param {string[]} listMedia = galleryForLightBox path to lightBox media
   * @param {string} url href of media open
   */
  constructor(url, listMedia) {
    this.element = this.buildDom(url);
    this.showMediaLoaded(url);
    this.listMedia = listMedia;
    // console.log(this.listMedia);
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
    const container = this.element.querySelector(".lightbox__container--media");
    container.innerHTML = "";

    let mediaElement = null;
    const title = url
      .replace(".jpg", "")
      .replace(/_/g, " ")
      .replace(".mp4", "")
      .replace("media/artistsVideos/", "")
      .replace("media/artistsPictures/", "");
    if (/artistsPictures/.test(url)) {
      mediaElement = `<img src="${url}" alt="${title}"><h2 class="card-title">${title}</h2>`;
      this.url = url;
    }
    if (/artistsVideos/.test(url)) {
      mediaElement = `<video preload="metadata" controls autoplay loop title="${title}">
                          <source src="${url}" type="video/mp4" alt=""></video>
                      <h2 class="card-title">${title}</h2>`;
      this.url = url;
    }
    container.innerHTML = mediaElement; // new MediaFactory(url)
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
    let m = this.listMedia.findIndex((media) => media === this.url);
    if (m == 0) {
      m = this.listMedia.length;
    }
    this.showMediaLoaded(this.listMedia[m - 1]);
    // debugger;
  }

  /**
   * select to go next media
   * @param {MouseEvent|KeyboardEvent} e
   */
  next(e) {
    e.preventDefault();
    let m = this.listMedia.findIndex((media) => media === this.url);
    if (m == this.listMedia.length - 1) {
      m = -1;
    }
    // console.log([m]);
    // console.log(this.listMedia.length - 1);
    this.showMediaLoaded(this.listMedia[m + 1]);
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
    sectionLightBox.innerHTML = `<div role="dialog" class="lightbox__container" aria-modal="true">
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

class ImageFactory {
  constructor(url) {
    this.url = url;
    this.media = this.createImage(url);
  }

  createImage(url) {
    const imageElt = document.createElement("img");
    imageElt.setAttribute("src", `${url}`);
    imageElt.setAttribute(
      "alt",
      `${url
        .replace(".jpg", "")
        .replace(/_/g, " ")
        .replace(".mp4", "")
        .replace("media/artistsVideos/", "")
        .replace("media/artistsPictures/", "")}`
    );
    console.log(imageElt);

    return imageElt;
  }
}

class VideoFactory {
  constructor(url) {
    this.url = url;
    this.media = this.createVideo(url);
  }

  createVideo(url) {
    const videoElt = document.createElement("video");
    // videoElt.setAttribute("preload", "metadata");
    videoElt.setAttribute("controls", "controls");
    videoElt.innerHTML = `<source src="${url}"
                                  alt=${url
                                    .replace(".jpg", "")
                                    .replace(/_/g, " ")
                                    .replace(".mp4", "")
                                    .replace("media/artistsVideos/", "")
                                    .replace("media/artistsPictures/", "")}>`;
    console.log(videoElt);

    return videoElt;
  }
}

class MediaFactory {
  constructor(url) {
    if (/artistsPictures/.test(url)) return new ImageFactory(url);
    if (/artistsVideos/.test(url)) return new VideoFactory(url);
  }
}
