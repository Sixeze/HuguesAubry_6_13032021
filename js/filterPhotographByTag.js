fetch("./js/data.json")
  .then((response) => response.json())
  .then((phData) => {
    for (let i = 0; i < phData.length; i++) {
      console.log(`id de ${phData[i].name} :${phData[i].id}`);

      // for (let m = 0; m < phData.media.length; m++) {
      //   const mediaId = phData.media[i].photographerId;
      //   let numOfId = phId;
      //   if (mediaId == numOfId) {
      //     const mediaCard = phData.media[i];
      //     // console.log(mediaCard);

      //     const likes = mediaCard.likes;
      //     console.log("nombre de likes par media de " + phName + " : " + likes);
      //   }
      // }
    }
  });

// like

//   const arrayForLikes = new Array();
//   const totalForLikes = arrayForLikes.push(likes);
//   console.log("voici le total de likes : " + totalForLikes);

// const params = new URLSearchParams(window.location.search);
// const sortedData = mediaData.filter(
//   (newArray) => newArray.photographerId == params.get("id")
// );
// console.log("tableau filtré :", sortedData);
