const fs = require('fs');

module.exports = class Checkout{
    constructor() {
        this.prices = {};
        this.currentTotal = 0;
        this.discount = {};
    }

    async readFile(filepath, encode) {
        if (!!filepath) {
            const file = await fs.readFileSync(filepath, encode);
            if (file) {
                const itemsPrices = file.split('').filter(el => !!el.trim());
                const items = itemsPrices.filter((el, id) => id % 2 === 0);
                const prices = itemsPrices.filter((el, id) => id % 2 !== 0);
                items.forEach((item, id) => {
                    this.addItemPrice(item, Number(prices[id]));
                });
                return this.prices;
            }
        }
    }

    addItemPrice(item, price) {
        this.prices[item] = { quantity: 0, price };
    }

    addItem(item) {
        if (!this.prices[item]) throw new Error('not valid');
        this.prices[item].quantity += 1;
        this.currentTotal += this.prices[item].price;
        if (this.discount[item]) {
            if (this.prices[item].quantity % this.discount[item].quantity === 0) {
                this.currentTotal = this.discount[item].discountPrice;
            }
        }
    }

    addDiscount(item, quantity, discountPrice) {
        this.discount[item] = { quantity, discountPrice };
    }

    calculateTotal() {
        return this.currentTotal;
    }
};
