//document.getElementById("getEventos").addEventListener("click", getEventos);
document.getElementById("addEvento").addEventListener("submit", postEvento);
document.getElementById("addConvidado").addEventListener("click", addConvidado);
let convidados = [];
getEventos();

function addConvidado() {
  let c = document.getElementById("convidados").value;
  let r = true;

  convidados.forEach(convidado => {
    if (convidado.nome == c) {
      r = false;
    }
  });

  if (c !== "" && c !== null) {
    if (r) {
      convidados.push({ nome: c });
      carregaLista(convidados);
      document.getElementById("convidados").value = "";
    } else {
      alert("Usuário Repetido");
    }
  } else {
    alert("Nome do usuário vazio");
  }
}
function carregaLista(convidados) {
  let outputC = "";
  convidados.forEach(function(convidado) {
    outputC += `<li>${convidado.nome}</li>`;
  });
  document.getElementById("listaConvidados").innerHTML = outputC;
}

function deleteEvento(id) {
  fetch(`http://localhost:8080/api/eventos/${id}`, {
    method: "DELETE"
  }).then(getEventos);
}

function postEvento(e) {
  e.preventDefault();
  let nome = document.getElementById("eventoNome").value;
  let local = document.getElementById("local").value;

  fetch("http://localhost:8080/api/eventos", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json"
    },
    body: JSON.stringify({ nome: nome, convidados: convidados, local: local })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(getEventos)
    .then(clearForm);
}

function updateEvento(e, id) {
  e.preventDefault();
  let nome = document.getElementById("eventoNome").value;
  let local = document.getElementById("local").value;

  fetch(`http://localhost:8080/api/eventos/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json"
    },
    body: JSON.stringify({ nome: nome, convidados: convidados, local: local })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(getEventos)
    .then(clearForm);
}

function clearForm() {
  document.getElementById("eventoNome").value = "";
  document.getElementById("convidados").value = "";
  document.getElementById("local").value = "";
}

function getEventos() {
  fetch("http://localhost:8080/api/eventos")
    .then(res => res.json())
    .then(eventos => {
      let output =
        "<tr><td>ID</td><td>NOME</td><td>CONVIDADOS</td><td>LOCAL</td></tr>";

      eventos.forEach(function(evento) {
        let outputConvidados = "";
        id = evento.id;
        evento.convidados.forEach(function(convidado) {
          outputConvidados += `<li>${convidado.nome}</li>`;
        });
        output += `
        <tr id="evento_${evento.id}">
          <td id="id_${evento.id}">${evento.id}</td>
          <td id="nome_${evento.id}">${evento.nome}</td>
          <td id="convidados_${evento.id}"><ul>${outputConvidados}</ul></td>
          <td id="local_${evento.id}">${evento.local}</td>
          <td><button onclick="deleteEvento(${id})">Excluir</button></td>
        </tr>
      `;
      });
      document.getElementById("outputEventos").innerHTML = output;
    });
}
