function addDateTime(message){
    const dateTimeNow = new Date();
    return message + " " + dateTimeNow.toLocaleDateString() + " " + dateTimeNow.toLocaleTimeString();
}

const message = "Bingo bingo"
alert(addDateTime(message));
console.log(message);