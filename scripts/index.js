//za menu u small screnu start
const menuBtn = document.getElementById("menuBtn");
const menuCategories = document.querySelector(".categoriesResponsive");

menuBtn.addEventListener("click", () => {
    if (menuCategories.style.display === "none") {
        menuCategories.style.display = "flex";
        menuBtn.firstElementChild.src = "./images/logos/menuIcon2.png";
    } else {
        menuCategories.style.display = "none";
        menuBtn.firstElementChild.src = "./images/logos/menuIcon.png";
    }
});

menuCategories.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnInMenu")) {
        menuCategories.style.display = "none";
        menuBtn.firstElementChild.src = "./images/logos/menuIcon.png";
    }
}
)
//za menu u small screnu end

//subscribe button start
let subscribeButton = document.getElementById("subscribeButton");
subscribeButton.addEventListener("click", () => alert("You are subscribed"));
//subscribe button end


//cart data
let jsonStringLoaded = localStorage.getItem("cartItems");
let cart = new Map(JSON.parse(jsonStringLoaded));


function numOfElementsInCart() {
    let num = 0;
    for (let [key, value] of cart) {
        num += value;
    }
    return num;
}

//render data start
let dataForRender = localStorage.getItem("dataForRender");
dataForRender = JSON.parse(dataForRender);

//rendering header info
function renderHeader() {
    const p = document.createElement('p');
    p.textContent = dataForRender["categories"][0]["name"];
    document.querySelector(".currentCategory").appendChild(p);

    let headerCart = document.getElementById("headerCart");
    let cartElement = numOfElementsInCart();
    if (cartElement == 0) {
        headerCart.style.display = "none";
    } else {
        headerCart.textContent = cartElement;
        headerCart.style.display = "flex";
    }

}
renderHeader();

//render navigation and shop
function switches() {
    let categoriesArray = dataForRender['categories'];
    for (let i = 0; i < categoriesArray.length; i++) {
        const button = document.createElement('button');

        const img = document.createElement('img');
        img.src = categoriesArray[i]["imageLogo"];
        img.alt = categoriesArray[i]["name"];

        const p = document.createElement('p');
        p.textContent = categoriesArray[i]["name"];

        button.appendChild(img);
        button.appendChild(p);

        button.addEventListener("click",
            () => {

                //render header category

                const pCategory = document.createElement('p');
                pCategory.textContent = categoriesArray[i]["name"];

                document.querySelector(".currentCategory").innerHTML = "";
                document.querySelector(".currentCategory").appendChild(pCategory);

                //render headerVideo
                const video = document.createElement('video');
                video.src = categoriesArray[i]["videoHeader"];
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.poster = categoriesArray[i]["imageHeader"];

                const div = document.createElement('div');
                const p = document.createElement('p');
                p.textContent = categoriesArray[i]["infoText"];

                div.appendChild(p);


                document.querySelector(".mainHeader").innerHTML = "";
                document.querySelector(".mainHeader").appendChild(video);
                document.querySelector(".mainHeader").appendChild(div);



                //render products
                document.querySelector(".products").innerHTML = "";
                let products = categoriesArray[i]["products"];
                for (let j = 0; j < products.length; j++) {
                    const divProd = document.createElement('div');
                    divProd.classList.add("product");

                    const divProdImg = document.createElement('div');
                    divProdImg.classList.add("productImage");

                    const imgProduct = document.createElement('img');
                    imgProduct.src = products[j]["image"];
                    imgProduct.alt = "product image";

                    const span = document.createElement('span');
                    span.textContent = cart.get(products[j]["name"]);
                    if (span.textContent == 0) span.style.display = "none";

                    const buttonCart = document.createElement('button');
                    buttonCart.addEventListener("click", () => {
                        if (cart.has(products[j]["name"])) {
                            cart.set(products[j]["name"], cart.get(products[j]["name"]) + 1);
                        } else {
                            cart.set(products[j]["name"], 1);
                        }


                        span.textContent = cart.get(products[j]["name"]);

                        if (span.style.display === 'none' && span.textContent != 0) {
                            span.style.display = "flex";
                        }

                        let headerCart = document.getElementById("headerCart");
                        let cartElement = numOfElementsInCart();
                        if (cartElement == 0) {
                            headerCart.style.display = "none";
                        } else {
                            headerCart.textContent = cartElement;
                            headerCart.style.display = "flex";
                        }

                        const jsonString = JSON.stringify(Array.from(cart));
                        localStorage.setItem('cartItems', jsonString);

                    });

                    const imgCart = document.createElement('img');
                    imgCart.src = ["./images/logos/cart logo.webp"];
                    imgCart.alt = "cart image";

                    const pProduct = document.createElement('p');
                    pProduct.classList.add("name");
                    pProduct.textContent = products[j]["name"];

                    const pProductPrice = document.createElement('p');
                    pProductPrice.textContent = products[j]["price"];

                    buttonCart.appendChild(imgCart);
                    divProdImg.appendChild(imgProduct);
                    divProdImg.appendChild(span);
                    divProdImg.appendChild(buttonCart);

                    divProd.appendChild(divProdImg);
                    divProd.appendChild(pProduct);
                    divProd.appendChild(pProductPrice);

                    document.querySelector(".products").appendChild(divProd);
                }
            }
        );

        if (i == 0) button.click();



        document.querySelector(".categories").appendChild(button);



    }

}
switches();

