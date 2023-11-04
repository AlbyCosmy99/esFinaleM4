let products = [
    {
        'name': 'New Tiffany Albero di Natale',
        'description': 'Albero di natale',
        'brand': 'Flora srl',
        'imageUrl': 'https://m.media-amazon.com/images/I/6137rMqJ6lL._AC_SY879_.jpg',
        'price': 99.0
    },

]

window.onload = function() {
    sessionStorage.setItem('navbar-toggled', 'false');
    if(screen.width <= '987') {
        document.querySelector('#total').style.display = 'none'
        document.querySelector('#navbar-btn-toggle').addEventListener('click', () => {
            sessionStorage.setItem('navbar-toggled', sessionStorage.getItem('navbar-toggled') === 'true' ? 'false' : 'true');
            if(sessionStorage.getItem('navbar-toggled') === 'true') {
                document.querySelector('#total').setAttribute('style','color: red;opacity:1')
            }
            else {
                document.querySelector('#total').setAttribute('style','color: red;opacity:0')
            }
        })
    }
    getProducts();
}

async function getProducts() {
    fetch('https://striveschool-api.herokuapp.com/api/product', {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0MzA3MWQxNTViODAwMTQxYTI3YjMiLCJpYXQiOjE2OTg5Njc2NjUsImV4cCI6MTcwMDE3NzI2NX0.rIMqm_xBUXakj2K3p7h4t02u_KoohyZ74srIaW5E0C8' 
        }
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('products',JSON.stringify(data))
    })
    .then(() => {
        updateProducts();
    })
    .catch((err) => {
        console.log(err)
        tooManyRequests()
    });

}
function tooManyRequests() {
    let time = 20;
    let btn = document.querySelector('#tooManyRequestsBtn')
    btn.click()
    let count = document.querySelector('#countdown')
    count.innerHTML = time
    for(let i=1;i<=time;i++) {
        setTimeout(() => {
            count.innerHTML = count.innerHTML -1
        },1000*i)
    }
    setTimeout(() => {
        window.location.reload()
    }, time*1000);
}

function updateProducts() {
    let arr = JSON.parse(localStorage.getItem('products'))
    let mappedProducts = []

    if(arr) {
        mappedProducts = arr.map(elem => {
            return `
            <div class="card" style="text-align: center;background-color: #faf13e;margin-bottom:1rem;margin-top:0">
                <div class="card-body product">
                    <div class="product-main-info"> 
                    <img id="product-image" src="${elem.imageUrl}"/>
                    <div class="product-title-brand">
                        <h3 style="margin: 0;">${elem.name}</h3>
                        <p>${elem.brand}</p>
                    </div>
                    </div>
                    <div class="product-description">${elem.description}</div>
                    <div class="product-price">$${elem.price}</div>
                    <div class="modify-delete-product">
                    <svg onclick="setUpdateProduct('${elem._id}')" data-bs-toggle="modal" data-bs-target="#updateProductModal" style="margin-right: 0.5rem;cursor:pointer;" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#FC9D03" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    <svg onclick="removeProduct('${elem._id}')" style="margin-left: 0.5rem;cursor:pointer;" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#f70a0a" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                    </div>
                </div>
            </div>
            `
        })
    }
    
    if(mappedProducts.length > 0) {
        hideEmptyMsg()
        let products = document.querySelector('#products')
        products.className = ''
        products.innerHTML = mappedProducts.join('')
    }
    else {
        showEmptyMsg()
    }
    document.querySelector('#total').innerHTML = arr.length
}

function setUpdateProduct(id) {
    sessionStorage.setItem('update-id',id)
    let arr = JSON.parse(localStorage.getItem('products'))
    let elem = arr.filter(el => el._id === id)

    document.querySelector('.update-product-modal .form-group #name').value  = elem[0].name
    document.querySelector('.update-product-modal .form-group #description').value = elem[0].description
    document.querySelector('.update-product-modal .form-group #brand').value = elem[0].brand
    document.querySelector('.update-product-modal .form-group #image-url').value = elem[0].imageUrl;
    document.querySelector('.update-product-modal .form-group #price').value = elem[0].price
    
}

function showEmptyMsg() {
    let msg = document.querySelector('#products')
    msg.className = 'empty-cart';
    msg.style.height = `${screen.height/2}px`;

    msg.innerHTML = `
        <div class="card" style="text-align: center;">
            <div class="card-body">
                <div class="empty-cart-location">
                    <div class="arrow-location" style="margin-bottom:2rem;">
                        <div class="arrow">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <b style="margin: 0;">Currently the cart is empty. Add some products!</b>
                    <br>
                    <button onclick="addTestProducts()" style="margin-top: 1rem;" type="button" class="btn btn-warning">Press here to add some products only for test</button>
                </div>
            </div>
        </div> 
    `
}

function hideEmptyMsg() {
    let msg = document.querySelector('#products')
    msg.className = '';
    msg.style.height = '100%';
    let msgCard = document.querySelector('#products .card');
    msgCard.style.display = 'none';
}

// type 0 -> add
// type 1 -> update

