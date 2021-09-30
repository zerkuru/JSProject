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
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').InnerHTML = listHtml;

    }
    totalcost() {
        let totalsum = 0;
        this.goods.forEach(good => {
            totalsum += good.price;
        });
        return totalsum;
    }
}

function makeGETRequest(url, callback) {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
};



const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});

