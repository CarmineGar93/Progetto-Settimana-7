const addressBarParameters = new URLSearchParams(window.location.search);
const productId = addressBarParameters.get("productId");
const detailsRow = document.getElementById("detailsRow");
const URL = "https://striveschool-api.herokuapp.com/api/product/"
let carrello = JSON.parse(localStorage.getItem('cart'))
let cart = document.getElementById('cart')


const createCart = function(array) {
    cart.innerHTML = ''
    for (let j = 0; j < array.length; j++) {
        const divImg = document.createElement('div')
        divImg.classList.add('col-2')
        const img = document.createElement('img')
        img.setAttribute('src', array[j].imageUrl)
        img.classList.add('w-100')
        const divText = document.createElement('div')
        divText.classList.add('col-8')
        const title = document.createElement('h6')
        title.innerText = array[j].name
        const price = document.createElement('p')
        price.innerText = `${array[j].price} $`
        const divButton = document.createElement('div')
        divButton.classList.add('col-2')
        const btnErase = document.createElement('button')
        btnErase.classList.add('btn', 'btn-danger')
        btnErase.innerText = 'X'
        btnErase.addEventListener('click', function() {
            array[j].count = 1
            array.splice(j, 1)
            cart.innerHTML = ''
            createCart(array)
            localStorage.setItem('cart', JSON.stringify(array))
        })
        divButton.appendChild(btnErase)
        divText.appendChild(title)
        divText.appendChild(price)
        divImg.appendChild(img)
        cart.appendChild(divImg)
        cart.appendChild(divText)
        cart.appendChild(divButton)
    }    
    let total = array.reduce(function(acc, element) {
        return acc + element.price
    }, 0)
    const totalShow = document.createElement('h5')
    totalShow.innerText = `Il totale nel carrello è: ${total.toFixed(2)} $`
    cart.appendChild(totalShow)

    
    
}

if (carrello) {
    createCart(carrello)
} else {
    carrello = []
}

const searchProduct = function () {
    fetch(URL + productId, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTcwOGYyNjBjYzAwMTVjYzBkZDYiLCJpYXQiOjE3MjE5ODA2ODAsImV4cCI6MTcyMzE5MDI4MH0.BM-Bffn7x4mrYJT06TzOTGpAjF0ItIO21j7f9WF574Q"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("ERROR");
            }
        })
        .then((data) => {
            console.log(data);
            detailsRow.innerHTML = `
            <div class="col-10 col-md-5 text-center">   
                <div class="card">
                    <img src="${data.imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h4 class="card-title">${data.name}</h4>
                        <h5 class="card-title">${data.brand}</h5>
                        <p class="card-text">${data.description}</p>
                        <button type="button" class="btn btn-primary w-25" id="btnBuy" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">${data.price}$ BUY </button>
                    </div>
                </div>                
            </div>`;
            const btnBuy = document.getElementById('btnBuy')
            btnBuy.addEventListener('click', function() {
                carrello.push(data)            
                console.log(carrello)            
                createCart(carrello)
                localStorage.setItem('cart', JSON.stringify(carrello))
            })
            
        })

        .catch((err) => {
            console.log(err);
        });
};

searchProduct();
