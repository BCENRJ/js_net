const dead = document.getElementById("dead");
const lost = document.getElementById("lost");

const holes = document.querySelectorAll("#hole1, #hole2, #hole3, #hole4, #hole5, #hole6, #hole7, #hole8, #hole9");

holes.forEach((hole) => {
    hole.onclick = () => {
        if (hole.className.includes("hole_has-mole")) {
            dead.textContent = String(Number(dead.textContent) + 1);
            if (dead.textContent === "10") {
                alert("Победа");
                lost.textContent = "0";
                dead.textContent = "0";
            }
        } else {
            lost.textContent = String(Number(lost.textContent) + 1);
            if (lost.textContent === "5") {
                alert("Вы проиграли :(");
                lost.textContent = "0";
                dead.textContent = "0";
            }
        }
    };
});
