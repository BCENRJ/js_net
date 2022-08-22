class Good{
    constructor(id, name, description, sizes, price, available){
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(boolean){
        this.available = boolean;
    }
}
class GoodsList{
    #goods
    filter
    sortPrice
    sortDir

    constructor(listOfGoods){
        this.#goods = listOfGoods;
    }

    get list(){

        if (this.sortPrice === true){
            if (this.sortDir === true) {
               this.#goods.sort((a, b) => a.price > b.price ? 1: -1);
            } else if (this.sortDir === false) {
                this.#goods.sort((a, b) => a.price < b.price ? 1: -1);
            }
        } 

        if (typeof this.filter === "string"){

            let regexp = new RegExp(`${this.filter}`, "i");

            return this.#goods.filter(good => regexp.test(good.name) &&
                good.available === true);
        }

        return this.#goods.filter(good => good.available === true);
    }

    add(new_good){
        if (new_good instanceof Good){
            this.#goods.push(new_good);
            return true;
        } 
        return false;
    }

    remove(id){
        let index = this.#goods.findIndex(good => good.id === id);
        if (index !== -1){
            return this.#goods.splice(index, 1) 
        }
        return false;
    }
}

class BasketGood extends Good{
    constructor(good, amount){
        super();
        if (good instanceof Good){
            this.id = good.id;
            this.name = good.name;
            this.description = good.description;
            this.sizes = good.sizes;
            this.price = good.price;
            this.available = good.available;
        }
        this.amount = amount;
    }
}

class Basket{
    constructor(listOfBasketGood){
        this.goods = listOfBasketGood;
    }

    get totalAmount(){
        return this.goods.map(a => a.amount).reduce((a, b) => a + b, 0);
    }

    get totalSum(){
        let total = 0;
        this.goods.forEach(element => total += element.price * element.amount);
        return total;
    }

    add(good, amount){
        
        if (good instanceof Good && typeof amount === "number" && amount > 0){
            let check = this.goods.find(product => product.id === good.id);
            if (check === undefined){
                let new_p = new BasketGood(good, amount);
                this.goods.push(new_p);

            } else {
                check.amount += amount;
            }
            return true;
        }
        return false;
    }

    remove(good, amount){
        if(good instanceof Good && typeof amount === "number" && amount){
            let check = this.goods.find(product => product.id === good.id);
            if (check !== undefined){
                check.amount -= amount;
                if (check.amount <= 0){
                    let i = this.goods.indexOf(check)
                    this.goods.splice(i, 1);
                }
                return true;
            }

        }
        return false;
    }

    clear(){
        this.goods.length = 0;
    }

    removeUnavailable(){
        let removeP = this.goods.filter(product => product.available !== true);
        removeP.forEach(p => this.goods.splice(this.goods.findIndex(i => i.id === p.id), 1));
        return true;
    }
}



const productOne = new Good(1, "Product A", "Some", ["S", "M", "L"], 123.44, true);
const productTwo = new Good(2, "Product B", "Some", ["S", "M", "L"], 100.44, true);
const productThree = new Good(3, "Product C", "Some", ["S", "M", "L"], 99.44, true);
const productFour = new Good(4, "Product  D", "Some", ["S", "M", "L"], 750.15, true);
const productFive = new Good(5, "Product C", "Some", ["S", "M", "L"], 820.15, true);
const productSix = new Good(6, "New", "Some", ["S", "M", "L"], 500.00, true);



const goodsList = new GoodsList([productOne, productTwo, productThree, 
                                 productFour, productFive ]);


productFour.setAvailable(false);
goodsList.sortPrice = true;
goodsList.sortDir = true;
goodsList.filter = "product";
console.log(goodsList.list);
goodsList.remove(2);
// console.log(goodsList.list);


const newItem = new Good(7, "product Y", "Some",  ["S", "M", "L"], 777.44, true);
goodsList.add(newItem);
// console.log(goodsList.list)
productThree.setAvailable(false);
let bg1 = new BasketGood(productOne, 2);
let bg2 = new BasketGood(productThree, 1);
let bg3 = new BasketGood(productFive, 3);
// console.log(bg3);

let bas = new Basket([bg1, bg2, bg3]);
// console.log(bas);
bas.add(newItem, 10);
// console.log(bas);
bas.remove(newItem, 3);
bas.removeUnavailable();
// console.log(bas);
console.log(bas.totalAmount);
console.log(bas.totalSum);
bas.clear();