var list = [];

const host = "http://localhost:8080/api/eventos";

function deleteById(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", `http://localhost:8080/api/eventos/` + id, true);
  xhr.onload = function() {
    getAll(host);
  };
  xhr.send(null);
}

function ToList() {
  console.log(list);

  var ver = true;
  list.forEach(convidado => {
    if (convidado.nome == document.getElementById("nome_convidado").value) {
      ver = false;
    }
  });
  if (ver) {
    list.push({ nome: document.getElementById("nome_convidado").value });
    var node = document.createElement("LI");

    var textnode = document.createTextNode(
      document.getElementById("nome_convidado").value
    );
    il = node.appendChild(textnode);
    var btn = document.createElement("button");
    node.appendChild(btn);
    btn.innerHTML = "excluir";
    btn.setAttribute("onclick", "");
    ul = document.getElementById("ulConvidados").appendChild(node);
  } else {
    alert("Nomes repetidos");
  }
}
function verificaUl() {
  if (document.getElementById("ulConvidados").hasChildNodes()) {
    return true;
  } else {
    alert("lista de convidados vazia");
    return false;
  }
}

function postEvento() {
  var evento = {
    nome: document.getElementById("evento").value,
    convidados: list,
    local: document.getElementById("locale").value
  };

  var xhr = new XMLHttpRequest();
  var json = JSON.stringify(evento);
  xhr.open("POST", host, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    getAll();
  };
  xhr.send(json);
}

function getAll(host) {
  var request = new XMLHttpRequest();
  request.open("GET", host, true);
  request.onload = function() {
    // Begin accessing JSON data here
    var eventos = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      var myNode = document.getElementById("eventosTable");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      hrow = myNode.insertRow(0);
      var hcell1 = hrow.insertCell(0);
      var hcell2 = hrow.insertCell(1);
      var hcell3 = hrow.insertCell(2);
      var hcell4 = hrow.insertCell(3);
      hcell1.innerHTML = "ID";
      hcell2.innerHTML = "EVENTO";
      hcell3.innerHTML = "CONVIDADOS";
      hcell4.innerHTML = "LOCAL";
      eventos.forEach(evento => {
        console.log(evento.nome);
        console.log("a");
        var texto = document.createTextNode(evento.nome);
        var table = document.getElementById("eventosTable");
        var btn = document.createElement("button");
        var row = table.insertRow(-1);
        row.setAttribute("id", evento.id);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = evento.id;

        cell2.innerHTML = evento.nome;
        var lul = document.createElement("UL");
        cell3.appendChild(lul);

        evento.convidados.forEach(convidado => {
          var node = document.createElement("LI");
          var textNode = document.createTextNode(convidado.nome);
          var zuc = node.appendChild(textNode);
          cell3.appendChild(zuc);
        });
        cell4.innerHTML = evento.local;
        row.appendChild(btn);
        btn.innerHTML = "excluir";
        btn.setAttribute("onclick", "deleteById(parseInt(parentNode.id));");
      });
    }
  };
  request.send();
}

getAll(host);