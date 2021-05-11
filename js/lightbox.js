class lightbox {
  static init() {
    const links = document
      .querySelectorAll("a[href$='.jpg'], a[href$='.mp4']")
      .forEach((link) =>
        link.addEventListener("click", (evt) => {
          evt.preventDefault();
          new lightbox(evt.currentTarget.getAttribute("href"));
        })
      );
    console.log(links);
  }
  /**
   *
   * @param {string} url de l'image ou video
   */
  constructor(url) {
    const element = this.buildSection(url);
    document.body.appendChild(element);
  }

  /**
   *
   * @param {string} url de l'image ou video
   * @return {HTMLElement}
   */
  buildSection(url) {
    const section = document.createElement("section");
    section.classList.add("lightbox");
    section.setAttribute("aria-label", "lightbox gallery");
    section.innerHTML = `<div class="lightbox__container">
                            <button class="lightbox__container--close">fermer</button>
                            <button class="lightbox__container--left">précédent</button>
                            <button class="lightbox__container--right">suivant</button>
                            <img
                              src="${url}"
                                alt=""
                              />
                          </div>`;
    return section;
  }
}

/**
 *  
 * <section class="lightbox" aria-label="lightbox gallery">
        <div class="lightbox__container">
          <button class="lightbox__container--close">fermer</button>
          <button class="lightbox__container--left">précédent</button>
          <button class="lightbox__container--right">suivant</button>
          <img
            src="./media/artistsPictures/Architecture_Connected_Curves.jpg"
            alt=""
          />
        </div>
      </section>
 */

lightbox.init();
