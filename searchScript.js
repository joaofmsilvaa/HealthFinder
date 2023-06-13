let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (event) {
  // Faz com que o botão de submit do formulário não dê refresh
  event.preventDefault();

  // Obtém o valor do input de localização
  let searchInput = document.getElementById("locationInput");
  let location = searchInput.value.trim();

  // Obtém os dados do ficheiro places.json
  fetch("places.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showInfo(data, location);
    });
});


function showInfo(data, location) {
  let place = document.getElementById("searchInput").value.toLowerCase();

  if (place === "hospitais") {
    // Filtra os hospitais com a localização indicada
    let hospitals = data.hospitais.filter(function (hospital) {
      return hospital.localizacao.toLowerCase() === location.toLowerCase();
    });

    // Apresenta a quantidade de resultados na localização dada
    let resultsContainer = document.querySelector(".card-container");
    resultsContainer.innerHTML = "<h2 class='ammountOfResults d-flex justify-content-center align-items-center'>" + hospitals.length + " resultados em " + location + "</h2>";

    if (hospitals.length > 0) {
      hospitals.forEach(function (hospital) {
        // Armazena o texto com o horário e o número de telefone nas variáveis
        let horario = hospital.horario ? `<p class="card-text">Horário: ${hospital.horario}</p>` : '';
        let telefone = hospital.telefone ? `<p class="card-text">Telefone: ${hospital.telefone}</p>` : '';
        let endereco = hospital.endereco ? `<pclass="card-text">Endereço: ${hospital.endereco}</p>` : '';


        // Armazena o card na variável hospitalCard
        let hospitalCard = `
          <div class="col-md-4 d-flex justify-content-center align-items-center p-5">
            <div class="card justify-content-center align-items-center">
              <img src="${hospital.image}" class="card-image" alt="Hospital Image">
              <div class="card-body">
                <h5 class="card-title">${hospital.nome}</h5>
                <p class="card-text">${hospital.localizacao}</p>
                ${horario}
                ${telefone}
                ${endereco}
              </div>
            </div>
          </div>
        `;

        // Adiciona o card ao HTML da div dos resultados
        resultsContainer.innerHTML += hospitalCard;
      });
    }
  } else if (place === "farmacias") {
    // Filtra as farmácias com a localização indicada
    let pharmacies = data.farmacias.filter(function (pharmacy) {
      return pharmacy.localizacao.toLowerCase() === location.toLowerCase();
    });

    // Apresenta a quantidade de resultados na localização dada
    let resultsContainer = document.querySelector(".card-container");
    resultsContainer.innerHTML = "<h2 class='ammountOfResults d-flex justify-content-center align-items-center'>" + pharmacies.length + " resultados em " + location + "</h2>";

    if (pharmacies.length > 0) {
      pharmacies.forEach(function (pharmacy) {
        // Armazena o texto com o horário e o número de telefone nas variáveis
        let horario = pharmacy.horario ? `<p class="card-text">Horário: ${pharmacy.horario}</p>` : '';
        let telefone = pharmacy.telefone ? `<p class="card-text">Telefone: ${pharmacy.telefone}</p>` : '';
        let endereco = pharmacy.endereco ? `<pclass="card-text">Endereço: ${pharmacy.endereco}</p>` : '';


        // Armazena o card na variável pharmacyCard
        let pharmacyCard = `
          <div class="col-md-4 d-flex justify-content-center align-items-center">
            <div class="card justify-content-center align-items-center">
              <img src="${pharmacy.image}" class="card-image justify-content-center align-items-center" alt="Pharmacy Image">
              <div class="card-body">
                <h5 class="card-title">${pharmacy.nome}</h5>
                <p class="card-text">${pharmacy.localizacao}</p>
                ${horario}
                ${telefone}
                ${endereco}
              </div>
            </div>
          </div>
        `;

        // Adiciona o card ao HTML da div dos resultados
        resultsContainer.innerHTML += pharmacyCard;
      });
    }
  } 
  
  else if(place == "centros-de-saude"){
    // Filtra os centros de saúde com a localização indicada
    let healthCenters = data.centros.filter(function (center) {
      return center.localizacao.toLowerCase() === location.toLowerCase();
    });


    // Apresenta a quantidade de resultados na localização dada
    let resultsContainer = document.querySelector(".card-container");
    resultsContainer.innerHTML = "<h2 class='ammountOfResults d-flex justify-content-center align-items-center'>" + healthCenters.length + " resultados em " + location + "</h2>";

    if (healthCenters.length > 0) {
      healthCenters.forEach(function (center) {
        // Armazena o texto com o horário e o número de telefone nas variáveis
        let horario = center.horario ? `<p class="card-text">Horário: ${center.horario}</p>` : '';
        let telefone = center.telefone ? `<p class="card-text">Telefone: ${center.telefone}</p>` : '';
        let endereco = center.endereco ? `<pclass="card-text">Endereço: ${center.endereco}</p>` : '';

        // Armazena o card na variável healthCenterCard
        let healthCenterCard = `
          <div class="col-md-4 d-flex justify-content-center align-items-center">
            <div class="card justify-content-center align-items-center">
              <img src="${center.image}" class="card-image" alt="Health Center Image">
              <div class="card-body">
                <h5 class="card-title">${center.nome}</h5>
                <p class="card-text">${center.localizacao}</p>
                ${horario}
                ${telefone}
                ${endereco}
              </div>
            </div>
          </div>
        `;

        // Adiciona o card ao HTML da div dos resultados
        resultsContainer.innerHTML += healthCenterCard;
      });
    }
  }
  else{
    alert("Insira o que procura");
  }

  // Dá scroll para a secção de resultados
  let resultsSection = document.getElementById("results");
  resultsSection.scrollIntoView({ behavior: "smooth" });

}