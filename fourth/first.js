function getPasswordChecker(password) {
    return function checkIt(passwordToCheck) {
        return passwordToCheck === password;
    };
}

const myPass = getPasswordChecker("qwerty");
console.log(myPass("12345"));
console.log(myPass("qwerty"));

const mySecondPass = getPasswordChecker("azerty");

console.log(mySecondPass("12345"));
console.log(mySecondPass("azerty"));
