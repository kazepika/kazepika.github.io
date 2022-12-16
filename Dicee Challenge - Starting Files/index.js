let randomNumber1 = Math.round(Math.random() * (6-1) + 1);
// place the image to the left
let temp = `./images/dice${randomNumber1}.png`;
document.querySelectorAll('img')[0].src = temp;


let randomNumber2 = Math.round(Math.random() * (6-1) + 1);
// place the image to the right
temp = `./images/dice${randomNumber2}.png`;
document.querySelectorAll('img')[1].src = temp;


if (randomNumber1 === randomNumber2) {
    // Draw!
    document.querySelector('h1').textContent = 'Draw!';
}
else if (randomNumber1 > randomNumber2) {
    // Player 1 Wins!
    document.querySelector('h1').textContent = '⛳Player 1 Wins!';
}
else {
    // Player 2 Wins!
    document.querySelector('h1').textContent = 'Player 2 Wins!⛳';
}