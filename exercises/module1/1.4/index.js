const feuHaut = document.querySelector("#feuHaut");
const feuMilieu = document.querySelector("#feuMilieu");
const feuBas = document.querySelector("#feuBas");


setTimeout(changeFromRed, 2000);

function changeFromRed(){
  feuHaut.style.backgroundColor = "white";
  feuMilieu.style.backgroundColor = "orange";
  setTimeout(changeFromOrangeToGreen, 2000);
}

function changeFromOrangeToGreen(){
  feuMilieu.style.backgroundColor = "white";
  feuBas.style.backgroundColor = "green";
  setTimeout(changeFromGreen, 2000);
}

function changeFromGreen(){
  feuBas.style.backgroundColor = "white";
  feuMilieu.style.backgroundColor = "orange";
  setTimeout(changeFromOrangeToRed, 2000);
}

function changeFromOrangeToRed(){
  feuMilieu.style.backgroundColor = "white";
  feuHaut.style.backgroundColor = "red";
  setTimeout(changeFromRed, 2000);
}