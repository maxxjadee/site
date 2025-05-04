document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartMessage = document.querySelector(".cart-message");
    const cartDetails = document.querySelector(".cart-details");
    const totalQuantityEl = document.getElementById("total-quantity");
    const totalPriceEl = document.getElementById("total-price");
    const showProductsBtn = document.getElementById("showProductsBtn");
    const productModal = document.getElementById("product-modal");
    const closeModalBtn = document.getElementById("closeModal");
    const productList = document.querySelector(".product-list");

    let cart = {};

    const modalProducts = [
        {
            title: "Happy Pet Puppy Beef Recipe (15kg)",
            price: 2300,
            img: "Screenshot 2025-04-09 010206.png"
        },
        {
            title: "Pedigree Bones Chewy Dog Treats (50g)",
            price: 300,
            img: "Screenshot 2025-04-09 010236.png"
        },
        {
            title: "Spider-man Costume (Large Fit)",
            price: 450,
            img: "Screenshot 2025-04-09 010248.png"
        },
        {
            title: "Frog Costume (Extra Small Fit)",
            price: 350,
            img: "pngegg(1).png"
        },
        {
            title: "Mango Flavored Puppy Treats (25g)",
            price: 600,
            img: "mango treats.png"
        },
        {
            title: "Smartheart Adult Dog Kibble (20kg)",
            price: 4350,
            img: "smartheart.png"
        }
    ];

    modalProducts.forEach(product => {
        const item = document.createElement("div");
        item.className = "bg-white border p-2 rounded shadow text-sm text-left";
        item.innerHTML = `
            <img src="${product.img}" alt="${product.title}" class="w-full h-24 object-contain mb-2">
            <p class="font-medium">${product.title}</p>
            <p class="text-yellow-600 font-semibold">₱ ${product.price.toLocaleString()}</p>
            <button class="mt-2 bg-yellow-400 text-white px-2 py-1 rounded add-btn">Add</button>
        `;
        item.querySelector(".add-btn").addEventListener("click", () => {
            addToCart(product.title, product.price, product.img);
            productModal.classList.add("hidden");
        });
        productList.appendChild(item);
    });

    showProductsBtn.addEventListener("click", () => {
        productModal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", () => {
        productModal.classList.add("hidden");
    });

    productCards.forEach(card => {
        card.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", JSON.stringify({
                title: card.querySelector(".title").innerText,
                price: parseFloat(card.dataset.price),
                img: card.dataset.img
            }));
        });
    });

    const cartSection = document.getElementById("shopping-cart");
    cartSection.addEventListener("dragover", e => {
        e.preventDefault();
    });
    cartSection.addEventListener("drop", e => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        addToCart(data.title, data.price, data.img);
    });

    function addToCart(title, price, img) {
        if (cart[title]) {
            cart[title].quantity += 1;
        } else {
            cart[title] = { price, quantity: 1, img };
        }
        renderCart();
    }

    function removeFromCart(title) {
        if (cart[title]) {
            cart[title].quantity -= 1;
            if (cart[title].quantity <= 0) {
                delete cart[title];
            }
        }
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let totalQuantity = 0;
        let totalPrice = 0;

        for (let title in cart) {
            const { price, quantity, img } = cart[title];
            totalQuantity += quantity;
            totalPrice += price * quantity;

            const cartItem = document.createElement("div");
            cartItem.className = "flex items-center justify-between bg-white rounded p-3 shadow-sm";

            cartItem.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${img}" class="w-12 h-12 object-contain">
                    <div class="text-left">
                        <p class="font-medium text-sm">${title}</p>
                        <p class="text-yellow-600 font-semibold text-sm">₱ ${(price * quantity).toLocaleString()}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button class="decrease px-2 py-1 bg-yellow-300 rounded text-white font-bold">-</button>
                    <span>${quantity}</span>
                    <button class="increase px-2 py-1 bg-yellow-500 rounded text-white font-bold">+</button>
                </div>
            `;

            cartItem.querySelector(".decrease").addEventListener("click", () => removeFromCart(title));
            cartItem.querySelector(".increase").addEventListener("click", () => addToCart(title, price, img));

            cartItemsContainer.appendChild(cartItem);
        }

        totalQuantityEl.textContent = totalQuantity;
        totalPriceEl.textContent = `₱ ${totalPrice.toLocaleString()}`;

        const isEmpty = totalQuantity === 0;
        cartMessage.classList.toggle("hidden", !isEmpty);
        cartDetails.classList.toggle("hidden", isEmpty);
    }
});
