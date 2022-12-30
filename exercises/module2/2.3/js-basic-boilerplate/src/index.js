import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const button = document.querySelector("form");

button.addEventListener('submit', (e) => {
    e.preventDefault();
    const lines = document.getElementById("lines").value;
    const columns = document.getElementById("columns").value;
    const string = document.getElementById("string").value;
    const array = createArray(lines,columns,string);
    const arrayAsHtml = createHtmlTableAsString(array);
    document.querySelector("#tableDisplay").innerHTML = '';
    document.querySelector("#tableDisplay").appendChild(arrayAsHtml);
})



function createArray(lines, columns, string){
    const array = [];
    for (let i = 0; i < lines; i += 1) {
        array.push([]);
        for(let j = 0; j < columns; j += 1){
            array[i].push(`${string}[${i}][${j}]`);
        }
    }
    return array;
}

function createHtmlTableAsString(array){
    const table = document.createElement("table");
    table.className = "table table-bordered";
    const tbody = document.createElement("tbody");
    array.forEach(element => {
        const trElement = document.createElement("tr");
        element.forEach(subElement => {
            const thElement = document.createElement("th");
            thElement.innerText = subElement;
            trElement.appendChild(thElement);
        });
        tbody.appendChild(trElement);
    });
    table.appendChild(tbody);
    return table;
}




