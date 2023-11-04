window.onload = function() {
    let params = new URLSearchParams(window.location.search)
    let id = params.get('id')
    let elem = JSON.parse( localStorage.getItem('products')).filter(el => el._id === id)[0]

    let cardCont = document.querySelector('.my-card-container')
    cardCont.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img style="wdith:100%" src="${elem.imageUrl}" class="card-img-top" alt="${elem.description}">
        <div class="card-body">
            <h5 class="card-title">${elem.name}</h5>
            <p class="card-text">${elem.brand}</p>
            <p class="card-text">${elem.description}</p>
            <p class="card-text">$${elem.price}</p>
        </div>
    </div>
    `

}