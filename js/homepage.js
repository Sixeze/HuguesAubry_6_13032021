// Javascript index of photograph

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const artistData = phData.photographers;
    // console.log(artistData);

    const createPhotographerCards = () => {
      const mainSection = document.getElementsByTagName("main");
      const mainContainerCards = document.createElement("div");
      mainContainerCards.classList.add("photograph");
      mainSection[0].appendChild(mainContainerCards);
      for (let i in artistData) {
        const newArticle = document.createElement("article");

        mainContainerCards.appendChild(newArticle);

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
          liTagElt.classList.remove("active");
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
      // console.log("console log de mediaTags " + mediaTags);

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

      let tagsArraySelected = [];

      aTagElts.forEach((aTagElt) => {
        aTagElt.addEventListener("click", function (e) {
          e.preventDefault();
          mainSection.style.display = "none";
          sectionTags.style.display = "block";

          // recover element string on event
          let tagSelected =
            window.event.target.textContent || window.event.target.innerText;
          console.log(tagSelected);
          if (tagsArraySelected.includes(tagSelected)) {
            tagsArraySelected = tagsArraySelected.filter(
              (item) => item != tagSelected
            );
            aTagElt.parentElement.classList.remove("active");
          } else {
            tagsArraySelected.push(tagSelected);

            aTagElt.parentElement.classList.add("active");
          }

          // if (tagsData[t] == tagSelected) {
          //   liTagElt.classList.add("active");
          // }

          console.log(tagsArraySelected);

          const newPhotographerCards = () => {
            containerCards.classList.add("container");
            sectionTags.appendChild(containerCards);

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
                liTagElt.classList.add("tag-linked");
                if (tagsData[t] == tagSelected) {
                  liTagElt.classList.add("active");
                }
                liTagElt.innerHTML = `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a> `;
              }
            }
          };

          // create a new array for each tagSelected, with only artists then tag
          let newArtistDatas = [];

          //if no tagSelected show artistData = main.createPhotographerCards
          if (tagsArraySelected.length == 0) {
            newArtistDatas = artistData;
          } else {
            // if tagSelected show NewArtistData = section.newPhotographerCards()
            for (let artist in artistData) {
              for (let tagList in artistData[artist].tags) {
                if (
                  tagsArraySelected.includes(artistData[artist].tags[tagList])
                ) {
                  if (!newArtistDatas.includes(artistData[artist]))
                    newArtistDatas.push(artistData[artist]);

                  console.log(artistData[artist]);
                }
              }
            }
          }
          while (containerCards.firstChild) {
            containerCards.removeChild(containerCards.firstChild);
          }
          newPhotographerCards();
          // create a new Photographer Cards for show tagSelected

          // if (mainSection.style.display == "block") {
          //   mainSection.style.display = "none";
          //   sectionTags.style.display = "block";

          //   newPhotographerCards();
          // } else if (sectionTags.style.display == "block") {
          //   mainSection.style.display = "none";
          //   while (containerCards.firstChild) {
          //     containerCards.removeChild(containerCards.firstChild);
          //   }
          //   newPhotographerCards();
          // } else {
          //   mainSection.style.display = "block";
          //   sectionTags.style.display = "none";

          //   aTagElt.parentElement.classList.remove("active");
          // }
        });
        // aTagElt.addEventListener("dblclick", function () {
        //   sectionTags.style.display = "none";
        //   mainSection.style.display = "block";

        //   // aTagElts.forEach((otherATagElt) =>
        //   //   otherATagElt.parentElement.classList.remove("active")
        //   // );
        //   aTagElt.parentElement.classList.remove("active");
        // });
      });
    };

    createPhotographerCards();
    filterByTag();
  });
