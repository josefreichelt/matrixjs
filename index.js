const alphabetBig = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetSmall = alphabetBig.toLowerCase();
const numbers = "0123456789";
const katakana = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ";
const chars = alphabetBig + alphabetSmall + numbers + katakana;

const canvasElement = document.getElementById("matrix");
const context = canvasElement.getContext("2d");
console.log("Wake up, Neo...");

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(canvasElement.width / fontSize);
const rows = Math.floor(canvasElement.height / fontSize);

/**
 * Create a drop object for each column
 * object is required to holding onto a previous character for effect
 */
const rainDrops = new Array(columns).fill(0).map(() => ({
  idx: rows + 2,
  currentChar: "",
  prevChar: "",
}));

let lastTime = 0;
const FPS = 30;
const step = 1000 / FPS;

function draw(timestamp) {
  requestAnimationFrame(draw);
  if (timestamp - lastTime < step) {
    return;
  }
  lastTime = timestamp;

  context.fillStyle = "rgba(0,0,0,0.06)";
  context.fillRect(0, 0, canvasElement.width, canvasElement.height);
  context.fillStyle = "#00ca00";
  context.font = fontSize + "px monospace";

  for (let i = 0; i < rainDrops.length; i++) {
    const drop = rainDrops[i];
    context.fillStyle = "#00ca00";
    context.fillText(drop.prevChar, i * fontSize, (drop.idx - 1) * fontSize);
    context.fillStyle = "#cef5ce";
    context.fillText(drop.currentChar, i * fontSize, drop.idx * fontSize);

    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));

    rainDrops[i].prevChar = rainDrops[i].currentChar;
    rainDrops[i].currentChar = randomChar;

    if (drop.idx > rows && Math.random() > 0.975) {
      rainDrops[i].idx = 0;
    } else {
      rainDrops[i].idx++;
    }
  }
}

requestAnimationFrame(draw);
