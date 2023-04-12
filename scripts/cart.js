let payButton = document.getElementById("payButton");
payButton.addEventListener("click", () => alert("non-sufficient funds, payment unsuccessful"));

//cart data
let jsonStringLoaded = localStorage.getItem("cartItems");
let cart = new Map(JSON.parse(jsonStringLoaded));

function numOfElementsInCart() {
    let num = 0;
    for (let [key, value] of cart) {
        num += value.count;
    }
    return num;
}

function totalSumInCart() {
    let num = 0;
    for (let [key, value] of cart) {
        num += value.count * value.price;
    }
    return num;
}

//varijable
const emptyCart = document.querySelector(".emptyCart");
const container = document.querySelector(".container");
const cartItems = document.querySelector(".cartItems");
const payment = document.querySelector(".payment");
const spanForCartSize = document.querySelector("#headerCart");

let dataForRender = localStorage.getItem("dataForRender");
dataForRender = JSON.parse(dataForRender);


//renderData
function chooseDisplay() {

    if (numOfElementsInCart() == 0) {
        spanForCartSize.style.display = "none";
        container.style.display = "none";
        emptyCart.style.display = "flex";

    } else {
        emptyCart.style.display = "none";
        container.style.display = "flex";
        renderData();
    }

}
chooseDisplay();

function renderData() {

    //postavit na kosaricu broj elementa u kosarici
    spanForCartSize.textContent = numOfElementsInCart();
    spanForCartSize.style.display = "flex";

    //proc kroz sve products i izlozit ih
    cart.forEach((value, key) => {
        createProduct(key, value);
    });

    renderPaymentInfo();
}

function createProduct(key, value) {

    if (value.count < 1) return;

    //item
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add("cartItem");

    //itemInfo
    const cartItemInfo = document.createElement('div');
    cartItemInfo.classList.add("itemInfo");

    const cartItemDivImg = document.createElement('div');
    cartItemDivImg.classList.add("itemImg");

    const cartItemImg = document.createElement('img');
    cartItemImg.src = value.img;
    cartItemImg.alt = "item image";

    const cartItemName = document.createElement('p');
    cartItemName.textContent = key;

    cartItemDivImg.appendChild(cartItemImg);

    cartItemInfo.appendChild(cartItemDivImg);
    cartItemInfo.appendChild(cartItemName);

    //itemQuantity
    const cartItemQuantityDiv = document.createElement('div');
    cartItemQuantityDiv.classList.add("itemQuantity");

    //
    const editQuantityDiv = document.createElement('div');
    editQuantityDiv.classList.add("editQuantity");

    const buttonRemove = document.createElement('button');
    buttonRemove.addEventListener("click", (e) => removeFromCart(key, value));

    const buttonRemoveImg = document.createElement('img');
    buttonRemoveImg.alt = "item image";
    buttonRemoveImg.src = "./images/logos/whiteRemoveIcon.png";

    buttonRemove.appendChild(buttonRemoveImg);

    const numOfProduct = document.createElement('span');
    numOfProduct.textContent = value.count;

    const buttonAdd = document.createElement('button');
    buttonAdd.addEventListener("click", (e) => addToCart(key, value));

    const buttonAddImg = document.createElement('img');
    buttonAddImg.alt = "item image";
    buttonAddImg.src = "./images/logos/whiteAddIcon.png";

    buttonAdd.appendChild(buttonAddImg);

    editQuantityDiv.appendChild(buttonRemove);
    editQuantityDiv.appendChild(numOfProduct);
    editQuantityDiv.appendChild(buttonAdd);

    //
    const priceDiv = document.createElement('div');
    priceDiv.classList.add("price");

    const pricePerItem = document.createElement('span');
    pricePerItem.textContent = "price per item: " + (value.price).toLocaleString() + "€";
    pricePerItem.classList.add("perItem");

    const priceCombined = document.createElement('span');
    priceCombined.textContent = "price: " + (value.price * value.count).toLocaleString() + "€";
    priceCombined.classList.add("priceCombined");

    priceDiv.appendChild(pricePerItem);
    priceDiv.appendChild(priceCombined);

    cartItemQuantityDiv.appendChild(editQuantityDiv);
    cartItemQuantityDiv.appendChild(priceDiv);

    cartItemDiv.appendChild(cartItemInfo);
    cartItemDiv.appendChild(cartItemQuantityDiv);

    cartItems.appendChild(cartItemDiv);

}

function removeFromCart(key, value) {

    let cartObj = cart.get(key);
    cartObj.count--;

    let one = document.querySelector(".intermediateSteps");
    let two = document.querySelector(".total");
    payment.removeChild(one);
    payment.removeChild(two);

    cartItems.innerHTML = "";

    let JSONupdate = JSON.stringify(Array.from(cart));
    localStorage.setItem("cartItems", JSONupdate);

    chooseDisplay();
}

function addToCart(key, value) {
    let cartObj = cart.get(key);
    cartObj.count++;

    let one = document.querySelector(".intermediateSteps");
    let two = document.querySelector(".total");
    payment.removeChild(one);
    payment.removeChild(two);

    cartItems.innerHTML = "";

    let JSONupdate = JSON.stringify(Array.from(cart));
    localStorage.setItem("cartItems", JSONupdate);

    chooseDisplay();
}

function renderPaymentInfo() {

    //payment

    //intermidianteSteps
    const divSteps = document.createElement('div');
    divSteps.classList.add("intermediateSteps");

    const pSteps1 = document.createElement('p');
    pSteps1.textContent = "Total for items: ";

    const pSteps2 = document.createElement('p');
    pSteps2.textContent = totalSumInCart().toLocaleString() + "€";

    divSteps.appendChild(pSteps1);
    divSteps.appendChild(pSteps2);

    //shiping
    //shiping bi se racunao posebno izostavit zbog jendostavnost

    //total
    const divTotal = document.createElement('div');
    divTotal.classList.add("total");

    const pTotal1 = document.createElement('p');
    pTotal1.textContent = "Total: ";

    const pTotal2 = document.createElement('p');
    pTotal2.textContent = totalSumInCart().toLocaleString() + "€";

    divTotal.appendChild(pTotal1);
    divTotal.appendChild(pTotal2);


    //da ih smjestimo na pravo mjesto
    let intermediateSteps2 = document.querySelector(".intermediateSteps2");
    let payButtonClassInPayment = document.querySelector(".paymentButton");

    payment.insertBefore(divSteps, intermediateSteps2);
    payment.insertBefore(divTotal, payButtonClassInPayment);

}