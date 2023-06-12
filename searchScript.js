function showInfo(data, location) {
  // Filtra os hospitais com a localização indicada
  let hospitals = data.hospitais.filter(function(hospital) {
    return hospital.localizacao.toLowerCase() === location.toLowerCase();
  });

  // Apresenta a quantidade de resultados na localização dada
  let resultsContainer = document.querySelector(".card-container");
  resultsContainer.innerHTML = "<h2 class='ammountOfResults d-flex justify-content-center align-items-center'>" + hospitals.length + " resultados em "+ location +"</h2>";

  // Se houverem hospitais na localização dada executa este bloco de código
  if (hospitals.length > 0) {
    hospitals.forEach(function(hospital) {
      // Armazena o texto com o horário e o numero de telefone nas variáveis 
      let horario = hospital.horario ? `<p class="card-text">Horário: ${hospital.horario}</p>` : '';
      let telefone = hospital.telefone ? `<p class="card-text">Telefone: ${hospital.telefone}</p>` : '';

      // Armazena o card na variável hospitalCard
      let hospitalCard = `
      <div class="col-md-4 d-flex justify-content-center align-items-center">
        <div class="card" onclick="showHospitalDetails('${hospital.nome}', '${hospital.localizacao}', '${hospital.image}' ,'${hospital.horario}', '${hospital.telefone}')">
          <img src="${hospital.image}" class="card-img" alt="Hospital Image">
          <div class="card-body">
            <h5 class="card-title">${hospital.nome}</h5>
            <p class="card-text">${hospital.localizacao}</p>
            ${horario}
            ${telefone}
          </div>
        </div>
      </div>
      `;

      // Adiciona o card ao html da div dos resultados
      resultsContainer.innerHTML += hospitalCard;
    });
  } 
  // Se não apresenta uma mensagem a dizer que não foram encontrados resultados na localização dada
  else {
    let noResultsMessage = `
      <div class="col-md-4 d-flex justify-content-center align-items-center">
        <h2>Nada foi encontrado em "${location}" :(</h2>
      </div>
    `;

    // Adiciona a mensagem à div dos resultados
    resultsContainer.innerHTML = noResultsMessage;
  }

  // Dá scroll para a secção de resultados
  let resultsSection = document.getElementById("results");
  resultsSection.scrollIntoView({ behavior: "smooth" });

  // Mostra os resultados dos hospitais
  showResults();
}

function showResults() {
  document.querySelector(".card-container").style.display = "flex";
  document.getElementById("hospitalDetails").style.display = "none";
}

function showHospitalDetails(nome, localizacao, image, horario, telefone) {
  let hospitalDetails = document.getElementById("hospitalDetails");

  // Insere os dados do hospital nos sítios certos
  document.getElementById("hospitalName").textContent = nome;
  document.getElementById("hospitalLocation").textContent = localizacao;
  document.getElementById("hospitalHorario").textContent = `Horário: ${horario}`;
  document.getElementById("hospitalTelefone").textContent = `Telefone: ${telefone}`;
  document.getElementById("hospitalImage").src = image;

  // "apaga" o container dos cards e apresenta o container dos detalhes
  document.querySelector(".card-container").style.display = "none";
  hospitalDetails.style.display = "block";
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function(event) {
  // Faz com que o botão de submit do formulário não dê refresh
  event.preventDefault();

  // Obtém o valor do input de localização
  let searchInput = document.getElementById("locationInput");
  let location = searchInput.value.trim();

  // Obtem os dados do ficheiro places.json
  fetch("places.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showInfo(data, location);
    });
});