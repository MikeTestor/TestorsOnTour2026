const tours = [
  {
    id: 1,
    tag: 0,
    datum: "Mittwoch, 1. Juli",
    tour: "Ankunft in der Pension Alpina",
    info: "Abends Ankunft. Sylvia und Rini kommen mit dem Zug. Ankuft um 19:00 am Innsbrucker Hauptbahnhof. Mike und Peter kommen mit dem Auto. Marijke schläft in ihrem Kinderzimmer in der Wolkensteinstraße :-).",
    image: "Data/images/Day0.webp",
    link: "https://www.cafe-pension-alpina.at/",
  },
  {
    id: 2,
    tag: 1,
    datum: "Donnerstag, 2. Juli",
    tour: "Tag 1: Hafelekarhaus – Mandlscharte – Pfeishütte",
    info: "Frühstück bis 9:30 Uhr und dann geht es los. Wir fahren mit der Nordkettenbahn auf das Hafelekarhaus und wandern dann über die Mandlscharte zur Pfeishütte.\nCousin Roland ist unser Spezialgast!",
    image: "Data/images/Day1.jpg",
    link: "https://www.almenrausch.at/touren/detail/tag-1-hafelekarhaus-mandlscharte-pfeishuette/",
  },
  {
    id: 3,
    tag: 2,
    datum: "Freitag, 3. Juli",
    tour: "Tag 2: Pfeishütte – Stempeljoch – Lafatscherjoch – Bettelwurfhütte",
    info: "Hatschen hatschen hatschen",
    image: "Data/images/Day2.jpg",
    link: "https://www.almenrausch.at/touren/detail/tag-2-pfeishuette-stempeljoch-lafatscherjoch-bettelwurfhuette/",
  },
  {
    id: 4,
    tag: 3,
    datum: "Samstag, 4. Juli",
    tour: "Tag 3: Bettelwurfhütte – Lafatscherjoch – Halleranger Alm",
    info: "Nicht wie die Orginaltour zum Hallerangerhaus, sondern zur Halleranger Alm wo wir übernachten.",
    image: "Data/images/Day3.jpg",
    link: "https://www.almenrausch.at/touren/detail/tag-3-bettelwurfhuette-lafatscherjoch-hallerangerhaus/",
  },
  {
    id: 5,
    tag: 4,
    datum: "Sonntag, 5. Juli",
    tour: "Tag 4: Hallerangerhaus – Kastenalm – Scharnitz",
    info: "Von Scharniz geht es mit dem Zug zurück nach Innsbruck. Die letzte Nacht verbringen wir wieder in der Pension Alpina. am nächsten Tag geht es dann wieder nach Hause.",
    image: "Data/images/Day4.jpg",
    link: "https://www.almenrausch.at/touren/detail/tag-4-hallerangerhaus-kastenalm-scharnitz/",
  },
];

let activeId = null;

function renderCards() {
  const list = document.getElementById("tourList");
  list.innerHTML = "";
  tours.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card" + (t.id === activeId ? " active" : "");
    card.innerHTML = `
      <div class="card-info">
        <span class="card-value card-date">${t.datum}</span>
        <span class="card-value">${t.tour}</span>
      </div>
      <div class="card-action">
        <button class="btn-view" data-id="${t.id}" title="View details">View</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll(".btn-view").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      showDetail(parseInt(e.target.dataset.id));
    });
  });
}

function showDetail(id) {
  activeId = id;
  const tour = tours.find((t) => t.id === id);

  const content = document.getElementById("detailContent");
  content.classList.add("visible");
  content.classList.remove("is-default");

  const imgWrap = document.getElementById("detailImageWrap");
  if (tour.image) {
    imgWrap.innerHTML = `<img class="detail-image" src="${tour.image}" alt="${tour.tour}" />`;
  } else {
    imgWrap.innerHTML = `<div class="detail-image-placeholder">[ Bild folgt ]</div>`;
  }

  document.getElementById("detailName").textContent = tour.tour;
  document.getElementById("detailDate").textContent = tour.datum;

  const linkWrap = document.getElementById("detailLinkWrap");
  if (tour.link) {
    linkWrap.innerHTML = `<a class="btn-link" href="${tour.link}" target="_blank" rel="noopener noreferrer">Open Tour Website ↗</a>`;
  } else {
    linkWrap.innerHTML = "";
  }

  document.getElementById("detailSideText").textContent = tour.info;

  renderCards();

  if (window.innerWidth <= 640) {
    document.querySelector(".main-right").scrollIntoView({ behavior: "smooth" });
  }
}

renderCards();

function matchPanelHeights() {
  const right = document.querySelector(".main-right");
  if (window.innerWidth <= 640) {
    right.style.height = "";
    return;
  }
  const tourList = document.getElementById("tourList");
  right.style.height = tourList.offsetHeight + "px";
}

window.addEventListener("load", matchPanelHeights);
window.addEventListener("resize", matchPanelHeights);
