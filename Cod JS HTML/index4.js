
var data = JSON.parse(json);
console.log(data);
var campos = Object.keys(data[0]);


/* CRIAR HTML E JUNTAR O <TR> À ARRAY */
var tr = document.createElement('tr');
campos.forEach(function (titulo) {
    var th = document.createElement('th');
    th.innerHTML = titulo;
    tr.appendChild(th);
});
table.appendChild(tr);
data.map(function (pessoa) {
    var tr = document.createElement('tr');
    Object.keys(pessoa).forEach(function (valor) {
        var td = document.createElement('td');
        td.innerHTML = pessoa[valor];
        tr.appendChild(td);
    });
    table.appendChild(tr);
    pessoa.DOM = tr;
    return pessoa;
});

/* PARTE DE FILTRAGENS */
var select = document.querySelector('select');
var input = document.querySelector('input');
var button = document.querySelector('button');
button.addEventListener('click', function () {
    var prop = select.value;
    var val = input.value;
    data.forEach(function (linha) {
        var valor = linha[prop];
        if (valor && linha[prop].indexOf(val) < 0) linha.DOM.classList.add('esconder');
        else linha.DOM.classList.remove('esconder');
    });
});


