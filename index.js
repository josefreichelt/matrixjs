const alphabetBig = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alphabetSmall = alphabetBig.toLowerCase();
const numbers = "0123456789"
const katakana =  "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ"
const chars = alphabetBig + alphabetSmall + numbers + katakana;


const canvasElement = document.getElementById("matrix");
const context = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(canvasElement.width/fontSize);
const rows = Math.floor(canvasElement.height/fontSize);

console.log("Wake up, Neo...")
console.log(columns,rows)
console.log(canvasElement)

const rainDrops = new Array(columns).fill(rows + 1);

console.log(rainDrops)

let lastTime = 0;
const FPS = 45;
const step = 1000 / FPS;

function draw(timestamp){
    requestAnimationFrame(draw);

    if(timestamp - lastTime < step) {return;};
    lastTime = timestamp;

    context.fillStyle = "rgba(0,0,0,0.05)"
    context.fillRect(0,0,canvasElement.width,canvasElement.height)
    context.fillStyle = "#00ca00"
    context.font = fontSize + 'px monospace'

    for (let i = 0; i < rainDrops.length; i++) {
        const row = rainDrops[i];
        const randomChar = chars.charAt(Math.floor(Math.random()*chars.length));
        // context.fillStyle = "#cef5ce"
        context.fillText(randomChar,i*fontSize,row * fontSize)
        context.fillStyle = "#00ca00"
        if(row > rows && Math.random() > 0.975){
            rainDrops[i] = 0;
        }else{
            rainDrops[i]++;
        }
    }

}

requestAnimationFrame(draw)
