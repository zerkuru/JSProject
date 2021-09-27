//класс корзины
class ShoppingCart {
    constructor() {
        this.shoppinglist = [];
        this.username = '';
    }
    additem(item) {
        this.shoppinglist.push(item);
    }
    deleteitem(item) {
        newlist = [];
        this.shoppinglist.forEach(itemcurrent => {
            if (itemcurrent != item) {
                newlist.push(itemcurrent);
            };
        })
        this.shoppinglist = newlist;
    }
}
//класс элемента корзины
class ShoppingCartItem {
    constructor(goodname, quantity, price, discountprice, measure) {
        this.name = goodname;
        this.quantity = quantity;
        this.price = price;
        this.discountprice = discountprice;
        this.measure = measure;
        this.totalsum = this.quantity * this.price;
        this.discountsum = this.quantity * this.discountprice;
    }
    increase(amount) {
        this.quantity += amount;
        this.getsums()
    }
    decrease(amount) {
        this.quantity -= amount;
        this.getsums()
    }
    getsums() {
        this.totalsum = this.quantity * this.price;
        this.discountsum = this.quantity * this.discountprice;
    }
}


class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    totalcost() {
        let totalsum = 0;
        this.goods.forEach(good => {
            totalsum += good.price;
        });
        return totalsum;
    }
}

/*
Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
*/



const list = new GoodsList();
list.fetchGoods();
list.render();