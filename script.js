const url = `https://ostapmykhailiv.github.io/pr7/itemsList.json`
const section = document.getElementById('items-carousel')
axios.get(url)
    .then(data=>{
        displayItems(data.data)
    })
function displayItems(itemsList){
    for(let i=0; i<itemsList.length; i++){
        let article = document.createElement('article')
        let note = document.createElement('div')
        if(itemsList[i].note !== null){
            if (itemsList[i].note === 'Новинка!'){

                note.className = 'note'
                note.textContent = 'Новинка!'
            }
            else {
                note.className = 'note'
                note.textContent = 'Хіт продажів!'
            }
        }

        let titleDiv = document.createElement('div')
        let titleText = document.createElement('p')
        titleDiv.className = 'title-div'
        titleText.innerText = itemsList[i].title
        titleText.style.margin = '10px'
        titleDiv.append(note, titleText)

        let itemDiv = document.createElement('div')
        let img = document.createElement('img')
        let name = document.createElement('p')
        let priceDiv = document.createElement('div')
        let price = document.createElement('p')
        let button = document.createElement('button')
        itemDiv.className = 'item-div'
        priceDiv.className = 'price-div'
        img.src = itemsList[i].image
        name.innerText = itemsList[i].name

        if(itemsList[i].is_valid){
            let thePrice = priceCheck(itemsList[i].price, itemsList[i].sale)
            if(thePrice === itemsList[i].price){
                price.innerText = itemsList[i].price + 'UAH'
                button.innerText = 'У корзину'
                button.className = 'button-A'
                priceDiv.appendChild(price)
            }
            else{
                let oldPrice = document.createElement('p')
                oldPrice.innerText = itemsList[i].price + 'UAH'
                oldPrice.style.textDecoration = 'line-through'
                oldPrice.style.fontSize = '12px'
                price.innerText = thePrice + 'UAH'
                button.innerText = 'У корзину'
                button.className = 'button-A'
                priceDiv.append(oldPrice, price)
            }
        }
        else{
            button.innerText = 'Незабаром у продажі'
            button.className = 'button-NA'
        }

        itemDiv.append(img, name, priceDiv, button)
        article.append(titleDiv, itemDiv)
        section.appendChild(article)
    }
}

function priceCheck(price, sale){
    if(price){
        if(sale){
            price = price - (price*sale)
            return price
        }
        else{
            return price
        }
    }else{
        return 0
    }
}