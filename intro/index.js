const p = document.getElementById("main");
console.log(p);
const img = document.getElementById("someImg");
console.log(img.src, img.width, img.height);

console.log(p.className);
console.log(p.textContent);
p.textContent = "hey";

img.onclick = () => {
    img.width += 20;
    img.height += 20;
    img.onclick = null;
};
const linkNet = document.getElementById("link");
linkNet.onclick = () => false;

const timerValue = document.getElementById("timer");
setInterval(() => {
    timerValue.textContent = String(Number(timerValue.textContent) + 1);
}, 1000);
