const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
/*запятые оставались изначально, 
так как goodslist это массив, его элементы при выводе разделены запятыми, нужно сделать из него строку  */
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    let newlistgoods = "";
    goodsList.forEach(itemgood => {
        newlistgoods += String(itemgood);
    });
    document.querySelector('.goods-list').innerHTML = newlistgoods;
}

renderGoodsList(goods);