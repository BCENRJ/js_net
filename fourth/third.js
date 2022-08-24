const readlinePromises = require("node:readline");
const fs = require('node:fs');

const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });

async function logging(data) {
    fs.appendFile("logging.txt", data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

async function ask(question) {
    const answer = await new Promise((resolve) => { rl.question(question, resolve); });
    if (answer === "q") {
        rl.close();
        return false;
    }
    return answer;
}

async function startGame() {
    const answer = await ask("Выберите количество попыток (q - выход): ");
    if (answer === false) {
        return false;
    }
    if (answer) {
        const numberOfTry = Number(answer);
        if (!Number.isNaN(numberOfTry)) {
            const randomNum = Math.floor(Math.random() * 1000);
            return { secretNum: randomNum, tryNum: numberOfTry };
        }
    }
    console.log("❌ Введите пожалуйста число");
    try {
        return await startGame();
    } catch (err) {
        console.log(err);
    }
}

async function guessNum(secretNum, tryNum, counter = 1) {
    const answer = await ask(`Угадайте число (от 1 до 1000, q - выход), [${counter}/${tryNum}]: `);
    if (answer === false) {
        return;
    }
    await logging(`Ответ[${secretNum}] → ведено: ${answer} → стата:  [${counter}/${tryNum}]\n`);
    const guessedNum = Number(answer);
    if (Number.isNaN(guessedNum)) {
        console.log("➖ минус одна попытка, будьте внимательны и введите число");
    } else if (guessedNum > 1000 || guessedNum < 1) {
        console.log("➖ минус одна попытка, веденное число вне диапазона [1, 1000]");
    } else if (guessedNum > secretNum) {
        console.log("🔽 Упс, загаданное число меньше");
    } else if (guessedNum < secretNum) {
        console.log("🔼 Упс, загаданное число больше");
    } else if (guessedNum === secretNum) {
        console.log(`🎉 Победа, вы справились с ${counter} попыток, общее количество попыток было ${counter + tryNum - 1}, угаданное число ${secretNum}`);
        rl.close();
        return;
    }
    if (tryNum === 1) {
        console.log(`😢 Вы проиграли, общее количество попыток: ${counter}`);
        rl.close();
        return;
    }
    await guessNum(secretNum, tryNum - 1, counter + 1);
}

async function main() {
    console.log("🎮 Добро пожаловать в игру 'Угадай число' 🎮");
    const value = await startGame();
    if (value) {
        await guessNum(value.secretNum, value.tryNum);
    }
}

main().then();
