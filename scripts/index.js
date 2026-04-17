const searchInput = document.querySelector("input#search");
const searchSubmit = document.querySelector("form#searchSubmit");
const groupCardImagens = document.querySelector("main");
const cardLink = document.querySelector("article a.card-link");
const cardImage = document.querySelector("article img.card-image");
const cardBadge = document.querySelector("article .card-badge");
const cardTitle = document.querySelector("article h2.card-title");
const cardSubtitle = document.querySelector("article p");
const imageCount = document.querySelector("#imageCount");

groupCardImagens.style.display = "none";

async function getImages(event) {
event.preventDefault();

  const query = searchInput.value.trim();
  const defaultQuery = "carros";


  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query) || defaultQuery}`,
      {
        method: "GET",
        headers: {
          Authorization:
           // Substitua pelo valor da sua chave de API do Pexels
            API_KEY,
        },
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.photos && data.photos.length > 0) {
      data.photos.map((photo, index) => {
        while (index > 0) {
          const newCard = document
            .querySelector("article.image-card")
            .cloneNode(true);
          groupCardImagens.appendChild(newCard);
          break;
        }
        imageCount.textContent = data.photos.length;
        groupCardImagens.style.display = "grid";
        cardLink.href = photo.url;
        cardImage.src = photo.src.large;
        cardImage.alt = photo.alt || "Imagem sem descrição";
        cardBadge.textContent = photo.photographer || "Desconecido";
        cardTitle.textContent = photo.alt || "Sem título";
        cardSubtitle.textContent = `Fotógrafo: ${photo.photographer}`;
      });
    }
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    alert("Ocorreu um erro ao buscar imagens. Tente novamente mais tarde.");
  }
}

document.addEventListener("DOMContentLoaded", getImages);
searchSubmit.addEventListener("submit", (event) => {
  const cards = document.querySelectorAll("article.image-card");
  cards.forEach((card, index) => {
    if (index > 0) {
      card.remove();
    }
  }); 
  getImages(event)
});
