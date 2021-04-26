// Javascript index of photograph

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const artistData = phData.photographers;
    console.log(artistData);

    const createPhotographerCards = () => {
      for (let i in artistData) {
        const newArticle = document.createElement("article");
        const mainSection = document.getElementsByTagName("main");
        mainSection[0].appendChild(newArticle);

        newArticle.classList.add("photograph__card");
        newArticle.setAttribute("id", "photographer");
        newArticle.innerHTML += `<a href="./photographerPage.html?dataph=${artistData[i].id}"
                                    class="photograph__card--link">
                                    <img src="media/PhotographersIDPhotos/${artistData[i].portrait}"
                                    alt="Portrait représentant:  ${artistData[i].name}"
                                    class="artist-pict">
                                    <h2>${artistData[i].name}</h2></a>
                                    <aside class="photograph__card--txt">
                                    <strong>${artistData[i].city}/${artistData[i].country}</strong>
                                    <p>${artistData[i].tagline}</p>
                                    <span>${artistData[i].price}€/jour</span>
                                    <ul class="tagBox"></ul></aside>`;

        const tagsData = artistData[i].tags;
        for (let t in tagsData) {
          const ulTagBox = document.getElementsByClassName("tagBox");
          const liTagElt = document.createElement("li");
          ulTagBox[i].appendChild(liTagElt);
          liTagElt.classList.add("tag-linked");
          liTagElt.innerHTML += `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a>
                                <span class="sr-only">${tagsData[t]}</span>`;
        }
      }
    };

    const filterByTag = () => {
      // create html collection <ul> with id
      let navBar = document.getElementsByTagName("nav")[0];
      const ulTagElt = document.createElement("ul");
      ulTagElt.setAttribute("id", "tags");
      navBar.appendChild(ulTagElt);

      // create a new array with all <tags>
      const mediaTags = [];

      for (let p in artistData) {
        for (let t in artistData[p].tags) {
          mediaTags.push(artistData[p].tags[t]);
        }
      }
      console.log("console log de mediaTags " + mediaTags);

      //create new array with only one off choise for create li.link-tag
      let uniqueTags = mediaTags.filter(
        (value, index, self) => self.indexOf(value) === index
      );
      // console.log("console log de uniqueTags " + uniqueTags);

      let htmlLiTagElts = "";

      for (let u in uniqueTags) {
        htmlLiTagElts += `<li class="link-tag">#<a class="a-link" href="#" title="${uniqueTags[u]}" >${uniqueTags[u]}</a>
                              <span class="sr-only">${uniqueTags[u]}</span>
                          </li>`;
      }

      ulTagElt.innerHTML = htmlLiTagElts;

      // const linkTags = document.querySelectorAll("li.link-tag");
      const aTagElts = document.querySelectorAll("a.a-link");
      const sectionTags = document.getElementById("cards-select");
      const mainSection = document.querySelector("main.main");
      const containerCards = document.createElement("div");

      // console.log(aTagElts);
      aTagElts.forEach((aTagElt) => {
        aTagElt.addEventListener("click", function () {
          mainSection.style.display = "none";
          sectionTags.style.display = "block";

          aTagElts.forEach((otherATagElt) =>
            otherATagElt.parentElement.classList.remove("active")
          );
          aTagElt.parentElement.classList.add("active");

          // recover element string on event

          const tagTarget = window.event.target;
          console.log(window.event);
          console.log(window.event.target);

          let tagSelected = tagTarget.textContent || tagTarget.innerText;
          console.log(tagSelected);

          // create a new array for each tagSelected, with only artists then tag
          const newArtistDatas = [];
          for (let artist in artistData) {
            for (let tagList in artistData[artist].tags) {
              if (artistData[artist].tags[tagList] == tagSelected) {
                newArtistDatas.push(artistData[artist]);
              }
            }
          }
          // console.log(newArtistData);

          const newPhotographerCards = () => {
            containerCards.classList.add("container");
            sectionTags.appendChild(containerCards);

            while (containerCards.firstChild) {
              containerCards.removeChild(containerCards.firstChild);
            }

            for (let i in newArtistDatas) {
              const newArticle = document.createElement("article");
              containerCards.appendChild(newArticle);

              newArticle.setAttribute("class", "photograph__card ");
              // newArticle.setAttribute("id", "photographer");
              newArticle.innerHTML = `<a href="./photographerPage.html?dataph=${newArtistDatas[i].id}"
                              class="photograph__card--link">
                              <img src="media/PhotographersIDPhotos/${newArtistDatas[i].portrait}"
                              alt="Portrait représentant:  ${newArtistDatas[i].name}"
                              class="artist-pict">
                              <h2>${newArtistDatas[i].name}</h2></a>
                              <aside class="photograph__card--txt">
                              <strong>${newArtistDatas[i].city}/${newArtistDatas[i].country}</strong>
                              <p>${newArtistDatas[i].tagline}</p>
                              <span>${newArtistDatas[i].price}€/jour</span>
                              <ul class="tagBox"></ul></aside>`;

              // console.log(ulTagBox[i]);

              const tagsData = newArtistDatas[i].tags;
              for (let t = 0; t < tagsData.length; t += 1) {
                const ulTagBox = document.getElementsByClassName("tagBox");
                const liTagElt = document.createElement("li");
                ulTagBox[i].appendChild(liTagElt);
                liTagElt.setAttribute("class", "tag-linked");
                if (tagsData[t] == tagSelected) {
                  liTagElt.classList.add("active");
                }
                liTagElt.innerHTML = `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a> `;
              }
            }
          };
          newPhotographerCards();
        });
      });
    };

    createPhotographerCards();
    filterByTag();
  });
