var oXHR = new XMLHttpRequest();
oXHR.onreadystatechange = reportStatus;
oXHR.open("GET", "products.json", true);  // get json file.
oXHR.send();


function reportStatus() {
    if (this.readyState == 4 && this.status == 200) {
        //document.getElementById("showData").innerHTML =
        createNew(this.responseText);
      }

    xhttp.open("GET", "products.json", true);
    xhttp.send();
}

function createNew(jsonData){
    
    var productX = JSON.parse(jsonData);
    for (var i = 0; i < productX.length; i++ ){
    document.getElementsByClassName('shop-item-title')[i].innerText = productX[i].name
    document.getElementsByClassName('shop-item-price')[i].innerText = '$' + productX[i].price/100
    document.getElementsByClassName('shop-item-id')[i].innerText = productX[i].id
    }
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
    reportStatus()
}

   
function ready() {  
   
      //alert("xxx")
      //var obj = JSON.parse(xjson)
      //alert("xxx"+ obj.response.jsonBody.length)

      //for (var i = 0; i<obj.response.jsonBody.length;i++ ){
       // document.getElementsByClassName('shop-item-title')[i].innerText = obj.response.jsonBody[i].name
        //document.getElementsByClassName('shop-item-price')[i].innerText = '$' + obj.response.jsonBody[i].price/100
        //document.getElementsByClassName('shop-item-id')[i].innerText =  obj.response.jsonBody[i].id
      //}
    
      
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    var addToCartButtons1 = document.getElementsByClassName('shop-item-button1')

        addToCartButtons1[0].addEventListener('click', addToCartClicked1)

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    document.getElementsByClassName('myText')[0].addEventListener('change', addPromotion)

    
   
    
}

function addPromotion(){
    
    var promotions = document.getElementsByClassName('myText')[0].value
    document.getElementsByClassName('shop-item-price')[0].innerText = promotions

    updateCartTotal()
    
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src 
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addToCartClicked1(event) {
    var button = event.target
    
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    //var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var promotions = document.getElementById('promo').value
    var price = -promotions
    
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()

}


function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


//.then(response => response.json()) 
//.then(json => console.log(json))
//.catch(err => console.log(err));

//var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
//request.open('GET', 'http://localhost:8081/products', true)
 



