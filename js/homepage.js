// Javascript index of photograph

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const artistData = phData.photographers;
    console.log(artistData);
    const newCards = () => {
      for (let i in artistData) {
        const newArticle = document.createElement("article");
        const mainSection = document.getElementsByTagName("main");
        mainSection[0].appendChild(newArticle);

        newArticle.setAttribute("class", "photograph__card");
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
          liTagElt.setAttribute("class", "tag-linked");
          liTagElt.innerHTML += `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a> `;
        }
      }
    };
    newCards();

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
      htmlLiTagElts += `<li class="link-tag">#<a class="a-link" href="#" title="${uniqueTags[u]}" >${uniqueTags[u]}</a></li> `;
    }

    ulTagElt.innerHTML = htmlLiTagElts;

    // const linkTags = document.querySelectorAll("li.link-tag");
    const aTagElts = document.querySelectorAll("a.a-link");
    console.log(aTagElts);
    for (let aTagElt of aTagElts) {
      aTagElt.addEventListener("click", function (e) {
        const sectionTags = document.getElementById("cards-select");
        const mainSection = document.querySelector("main.main");

        mainSection.style.display = "none";
        sectionTags.style.display = "block";

        aTagElt.parentElement.style.backgroundColor = "#901C1C";
        aTagElt.style.color = "#fff";
        console.log(window.event);

        e = e || window.event;
        let target = e.target;

        console.log(target);

        let tagSelected = target.textContent || target.innerText;
        console.log(tagSelected);

        // const tagSelected = "events";

        let newArtistData = [];
        for (let artist in artistData) {
          for (let tagList in artistData[artist].tags) {
            if (artistData[artist].tags[tagList] == tagSelected) {
              newArtistData.push(artistData[artist]);
            }
          }
        }
        console.log(newArtistData);
        const containerCards = document.createElement("div");
        containerCards.classList.add("container");
        sectionTags.appendChild(containerCards);
        for (let i in newArtistData) {
          const newArticle = document.createElement("article");
          containerCards.appendChild(newArticle);
          newArticle.setAttribute("class", "photograph__card ");
          // newArticle.setAttribute("id", "photographer");
          newArticle.innerHTML += `<a href="./photographerPage.html?dataph=${newArtistData[i].id}"
                              class="photograph__card--link">
                              <img src="media/PhotographersIDPhotos/${newArtistData[i].portrait}"
                              alt="Portrait représentant:  ${newArtistData[i].name}"
                              class="artist-pict">
                              <h2>${newArtistData[i].name}</h2></a>
                              <aside class="photograph__card--txt">
                              <strong>${newArtistData[i].city}/${newArtistData[i].country}</strong>
                              <p>${newArtistData[i].tagline}</p>
                              <span>${newArtistData[i].price}€/jour</span>
                              <ul class="tagBox"></ul></aside>`;

          // console.log(ulTagBox[i]);

          const tagsData = newArtistData[i].tags;
          for (let t = 0; t < tagsData.length; t += 1) {
            const ulTagBox = document.getElementsByClassName("tagBox");
            const liTagElt = document.createElement("li");
            ulTagBox[i].appendChild(liTagElt);
            liTagElt.setAttribute("class", "tag-linked");
            liTagElt.innerHTML = `<a href="#" title="${tagsData[t]}" >#${tagsData[t]}</a> `;
            console.log(liTagElt);
          }
        }
      });
    }
  });
