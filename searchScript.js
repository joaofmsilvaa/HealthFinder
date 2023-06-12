function showInfo(data, location) {
  let hospitals = data.hospitais.filter(function(hospital) {
    return hospital.localizacao.toLowerCase() === location.toLowerCase();
  });

  let resultsContainer = document.querySelector(".card-container");
  resultsContainer.innerHTML = "<h2 class='ammountOfResults d-flex justify-content-center align-items-center'>" + hospitals.length + " resultados</h2>";

  if (hospitals.length > 0) {
    hospitals.forEach(function(hospital) {
      let hospitalCard = `
        <div class="col-md-4 d-flex justify-content-center align-items-center">
          <div class="card">
            <img src="${hospital.image}" class="card-img-top" alt="Hospital Image">
            <div class="card-body">
              <h5 class="card-title">${hospital.nome}</h5>
              <p class="card-text">${hospital.localizacao}</p>
            </div>
          </div>
        </div>
      `;

      resultsContainer.innerHTML += hospitalCard;
    });
  } else {
    let noResultsMessage = `
      <div class="col-md-4 d-flex justify-content-center align-items-center">
        <p>Não foram encontrados hospitais em "${location}" :/</p>
      </div>
    `;
    resultsContainer.innerHTML = noResultsMessage;
  }

  let resultsSection = document.getElementById("results");
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let searchInput = document.getElementById("locationInput");
  let location = searchInput.value.trim();

  fetch("places.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showInfo(data, location);
    });
});
