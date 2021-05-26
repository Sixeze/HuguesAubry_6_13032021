class ImageFactory {
  constructor(media) {
    Object.assign(this, media);
    this.media = `<img src="media/artistsPictures/${this.image}"
                                        alt="${this.alt}"
                                        tag="${this.tags}"
                                        date="${this.date}"
                                        class="artist-cards__picture">
                                        </img>`;
    this.fileName = this.image;
    this.srcFolder = `media/artistsPictures/${this.fileName}`;
    this.title = this.fileName.replace(".jpg", "").replace(/_/g, " ");
  }
}

class VideoFactory {
  constructor(media) {
    Object.assign(this, media);
    this.media = `<video class="artist-cards__video" preload="metadata">
                                                <source src="media/artistsVideos/${this.video}"
                                                date="${this.date}"
                                                tag="${this.tags}"
                                                alt="${this.alt}">
                                            </video>`;
    this.fileName = this.video;
    this.srcFolder = `media/artistsVideos/${this.fileName}`;
    this.title = this.fileName.replace(/_/g, " ").replace(".mp4", "");
  }
}

class MediaFactory {
  constructor(media) {
    if (media.image != undefined) {
      Object.assign(this, new ImageFactory(media));
    } else if (media.video != undefined) {
      Object.assign(this, new VideoFactory(media));
    }
  }
  show() {
    return `<article aria-label="medias" class="artist-cards">
                        <a href="${this.srcFolder}" title="${this.title}" aria-label="link" aria-haspopup="dialog" aria-controls="dialog">
                                ${this.media}</a>
                        <aside class="artist-cards__information">
                            <h2 class="card-title">${this.title}</h2>
                            <span id="${this.id}" class="card-likeNumbers" change="false" aria-label="like" role="button" tabindex="0">
                                <p class="like">${this.likes}</p>
                                <i class="fas fa-heart red-heart"></i>
                            </span>
                        </aside>
                    </article>`;
  }
}