//render news
function renderNews() {
    let allNews = dataForRender["news"];

    for (let i = 0; i < allNews.length; i++) {
        const divNewNews = document.createElement('div');
        divNewNews.classList.add("newNews");

        const pTitle = document.createElement('p');
        pTitle.classList.add("newsTitle");
        pTitle.textContent = allNews[i]["title"];

        const divImage = document.createElement('div');
        divImage.classList.add("newsImage");

        const img = document.createElement('img');
        img.src = allNews[i]["newsImage"];
        img.alt = "news image";

        const pInfo = document.createElement('p');
        pInfo.classList.add("newsInfo");
        pInfo.textContent = allNews[i]["newsInfo"];

        const a = document.createElement('a');
        a.href = allNews[i]["newsLink"];
        a.textContent = "More info";
        a.target = "_blank";


        divImage.appendChild(img);
        pInfo.appendChild(a);

        divNewNews.appendChild(pTitle);
        divNewNews.appendChild(divImage);
        divNewNews.appendChild(pInfo);

        document.querySelector(".news").appendChild(divNewNews);

    }
}
renderNews();



//small screen
function switchSmallScreen() {
    let categoriesArray = dataForRender['categories'];
    for (let i = 0; i < categoriesArray.length; i++) {
        const button = document.createElement('button');

        // const img = document.createElement('img');
        // img.src = categoriesArray[i]["imageLogo"];
        // img.alt = categoriesArray[i]["name"];

        const p = document.createElement('p');
        p.textContent = categoriesArray[i]["name"];

        //  button.appendChild(img);
        button.appendChild(p);

        button.addEventListener("click", () => {

            //close menu pop up
            menuCategories.style.display = "none";
            menuBtn.firstElementChild.src = "./images/logos/menuIcon.png";

            //render header category
            const pCategory = document.createElement('p');
            pCategory.textContent = categoriesArray[i]["name"];

            document.querySelector(".currentCategory").innerHTML = "";
            document.querySelector(".currentCategory").appendChild(pCategory);

            //render header video
            const video = document.createElement('video');
            video.src = categoriesArray[i]["videoHeader"];
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.poster = categoriesArray[i]["imageHeader"];

            const div = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = categoriesArray[i]["infoText"];

            div.appendChild(p);

            let parent = document.querySelector(".mainHeader2");
            var children = parent.querySelectorAll(":scope > *:not(:first-child)");
            children.forEach((child) => { parent.removeChild(child); });
            parent.appendChild(video);
            parent.appendChild(div);

            //render products
            document.querySelector(".products2").innerHTML = "";
            let products = categoriesArray[i]["products"];
            for (let j = 0; j < products.length; j++) {
                const divProd = document.createElement('div');
                divProd.classList.add("product2");

                const divProdImg = document.createElement('div');
                divProdImg.classList.add("productImage2");

                const imgProduct = document.createElement('img');
                imgProduct.src = products[j]["image"];
                imgProduct.alt = "product image";

                const span = document.createElement('span');
                span.textContent = cart.get(products[j]["name"]);
                if (span.textContent == 0) span.style.display = "none";

                const buttonCart = document.createElement('button');
                buttonCart.addEventListener("click", () => {
                    if (cart.has(products[j]["name"])) {
                        cart.set(products[j]["name"], cart.get(products[j]["name"]) + 1);
                    } else {
                        cart.set(products[j]["name"], 1);
                    }


                    span.textContent = cart.get(products[j]["name"]);

                    if (span.style.display === 'none' && span.textContent != 0) {
                        span.style.display = "flex";
                    }

                    let headerCart = document.getElementById("headerCart");
                    let cartElement = numOfElementsInCart();
                    if (cartElement == 0) {
                        headerCart.style.display = "none";
                    } else {
                        headerCart.textContent = cartElement;
                        headerCart.style.display = "flex";
                    }

                    const jsonString = JSON.stringify(Array.from(cart));
                    localStorage.setItem('cartItems', jsonString);

                });

                const imgCart = document.createElement('img');
                imgCart.src = ["./images/logos/cart logo.webp"];
                imgCart.alt = "cart image";

                const pProduct = document.createElement('p');
                pProduct.classList.add("name");
                pProduct.textContent = products[j]["name"];

                const pProductPrice = document.createElement('p');
                pProductPrice.textContent = products[j]["price"];

                buttonCart.appendChild(imgCart);
                divProdImg.appendChild(imgProduct);
                divProdImg.appendChild(span);
                divProdImg.appendChild(buttonCart);

                divProd.appendChild(divProdImg);
                divProd.appendChild(pProduct);
                divProd.appendChild(pProductPrice);

                document.querySelector(".products2").appendChild(divProd);
            }

        });


        if (i == 0) button.click();

        document.querySelector(".categoriesResponsive").appendChild(button);



    }
}
switchSmallScreen();

function smallNews() {
    let allNews = dataForRender["news"];

    for (let i = 0; i < allNews.length; i++) {
        const divNewNews = document.createElement('div');
        divNewNews.classList.add("newNews2");

        const pTitle = document.createElement('p');
        pTitle.classList.add("newsTitle2");
        pTitle.textContent = allNews[i]["title"];

        const divImage = document.createElement('div');
        divImage.classList.add("newsImage2");

        const img = document.createElement('img');
        img.src = allNews[i]["newsImage"];
        img.alt = "news image";

        const pInfo = document.createElement('p');
        pInfo.classList.add("newsInfo2");
        pInfo.textContent = allNews[i]["newsInfo"];

        const a = document.createElement('a');
        a.href = allNews[i]["newsLink"];
        a.textContent = "More info";
        a.target = "_blank";


        divImage.appendChild(img);
        pInfo.appendChild(a);

        divNewNews.appendChild(pTitle);
        divNewNews.appendChild(divImage);
        divNewNews.appendChild(pInfo);

        document.querySelector(".news2").appendChild(divNewNews);

    }
}
smallNews();