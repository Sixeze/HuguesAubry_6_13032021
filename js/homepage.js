// Javascript index of photograph
fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    // Get data from json
    const artistData = phData.photographers;

    // DOM elements
    const divToGoingTop = document.querySelector("#goToTop");
    const mainSection = document.getElementsByTagName("main");
    const mainContainerCards = document.createElement("div");

    // appear element to return top when scroll page
    const gotoTopAppearElement = () => {
      divToGoingTop.innerHTML = `<div class="invisible-link">
                                  <a href="#main">Passer au contenu</a>
                                </div>`;

      window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
          divToGoingTop.style.display = "block";
          divToGoingTop.setAttribute("aria-hidden", "false");
        } else {
          divToGoingTop.style.display = "none";
          divToGoingTop.setAttribute("aria-hidden", "true");
        }
      });
    };

    // create a prototype array for include or remove tagSelected when is clicked
    let arrayWithOnlyTagsSelected = [];

    const refreshPhotographerCards = (...args) => {
      // remove cards if has not selected
      while (mainContainerCards.firstChild) {
        mainContainerCards.removeChild(mainContainerCards.firstChild);
      }

      // native show cards
      mainContainerCards.classList.add("photograph");
      mainSection[0].appendChild(mainContainerCards);
      for (let i in args) {
        let newArticle = document.createElement("article");

        mainContainerCards.appendChild(newArticle);

        newArticle.classList.add("photograph__card");
        newArticle.innerHTML += `<a href="./photographerPage.html?dataph=${args[i].id}"
                                    class="photograph__card--link">
                                    <img src="media/PhotographersIDPhotos/${args[i].portrait}"
                                    alt="Portrait de ${args[i].name}"
                                    class="artist-pict">
                                    <h2 aria-hidden="true">${args[i].name}</h2></a>
                                    <aside class="photograph__card--txt">
                                    <strong>${args[i].city}, ${args[i].country}</strong>
                                    <p>${args[i].tagline}</p>
                                    <span>${args[i].price}€/jour</span>
                                    <ul class="tagBox"></ul></aside>`;

        const tagsData = args[i].tags;
        for (let t in tagsData) {
          const ulTagBox = document.getElementsByClassName("tagBox");
          const liTagElt = document.createElement("li");
          ulTagBox[i].appendChild(liTagElt);
          liTagElt.classList.add("tag-linked");
          // change color for li selected
          if (arrayWithOnlyTagsSelected.includes(tagsData[t])) {
            liTagElt.classList.add("active");
          }
          liTagElt.innerHTML += `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a>
                                <span class="sr-only">${tagsData[t]}</span>`;
        }
      }
    };

    const showNavTagsElt = () => {
      // create html collection <ul> with id
      let navBar = document.getElementsByTagName("nav")[0];
      let ulTagElt = document.createElement("ul");
      ulTagElt.setAttribute("id", "tags");
      navBar.appendChild(ulTagElt);

      // create a new array with all <tags>
      let navTagsArray = [];

      for (let p in artistData) {
        for (let t in artistData[p].tags) {
          navTagsArray.push(artistData[p].tags[t]);
        }
      }

      //create new array with only one off choise for create li.link-tag
      let uniqueTags = navTagsArray.filter(
        (value, index, self) => self.indexOf(value) === index
      );

      // show content <li>
      for (let u in uniqueTags) {
        let htmlLiTagElts = `<li class="link-tag"><a class="a-link" href="#" title="${uniqueTags[u]}" >#${uniqueTags[u]}</a>
                              <span class="sr-only">${uniqueTags[u]}</span>
                          </li>`;
        ulTagElt.innerHTML += htmlLiTagElts;
      }

      // when click on tag show cards with tagSelected
      const aTagElts = document.querySelectorAll("a.a-link");
      aTagElts.forEach((aTagElt) => {
        aTagElt.addEventListener("click", function (e) {
          e.preventDefault();

          // recover element string on event
          let tagSelected =
            window.event.target.textContent.replace("#", "") ||
            window.event.target.innerText.replace("#", "");
          console.log(tagSelected);

          // if not include "tag", push it prototype array, else remove same element
          if (arrayWithOnlyTagsSelected.includes(tagSelected)) {
            arrayWithOnlyTagsSelected = arrayWithOnlyTagsSelected.filter(
              (item) => item != tagSelected
            );
            console.log("filter");
            aTagElt.parentElement.classList.remove("active");
          } else {
            arrayWithOnlyTagsSelected.push(tagSelected);
            console.log("push");
            aTagElt.parentElement.classList.add("active");
          }
          console.log(arrayWithOnlyTagsSelected);

          // create a new array for each arrayWithOnlyTagsSelected[tagSelected], with only artistCard with tagSelected
          let newArtistDatas = [];

          // if prototype array empty show all cards
          if (arrayWithOnlyTagsSelected.length == 0) {
            newArtistDatas = artistData;
          } else {
            // if tagSelected is click show newArtistDatas elements
            for (let a in artistData) {
              let cardWithAllTags = true;

              arrayWithOnlyTagsSelected.forEach((element) => {
                // for each elts of proto array, check if not include elts
                if (!artistData[a].tags.includes(element)) {
                  // if not include else photographer haven't tag seclected so remove artist card
                  cardWithAllTags = false;
                }
              });
              if (cardWithAllTags) {
                // if artist have all tags add show card
                newArtistDatas.push(artistData[a]);
              }
            }
          }

          refreshPhotographerCards(...newArtistDatas);
        });
      });
    };
    gotoTopAppearElement();
    showNavTagsElt();
    refreshPhotographerCards(...artistData);
  });
