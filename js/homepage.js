// Javascript index of photograph

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const newCards = () => {
      for (let i = 0; i < phData.photographers.length; i += 1) {
        const newArticle = document.createElement("article");
        const mainSection = document.getElementsByTagName("main");
        mainSection[0].appendChild(newArticle);

        newArticle.setAttribute("class", "photograph__card");
        newArticle.setAttribute("id", "photographer");
        newArticle.innerHTML = `<a href="./photographerPage.html?dataph=${phData.photographers[i].id}"
                                    class="photograph__card--link">
                                    <img src="media/PhotographersIDPhotos/${phData.photographers[i].portrait}"
                                    alt="Portrait représentant:  ${phData.photographers[i].name}"
                                    class="artist-pict">
                                    <h2>${phData.photographers[i].name}</h2></a>
                                    <aside class="photograph__card--txt">
                                    <strong>${phData.photographers[i].city}/${phData.photographers[i].country}</strong>
                                    <p>${phData.photographers[i].tagline}</p>
                                    <span>${phData.photographers[i].price}€/jour</span>
                                    <ul class="tagBox"></ul></aside>`;

        const tagsData = phData.photographers[i].tags;
        for (let t = 0; t < tagsData.length; t += 1) {
          const ulTagBox = document.getElementsByClassName("tagBox");
          const liTagElt = document.createElement("li");
          ulTagBox[i].appendChild(liTagElt);
          liTagElt.setAttribute("class", "tag-linked");
          liTagElt.innerHTML = `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a> `;
        }
      }
    };
    newCards();
  });
