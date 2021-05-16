// class ImageFactory {
//   constructor(media) {
//     this.src = media.src;
//     this.alt = media.alt;
//     this.tags = media.tags;
//     this.date = media.date;
//     this.type = "image";
//   }

//   createImage(media) {
//     const imageElt = document.createElement("img");
//     imageElt.innerHTML = `src="media/artistsPictures/${media.src}"
//                           alt="${media.alt}"
//                           tag="${media.tags}"
//                           date="${media.date}"
//                           class="artist-cards__picture">`;
//     return imageElt;
//   }
// }

// class VideoFactory {
//   constructor(media) {
//     this.src = media.src;
//     this.alt = media.alt;
//     this.tags = media.tags;
//     this.date = media.date;
//     this.type = "video";
//   }

//   createVideo(media) {
//     const videoElt = document.createElement("video");
//     videoElt.innerHTML = `<source src="media/artistsVideos/${media.src}"
//                                   date="${media.date}"
//                                   tag="${media.tags}"
//                                   alt="${media.alt}">`;
//   }
// }
// console.log(ImageFactory);
// class MediaFactory {
//   constructor(type) {
//     if (type === "image") return new ImageFactory();
//     if (type === "video") return new VideoFactory();
//   }
// }
// new MediaFactory();

// function Factory() {
//   this.displayMedia = function (type) {
//     let videoOrImage;

//     if (type === "image") {
//       videoOrImage = new Image();
//     } else if (type === "video") {
//       videoOrImagee = new Video();
//     }

//     return videoOrImage;
//   };
// }

//  class ImageFactory {
//    constructor() {
//      this.src =
//    }
//  } function (media) {
//    this.videoOrImage = `<img src="${srcFolder}"
//                                           alt="${media.alt}"
//                                           tag="${media.tags}"
//                                           date="${media.date}"
//                                           class="artist-cards__picture"></img>`;
// // };

// //  class Video {
//    constructor() {

//    }
//  } = function () {
//    this.videoOrImage = `<video class="artist-cards__video" preload="metadata">
//                                                 <source src="${srcFolder}"
//                                                 date="${media.date}"
//                                                 tag="${media.tags}"
//                                                 alt="${media.alt}"
//                                                 >
//                                             </video>`;
// };

// var Temporary = function () {
//   this.hourly = "$10";
// };

// var Contractor = function () {
//   this.hourly = "$15";
// };

// // log helper
// var log = (function () {
//   var log = "";

//   return {
//     add: function (msg) {
//       log += msg + "\n";
//     },
//     show: function () {
//       alert(log);
//       log = "";
//     },
//   };
// })();

// function run() {
//   var employees = [];
//   var factory = new Factory();

//   employees.push(factory.createEmployee("fulltime"));
//   employees.push(factory.createEmployee("parttime"));
//   employees.push(factory.createEmployee("temporary"));
//   employees.push(factory.createEmployee("contractor"));

//   for (var i = 0, len = employees.length; i < len; i++) {
//     employees[i].say();
//   }

//   log.show();
// }
