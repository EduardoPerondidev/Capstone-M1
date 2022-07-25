const menu        = document.querySelector(".menu-buttons");
const cartDiv     = document.querySelector(".cart-div");
const searchForm  = document.querySelector(".search-form");
const itemList    = document.querySelector(".item-list");

function insertDatabaseOnHTML(data){
    itemList.innerHTML = ''
    for(let i = 0; i < data.length; i++){
        let li = document.createElement('li')
        li.className = 'list-item'

        let figure = document.createElement('figure')
        figure.className = 'item-img'
        let img = document.createElement('img')
        img.className = 'img'
        img.src = data[i].img
        figure.appendChild(img)
        li.appendChild(figure)

        let productContent = document.createElement('div')
        productContent.className = 'product-content';
        let itemCategory = document.createElement('h3')
        itemCategory.className = 'item-category'
        itemCategory.innerText = data[i].tag

        let itemName = document.createElement('h2')
        itemName.className = 'item-name'
        itemName.innerText = data[i].nameItem

        let itemDescription = document.createElement('p')
        itemDescription.className = 'item-description'
        itemDescription.innerText = data[i].description

        let itemPrice = document.createElement('p')
        itemPrice.className = 'item-price'
        itemPrice.innerText = `R$ ${data[i].value}.00`

        let addToCartButton = document.createElement('button')
        addToCartButton.className = 'add-to-cart-button'
        addToCartButton.innerText = data[i].addCart
        addToCartButton.id = `${data[i].id}`

        productContent.append(itemCategory, itemName, itemDescription, itemPrice, addToCartButton)

        li.appendChild(productContent)
        itemList.appendChild(li)
    }
}
insertDatabaseOnHTML(data)

let cartArray = []
itemList.addEventListener('click', function(e){
    let btn = e.target
    if(btn.tagName == 'BUTTON'){
        let index = btn.id - 1
        cartArray.push(data[index])
        insertItemOnCart(cartArray)
    }
})

let cartList = document.createElement('ul')
cartList.className = 'cart-list'
let totalPrice = 0;

function insertItemOnCart(array){
    cartList.innerHTML = ''
    cartDiv.innerHTML = `
    <h2 class="cart-title">Carrinho de compras</h2>
    `

    cartDiv.classList.remove('empty')
    totalPrice = 0
    for(let i = 0; i < array.length; i++){
        
        totalPrice += array[i].value

        let cartItem = document.createElement('li')
        cartItem.className = 'cart-item'

        let cartFigure = document.createElement('figure')
        cartFigure.className = 'cart-figure'
        let cartImg = document.createElement('img')
        cartImg.className = 'cart-img'
        cartImg.src = array[i].img
        cartFigure.appendChild(cartImg)
        cartItem.appendChild(cartFigure)

        let itemContent = document.createElement('div')
        itemContent.className = 'item-content'

        let cartName = document.createElement('p')
        cartName.className = 'cart-name'
        cartName.innerText = array[i].nameItem

        let cartPrice = document.createElement('p')
        cartPrice.className = 'cart-price'
        cartPrice.innerText = `R$ ${array[i].value}.00`

        let cartRemoveButton = document.createElement('button')
        cartRemoveButton.className = 'cart-remove-button'
        cartRemoveButton.id = `${i}`
        cartRemoveButton.innerText = 'Remover produto'

        itemContent.append(cartName, cartPrice, cartRemoveButton)
        cartItem.appendChild(itemContent);
        cartList.appendChild(cartItem)
    }
    let cartTotal = document.createElement('div')
    cartTotal.className = 'cart-total'

    let quantityText = document.createElement('p')
    quantityText.className = 'quantity-text'
    quantityText.innerText = 'Quantidade:'
    let quantity = document.createElement('span')
    quantity.className = 'quantity'
    quantity.innerText = `${cartArray.length}`
    quantityText.appendChild(quantity)

    let totalText = document.createElement('p')
    totalText.className = 'total-text'
    totalText.innerText = 'Total:'
    let total = document.createElement('span')
    total.className = 'total-price'
    total.innerText = `R$ ${totalPrice}.00`
    totalText.appendChild(total)

    cartTotal.append(quantityText, totalText)
    cartDiv.appendChild(cartList)
    cartDiv.appendChild(cartTotal)
}

cartList.addEventListener('click', function(e){
    let removebtn = e.target
    if(removebtn.tagName == 'BUTTON'){
        let index = removebtn.id
        console.log(index)
        cartArray.splice(index, 1)
        if(cartArray.length > 0){
            insertItemOnCart(cartArray)
        }
        else{
            emptyCart()
        }
    }
})

function emptyCart(){
    cartDiv.classList.add('empty')
    cartDiv.innerHTML = `
    <h2 class="cart-title">Carrinho de compras</h2>
    <div class="empty-cart">
        <h2 class="empty-title">Carrinho Vazio</h2>
        <p class="empty-text">Adicione itens</p>
    </div>
    `
}

searchForm.addEventListener('input', function(e){
    e.preventDefault();
    let itemSearched = document.querySelector('.search-input').value
    filterList(itemSearched);
    removeActive(menuButtons)
    menuButtons[0].classList.add('active')
})
searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    let itemSearched = document.querySelector('.search-input').value
    let itemSearchedInput = document.querySelector('.search-input')
    filterList(itemSearched);
    removeActive(menuButtons)
    menuButtons[0].classList.add('active')
    itemSearchedInput.value = ''
})

function filterList(string){
    let filteredArray = []
    let input = string.toLowerCase()
    for(let i = 0; i < data.length; i++){
        let itemName = data[i].nameItem.toLocaleLowerCase()
        if(itemName.includes(input)){
            filteredArray.push(data[i]);
        }
    }
    insertDatabaseOnHTML(filteredArray)
    filteredArray.length < 1 ? noItems() : null

}

function filterListCategory(string){
    let filteredArray = []
    let input = string.toLowerCase()
    input == 'todos' ? input = '' : null
    for(let i = 0; i < data.length; i++){
        let itemName = data[i].tag[0].toLocaleLowerCase()
        if(itemName.includes(input)){
            filteredArray.push(data[i]);
        }
    }
    insertDatabaseOnHTML(filteredArray)
    input == 'calçados' ? noItems() : null
}
const menuButtons = document.querySelectorAll('.nav-button');
menu.addEventListener('click', function(e){
    let menubtn = e.target
    if(menubtn.tagName == 'BUTTON'){
        removeActive(menuButtons)
        menubtn.classList.add('active')
        filterListCategory(menubtn.innerText)
    }
})

function removeActive(array){
    array.forEach(category => {
        category.classList.remove('active')
    });
}

function noItems(){
    itemList.innerHTML = ''
    const noItemLi = document.createElement('li')
    noItemLi.className = 'no-items'
    
    const noItemH3 = document.createElement('h3')
    noItemH3.className = 'no-items-text'
    noItemH3.innerText = 'Desculpe, não encontramos o produto pesquisado...'
    noItemLi.appendChild(noItemH3)

    itemList.appendChild(noItemLi)
}