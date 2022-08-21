
let catalogGoods = [
    { 
        id: 1,
        name: "Ветровка",
        description: "короткая длина",
        sizes: ["S", "M", "L"],
        price: 125.00,
        available: true,
    },
    { 
        id: 2,
        name: "Жилетка",
        description: "безрукавка",
        sizes: ["S", "M", "L"],
        price: 132.00,
        available: true,
    },
    { 
        id: 3,
        name: "Куртка",
        description: "длинная",
        sizes: ["S", "M", "L"],
        price: 553.99,
        available: true,
    },
    { 
        id: 4,
        name: "Толстовка A",
        description: "черная",
        sizes: ["S", "M", "L"],
        price: 245.00,
        available: true,
    },
    { 
        id: 5,
        name: "Толстовка B",
        description: "зеленая",
        sizes: ["S", "M", "L"],
        price: 225.00,
        available: true,
    },
    { 
        id: 6,
        name: "Толстовка C",
        description: "синяя",
        sizes: ["S", "M", "L"],
        price: 285.00,
        available: false,
    }
];

let basket = [];

function addGoodToBasket(goodID, amount){

    let good = catalogGoods.find(item => item.id === goodID && 
        item.available === true);

    if (good !== undefined){
        basket.push({good: good, amount: amount});
        return true;
    }
    return false;
}

function deleteGood(goodID){
    let goodIndex = basket.findIndex(item => item.good.id === goodID);
    if (goodIndex !== -1) {
        basket.splice(goodIndex, 1);
        return true;
    }
    return false;
}

function clearBasket(){
    basket.length = 0;
}

function basketOutput(basket){
    let totalAmount = 0;
    let totalSum = 0;
    for (const item of basket) {
        totalAmount += item.amount;
        totalSum += item.amount * item.good.price;   
    }

    return {totalAmount: totalAmount, totalSum: totalSum};

}

addGoodToBasket(1, 5);
addGoodToBasket(2, 5);
clearBasket();
addGoodToBasket(3, 1);
addGoodToBasket(5, 1);
addGoodToBasket(6, 1);
deleteGood(3);
addGoodToBasket(4, 5);

console.log(basketOutput(basket));
