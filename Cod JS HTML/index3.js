import {getDatabase} from "firebase/database";
const database = getDatabase()

var filter = object.key(json[0]);
var select = document.getElementById("filters");

for (var i = 0; i < filters.length; i++) {
    var opt = document.createElement("option");
    opt.text = filters[i];
    opt.value = filters[i];
    
    select.appendChild(opt);
}

var query = document.getElementById("query");

document.getElementById("filter").onclick = function() {
    var result = json.filter(function(item) {
        return item[select.value] == query.value;
    });
    
    console.clear();
    console.log(result);
};