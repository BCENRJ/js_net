const readline = require("node:readline");
const fs = require('node:fs');

const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

function logging(data) {
    fs.appendFile("logging.txt", data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function guessNum(secretNumber, numTry, counter = 1) {
    rl.question(`Угадайте число (от 1 до 1000, q - выход), [${counter}/${numTry}]: `, (answer) => {
        logging(`Ответ[${secretNumber}] → ведено: ${answer} → стата:  [${counter}/${numTry}]\n`);
        if (answer === "q") {
            rl.close();
            return;
        }
        const guessedNum = Number(answer);
        if (Number.isNaN(guessedNum)) {
            console.log("➖ минус одна попытка, будьте внимательны и введите число");
        } else if (guessedNum > 1000 || guessedNum < 1) {
            console.log("➖ минус одна попытка, веденное число вне диапазона [1, 1000]");
        } else if (guessedNum > secretNumber) {
            console.log("🔽 Упс, загаданное число меньше");
        } else if (guessedNum < secretNumber) {
            console.log("🔼 Упс, загаданное число больше");
        } else if (guessedNum === secretNumber) {
            console.log(`🎉 Победа, вы справились с ${counter} попыток, общее количество попыток было ${counter + numTry - 1}, угаданное число ${secretNumber}`);
            rl.close();
            return;
        }
        if (numTry === 1) {
            console.log(`😢 Вы проиграли, общее количество попыток: ${counter}`);
            rl.close();
            return;
        }
        guessNum(secretNumber, numTry - 1, counter + 1);
    });
}

function startGame() {
    rl.question("Выберите количество попыток (q - выход): ", (answer) => {
        if (answer === "q") {
            rl.close();
            return false;
        }
        const numberOfTry = Number(answer);
        if (!Number.isNaN(numberOfTry)) {
            const randomNum = Math.floor(Math.random() * 1000);
            return guessNum(randomNum, numberOfTry);
        }
        console.log("❌ Введите пожалуйста число");
        return startGame();
    });
}

function main() {
    console.log("🎮 Добро пожаловать в игру 'Угадай число' 🎮");
    startGame();
}

main();
