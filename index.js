console.log("Script Loaded");
let iFrame = document.getElementById("video-player-frame");
let rightDivWrapper = document.getElementById("right-div");

let createVideoPlayer = (pos) => {
  let xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://5d76bf96515d1a0014085cf9.mockapi.io/video/" + pos,
    true
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let rawData = JSON.parse(this.responseText);
      iFrame.src = `https://player.vimeo.com/video/${rawData.vimeoId}`;
      document.getElementById("views-text").innerHTML =
        rawData.views + " views";
      document.getElementById("video-title").innerHTML = rawData.title;
      document.getElementById("video-desc").innerHTML = rawData.description;
    }
  };
  xhttp.send();
};

createVideoPlayer(1);

let makeBorder = (pos) => {
  let cardsList = document.getElementsByClassName("item-cards-wrapper");
  // cardsList[pos].classList.add("item-cards-wrapper-border");
  for (let i = 0; i < cardsList.length; i++) {
    if (pos === i) {
      cardsList[i].classList.add("item-cards-wrapper-border");
    } else {
      cardsList[i].classList.remove("item-cards-wrapper-border");
    }
  }
};

let removeBorder = (pos) => {};

let createCards = (src, heading, pos) => {
  let image = document.createElement("img");
  image.className = "item-img";
  image.src = src;
  let cardHeading = document.createElement("h3");
  cardHeading.className = "item-heading";
  cardHeading.innerHTML = heading;
  let cardsWrapper = document.createElement("div");
  cardsWrapper.className = "item-cards-wrapper";
  cardsWrapper.appendChild(image);
  cardsWrapper.appendChild(cardHeading);
  rightDivWrapper.appendChild(cardsWrapper);
  makeBorder(0);
  cardsWrapper.addEventListener("click", () => {
    createVideoPlayer(pos + 1);
    makeBorder(pos);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
};

let loadCardsDynamically = () => {
  let http = new XMLHttpRequest();
  http.open(
    "GET",
    "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist",
    true
  );
  http.onreadystatechange = function () {
    if (this.readyState === 4) {
      let rawData = JSON.parse(this.responseText);
      if (rawData.length > 0) {
        console.log("Data received", rawData);
        rawData.map((item, pos) => {
          createCards(item.thumbnail, item.title, pos);
        });
      }
    }
  };
  http.send();
};

loadCardsDynamically();
