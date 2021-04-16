// HTML element get for construct
const navBar = document.getElementsByTagName("nav")[0];

fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    const artistData = phData.photographers;
    // console.table(artistData);

    const tags = [];
    artistData.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        tags.push(tag);
      });
    });

    const ulTagElt = document.createElement("ul");
    ulTagElt.setAttribute("id", "tags");
    navBar.appendChild(ulTagElt);

    const arrayTag = new Set(tags);
    const tagsArray = Array.from(arrayTag);
    for (let t = 0; t < tagsArray.length; t += 1) {
      // console.table(tagsArray[t]);

      const liTagElt = document.createElement("li");
      ulTagElt.appendChild(liTagElt);
      liTagElt.setAttribute("class", "link-tag");
      liTagElt.innerHTML = `<a href="#" title="${tagsArray[t]}" >#${tagsArray[t]}</a> `;
    }

    const mainPhElt = document.getElementsByClassName("main photograph");
    console.log(mainPhElt);
  });
// .catch((error) => console.log("Erreur : " + error))