function setUpdateOrAdditionProduct(type, modal) {
    let name = document.querySelector(`${modal} .form-group #name`).value
    let description = document.querySelector(`${modal} .form-group #description`).value
    let brand = document.querySelector(`${modal} .form-group #brand`).value
    let imageUrlInput = document.querySelector(`${modal} .form-group #image-url`);
    let image = null;

    if(!imageUrlInput.disabled) {
        image = document.querySelector(`${modal} .form-group #image-url`).value
    }
    else {
        image = document.querySelector(`${modal} .form-group #image-file`).value
        let imageArr = image.split(`\\`)
        image = `assets/${imageArr[imageArr.length-1]}`
    }
    
    let price = document.querySelector(`${modal} .form-group #price`).value

    let mustName = document.querySelector(`${modal} #must-name`)
    let mustDescription = document.querySelector(`${modal} #must-description`)
    let mustBrand = document.querySelector(`${modal} #must-brand`)
    let mustImage = document.querySelector(`${modal} #must-image`)
    let mustPrice = document.querySelector(`${modal} #must-price`)

    if(!name || !description || !brand || !image || !price) { 

        if(!name || name.length === 0) {
            mustName.style.display = 'block'
        }
        else {      
            mustName.style.display = 'none'
        }
   
        if(!description || description.length === 0) {
            mustDescription.style.display = 'block'
        }
        else {      
            mustDescription.style.display = 'none'
        }
        
        if(!brand || brand.length === 0) {
            mustBrand.style.display = 'block'
        }
        else {      
            mustBrand.style.display = 'none'
        }
        
        if(!image || image.length === 0) {
            mustImage.style.display = 'block'
        }
        else {      
            mustImage.style.display = 'none'
        }
        
        if(!price || price.length === 0) {
            mustPrice.style.display = 'block'
        }
        else {      
            mustPrice.style.display = 'none'
        }
    }
    else {
        // document.querySelector('#addNewProduct').setAttribute('data-bs-dismiss','modal')
        let obj = {
            'name': name,
            'description': description,
            'brand': brand,
            'imageUrl': image,
            'price': price
        }

        if(type === 0) {
            addProduct(obj)
        }
        else if(type === 1) {
            updateProduct(obj)
        }
    }   
}

function addProduct(obj) {
    fetch(`https://striveschool-api.herokuapp.com/api/product`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0MzA3MWQxNTViODAwMTQxYTI3YjMiLCJpYXQiOjE2OTg5Njc2NjUsImV4cCI6MTcwMDE3NzI2NX0.rIMqm_xBUXakj2K3p7h4t02u_KoohyZ74srIaW5E0C8' 
        }
    })
    .then(res => res.json())
    .then(() => {
        getProducts()
        window.location.reload()
    })
    .catch((err) => {
        console.log(err)
        tooManyRequests()
    })
}

function updateProduct(obj) {
    let id = sessionStorage.getItem('update-id')
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0MzA3MWQxNTViODAwMTQxYTI3YjMiLCJpYXQiOjE2OTg5Njc2NjUsImV4cCI6MTcwMDE3NzI2NX0.rIMqm_xBUXakj2K3p7h4t02u_KoohyZ74srIaW5E0C8' 
        }
    })
    .then(res => res.json())
    .then(() => {
        getProducts()
        window.location.reload()
        sessionStorage.setItem('update-id',-1)
    })
    .catch((err) => {
        console.log(err)
        tooManyRequests()
    })
}

async function addTestProducts() {
    const proms = products.map(elem => {
        return fetch('https://striveschool-api.herokuapp.com/api/product', {
            method: 'POST',
            body: JSON.stringify(elem),
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0MzA3MWQxNTViODAwMTQxYTI3YjMiLCJpYXQiOjE2OTg5Njc2NjUsImV4cCI6MTcwMDE3NzI2NX0.rIMqm_xBUXakj2K3p7h4t02u_KoohyZ74srIaW5E0C8' 
            }
            })
            .catch((err) => {
                console.log(err)
                tooManyRequests()
            })
    })

    await Promise.all(proms)
    getProducts()
}

function removeProduct(id) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0MzA3MWQxNTViODAwMTQxYTI3YjMiLCJpYXQiOjE2OTg5Njc2NjUsImV4cCI6MTcwMDE3NzI2NX0.rIMqm_xBUXakj2K3p7h4t02u_KoohyZ74srIaW5E0C8' 
        }
    })
    .then(res => res.json())
    .then(() => {
        getProducts()
    })
    .catch((err) => {
        console.log(err)
        tooManyRequests()
    })
}


function modifyProduct(id) {
    let obj = {}
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0MzA3MWQxNTViODAwMTQxYTI3YjMiLCJpYXQiOjE2OTg5Njc2NjUsImV4cCI6MTcwMDE3NzI2NX0.rIMqm_xBUXakj2K3p7h4t02u_KoohyZ74srIaW5E0C8' 
        }
    })
    .then(res => res.json())
    .then(() => {
        getProducts()
    })
    .catch((err) => {
        console.log(err)
        tooManyRequests()
    })
}

async function emptyCart() {
let arr = JSON.parse(localStorage.getItem('products'))

    const dels = arr.map(elem => {
        return fetch(`https://striveschool-api.herokuapp.com/api/product/${elem._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0MzA3MWQxNTViODAwMTQxYTI3YjMiLCJpYXQiOjE2OTg5Njc2NjUsImV4cCI6MTcwMDE3NzI2NX0.rIMqm_xBUXakj2K3p7h4t02u_KoohyZ74srIaW5E0C8' 
        }
        })
        .catch((err) => {
            console.log(err)
            tooManyRequests()
        })
    })

    await Promise.all(dels)

    getProducts()
}

function switchImageType(modal) {
    let input = document.querySelector(`${modal} #image-product`)
    if(!input) {
        input = document.querySelector(`${modal} #image-product1`)
    }
    let imageUrl = document.querySelector(`${modal} #image-url`)
    let imageFile = document.querySelector(`${modal} #image-file`)

    if(input.checked) {
        imageUrl.disabled = 'true'
        imageFile.disabled = null
    }
    else {
        imageUrl.disabled = null
        imageFile.disabled = 'true'
    }
}
