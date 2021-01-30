/*class PreparationItem {
    constructor(itemId, quantity, itemPrice, itemTitle, sum, isPreparation) {
        this.itemId = itemId;
        this.quantity = quantity;
        this.itemPrice = itemPrice;
        this.itemTitle = itemTitle;
        this.sum = sum;
        this.isPreparation = isPreparation;
    }
}
export default PreparationItem;*/


class PreparationItem {
    constructor(quantity, imageUrl, price, title, sum) {
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.price = price;
        this.title = title;
        this.sum = sum;
    }
}
export default PreparationItem;