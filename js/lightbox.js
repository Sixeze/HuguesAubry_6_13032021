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

    getMediaLinks.forEach((medialink) =>
      medialink.addEventListener("click", (e) => {
        e.preventDefault();

        new Lightbox(
          e.currentTarget.getAttribute("href"), // param url

          galleryForLightBox // param listMedia
        );

        const btnClose = document.querySelector(".lightbox__container--close");
        const mediaClicked = document.querySelector(".current-Media");
        if (mediaClicked.tagName === "IMG") {
          btnClose.focus();
        } else if (mediaClicked.tagName === "VIDEO") {
          mediaClicked.focus();
        }
        document
          .querySelector("header[id='main-banner']")
          .setAttribute("aria-hidden", "true");
        document
          .querySelector("main[id='photographer-page']")
          .setAttribute("aria-hidden", "true");

        document.removeEventListener("click", this.e);
      })
    );
  }

  /**
   * @param {string[]} listMedia = galleryForLightBox path to lightBox media
   * @param {string} url href of media open
   */
  constructor(url, listMedia) {
    this.element = this.buildDom();
    this.showMediaLoaded(url);
    this.listMedia = listMedia;
    // console.log(this.listMedia);
    this.onKeyDown = this.onKeyDown.bind(this);
    const divBlockPage = document.querySelector("div.block_page");
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
      mediaElement = `<img src="${url}" alt="${title}" class="current-Media">
                      <h2 class="card-title" aria-hidden="true">${title}</h2>`;
      this.url = url;
    }
    if (/artistsVideos/.test(url)) {
      mediaElement = `<video preload="metadata" controls autoplay loop title="${title}" class="current-Media">
                          <source src="${url}" type="video/mp4" alt="${title}">
                      </video>
                      <h2 class="card-title" aria-hidden="true">${title}</h2>`;
      this.url = url;
    }
    container.innerHTML = mediaElement;
  }

  /**
   *
   * @param {keyboardEvent} e
   */
  onKeyDown(e) {
    let mediaClicked = document.querySelector(".current-Media");
    let closeElt = document.querySelector(".lightbox__container--close");
    let nextElt = document.querySelector(".lightbox__container--next");
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 27) {
      this.close(e);
    } else if (keyCode == 37) {
      this.prev(e);
    } else if (keyCode == 39) {
      this.next(e);
    }

    if (keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === closeElt) {
          e.preventDefault();
          nextElt.focus();
        }
      } else {
        if (document.activeElement === nextElt) {
          e.preventDefault();
          closeElt.focus();
        }
      }
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
    document
      .querySelector("header[id='main-banner']")
      .setAttribute("aria-hidden", "false");
    document
      .querySelector("main[id='photographer-page']")
      .setAttribute("aria-hidden", "false");
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

    this.showMediaLoaded(this.listMedia[m + 1]);
  }

  /**
   * @returns elementHTML  // <section class="lightbox" aria-label="lightbox gallery"> <== sectionLightBox ==>
   */
  buildDom() {
    const sectionLightBox = document.createElement("section");
    sectionLightBox.classList.add("lightbox");
    sectionLightBox.setAttribute("aria-label", "lightbox gallery");
    sectionLightBox.innerHTML = `<div role="dialog" class="lightbox__container" aria-modal="true">
                        <button class="lightbox__container--close">fermer</button>
                        <button class="lightbox__container--prev">pr??c??dent</button>
                        <div class="lightbox__container--media"></div>
                        <button class="lightbox__container--next">suivant</button>
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
