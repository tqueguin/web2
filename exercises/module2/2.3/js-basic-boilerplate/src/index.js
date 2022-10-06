import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const button = document.querySelector("button");

button.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector("main").style.backgroundColor="red";
})


/*
function createArray(lines, columns, string) {
    const array = [];
    for (let i = 0; i < lines; i += 1) {
        array.push([]);
        for(let j = 0; j < columns; j += 1){
            array[i].push(`${string}[${i}][${j}]`);
        }

    }
    return array;
}

function createHtmlTableAsString(){

}

const tableDisplay = document.querySelector(".tableDisplay");



*/