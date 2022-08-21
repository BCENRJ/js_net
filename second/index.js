console.log("Hello, World!");

function primaryNumber(amount){
    if (amount == 1){
        return [2]
    }
    let primaryNumList = [2];
    let starter = 1;
    loopMain:
    while (primaryNumList.length !== amount){
        starter+=2;
        let checker = 0;
        for(let i = 1; i < starter; i++){
            if (starter % i === 0){
                checker++
            }
            if (checker > 1) {
                continue loopMain;
            }
        }
        primaryNumList.push(starter)
    }
    return primaryNumList;
}

let inputNum = +process.argv[2];

console.time();
console.log(primaryNumber(inputNum));
console.timeEnd();
