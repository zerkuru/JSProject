//класс корзины 
//добавлены методы добавления, удаления, списка
class ShoppingCart {
    constructor() {
        this.shoppinglist = [];
        this.username = '';
    }
    additem(item) {
        //this.shoppinglist.push(item)
        makeGETRequest(`${API_URL}/addToBasket.json `, (shoppinglist) => {
            this.shoppinglist = JSON.parse(shoppinglist);
        });
    }
    deleteitem(item) {
        /*newlist = [];
        this.shoppinglist.forEach(itemcurrent => {
            if (itemcurrent != item) {
                newlist.push(itemcurrent);
            };
        })
        this.shoppinglist = newlist;*/
        makeGETRequest(`${API_URL}/deleteFromBasket.json`, (shoppinglist) => {
            this.shoppinglist = JSON.parse(shoppinglist);
        });

    }
    getlist() {
        //return this.shoppinglist;
        makeGETRequest(`${API_URL}/getBasket.json`, (shoppinglist) => {
            this.shoppinglist = JSON.parse(shoppinglist);
        });
    }
}
//класс элемента корзины
class ShoppingCartItem {
    constructor(product_name, price, id_product) {
        this.name = product_name;
        this.quantity = 0;
        this.price = price;
        this.id = id_product;
        this.discountprice = price;
        this.measure = "p";
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
        this.filteredGoods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            cb();
        })
    }

    filterGoods(value)filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
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

const async = (a, cb) => {
    setTimeout(() => {
        const b = a + 1;
        cb(b);
    }, 200);
}

const async = (a) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a) {
                const b = a + 1;
                resolve(b);
            } else {
                reject('Error');
            }
        }, 200);
    });
}


function makeGETRequest(url, callback) {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', url, true);
    xhr.send();
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(callback(xhr.responseText)
                );
            }
            else {
                reject('Error');
            }
        }
    })
};



const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});
let searchButton = document.querySelector("search-button");
searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});

