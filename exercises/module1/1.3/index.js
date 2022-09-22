let clicks = 0;
const text = document.querySelector("p");

window.addEventListener("click", increment);

function increment() {
  clicks += 1;
  
  if(clicks >= 5){
    changeMessage("Bravo, bel échauffement !");
  }
  if(clicks >=10){
    changeMessage("Vous êtes passé maître en l'art du clic !");
  }
}

function changeMessage(message){
    text.innerText = message;
}