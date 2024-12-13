const btnLoad = document.getElementById("load");
const btnModify = document.getElementById("modify");
const btnDelete = document.getElementById("delete");
const btnSelect = document.getElementById("btnSelect");
const carousel = document.getElementById("carousel");
const URL = "https://striveschool-api.herokuapp.com/api/product/";
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const brandInput = document.getElementById("brand");
const imgUrlInput = document.getElementById("imageUrl");
const nameInput1 = document.getElementById("name1");
const descriptionInput1 = document.getElementById("description1");
const priceInput1 = document.getElementById("price1");
const brandInput1 = document.getElementById("brand1");
const imgUrlInput1 = document.getElementById("imageUrl1");
let id
let dataSelected

class myProduct {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _imageUrl;
        this.price = _price;
    }
}
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newProduct = new myProduct(
        nameInput.value,
        descriptionInput.value,
        brandInput.value,
        imgUrlInput.value,
        priceInput.value
    );
    fetch(URL, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ3NGM4YTFjNmFlZTAwMTUxNTMyYTQiLCJpYXQiOjE3MzI3MjU4OTgsImV4cCI6MTczMzkzNTQ5OH0.jrHlu_yBQpJHh5yqlhH3XoqKzg-BqT5rzg2XVehrtt8",
        },
    })
        .then((response) => {
            if (response.ok) {
                alert("PRODUCT SAVED");
            } else {
                alert("OPS...SOMETHING WENT WRONG TRY AGAIN");
                throw new Error("Something went wrong");
            }
        })
        .catch((err) => {
            console.log("ERRORE", err);
        });
});

const modal = function () {
    fetch(URL, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ3NGM4YTFjNmFlZTAwMTUxNTMyYTQiLCJpYXQiOjE3MzI3MjU4OTgsImV4cCI6MTczMzkzNTQ5OH0.jrHlu_yBQpJHh5yqlhH3XoqKzg-BqT5rzg2XVehrtt8",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Qualcosa è andato storto");
            }
        })
        .then((data) => {
            console.log(data);
            displayCarousel(data)
            btnSelect.addEventListener("click", function () {
                let active = document.querySelector("div.active");
                let imgSelected = active.firstElementChild;
                let src = imgSelected.getAttribute("src");

                for (let i = 0; i < data.length; i++) {
                    console.log(data[i])
                    if (data[i].imageUrl === src) {
                        dataSelected = data[i]
                        console.log(dataSelected)
                    }
                }
                nameInput1.value = dataSelected.name;
                descriptionInput1.value = dataSelected.description;
                priceInput1.value = dataSelected.price;
                brandInput1.value = dataSelected.brand;
                imgUrlInput1.value = dataSelected.imageUrl;
                id = dataSelected._id
            });

            btnModify.addEventListener("click", function (e) {
                e.preventDefault();
                if (id) {
                    const newProduct = new myProduct(
                        nameInput1.value,
                        descriptionInput1.value,
                        brandInput1.value,
                        imgUrlInput1.value,
                        priceInput1.value
                    );
                    fetch(URL + id, {
                        method: "PUT",
                        body: JSON.stringify(newProduct),
                        headers: {
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ3NGM4YTFjNmFlZTAwMTUxNTMyYTQiLCJpYXQiOjE3MzI3MjU4OTgsImV4cCI6MTczMzkzNTQ5OH0.jrHlu_yBQpJHh5yqlhH3XoqKzg-BqT5rzg2XVehrtt8",
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            if (response.ok) {
                                alert("PRODUCT MODIFIED!");
                                return response.json()

                            } else {
                                alert("ERROR!");
                                throw new Error("Error in saving the product");
                            }
                        })
                        .then((data) => {
                            window.location.reload()
                        })
                        .catch((err) => {
                            console.log("ERROR", err);
                        });
                } else {
                    alert('You need to select a product')
                }
            });
            btnDelete.addEventListener("click", function (e) {
                e.preventDefault();
                if (id) {
                    if (window.confirm('Sei sicuro?')) {
                        fetch(URL + id, {
                            method: "DELETE",
                            headers: {
                                Authorization:
                                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ3NGM4YTFjNmFlZTAwMTUxNTMyYTQiLCJpYXQiOjE3MzI3MjU4OTgsImV4cCI6MTczMzkzNTQ5OH0.jrHlu_yBQpJHh5yqlhH3XoqKzg-BqT5rzg2XVehrtt8",
                            },
                        })
                            .then((response) => {
                                if (response.ok) {
                                    alert("PRODUCT DELETED!");
                                    return response.json()

                                } else {
                                    alert("ERROR!");
                                    throw new Error("Error in deleting the product");
                                }
                            })
                            .then((data) => {
                                window.location.reload()
                            })
                            .catch((err) => {
                                console.log("ERROR", err);
                            });
                    }
                } else {
                    alert('You need to select a product')
                }
            });
        })

        .catch((err) => {
            console.log(err);
        });
};

modal();
const displayCarousel = function (array) {
    array.forEach((element, index) => {
        if (index === 0) {
            carousel.innerHTML += `
        <div class="carousel-item active">
            <img src="${element.imageUrl}" class="d-block w-100" height="450">
                <div class="carousel-caption d-none d-sm-block">
                    
                </div>
            </div>`;
        } else {
            carousel.innerHTML += `
        <div class="carousel-item">
            <img src="${element.imageUrl}" class="d-block w-100" height="450">
                <div class="carousel-caption d-none d-sm-block">
                    
                </div>
            </div>`;
        }
    });
}