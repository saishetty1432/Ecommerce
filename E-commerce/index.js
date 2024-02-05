let user = JSON.parse(localStorage.getItem("user"));
let login=document.querySelector("#login");
let right=document.querySelector(".right");
console.log(user,login,right);
let menSection = document.querySelector("#menSection")
let womenSection = document.querySelector("#womenSection")
let kidSection = document.querySelector("#kidSection")
let electronicsSection = document.querySelector("#electronicsSection")

let designSection = document.querySelector(".design")

let cartSection=document.querySelector("#cart")
let closeBtn = document.querySelector("#close")

let cartCont=document.querySelector("#cart-cont")

let cartStorage=[]

let total = document.querySelector(".js-total")


closeBtn.addEventListener("click",()=>{
    cartSection.style.right= "-100%"
})

if(user){
    login.remove();
    right.innerHTML = `<a href="./index.html" id="logout"><buttton style="color:white;height:4rem;
    ">Log Out</buttton></a>
    <span style="color:red; font-size:1.4rem">${user.userName}</span>
    <a href=""><i class="fa-sharp fa-solid fa-cart-shopping"></i></a>`;

    let logout=document.querySelector("#logout");
    logout.addEventListener("click",()=>{
        localStorage.removeItem("user");

    })
}


async function products(){
    let data = await fetch("https://www.shoppersstack.com/shopping/products/alpha")
    let allData = await data.json()
    console.log(data,allData);
    let menData = allData.data.filter((e)=>{
        if(e.category == "men"){
            return e;
        }

    })
    console.log(menData);

    let womenData = allData.data.filter((e)=>{
        if(e.category=="women"){
            return e;
        }
    })
    console.log(womenData);

    let kidsData = allData.data.filter((e)=>{
        if(e.category == "kids"){
            return e;
        }
    })
    // console.log(kids);

    let electronicsData = allData.data.filter((e)=>{
        if(e.category == "electronics"){
            return e;
        }
    })
    // console.log(electronics);

    menData.map((e)=>{
        menSection.innerHTML += ` <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>Price: ${e.price}</h3>
        <button type="button">Add to Cart</button>
    </div>`
    })

    womenData.map((e)=>{
        womenSection.innerHTML += ` <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>Price: ${e.price}</h3>
        <button type="button">Add to Cart</button>
    </div>` 

    })

    kidsData.map((e)=>{
        womenSection.innerHTML += ` <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>Price: ${e.price}</h3>
        <button type="button">Add to Cart</button>
    </div>` 

    })

    electronicsData.map((e)=>{
        womenSection.innerHTML += ` <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>Price: ${e.price}</h3>
        <button type="button">Add to Cart</button>
    </div>` 

    })

    let designBtn = designSection.querySelectorAll("button")
    // console.log(designBtn)
    designBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            if(user){
           cartSection.style.right="0"
           let parentElement = btn.parentElement.id;
           console.log(parentElement);
           let product = allData.data.find((e)=>{
            if(parentElement == e.productId)
            // return e.productId == parentElement.id;
            return e;
           })

           cartStorage = cartStorage.filter((e)=>{
            if(e.productId !=product.productId){
                return e;
            }
           })
           cartStorage.push(product)
          

             cartProduct();

          
           }else{
            alert("Please Login First");
           }
        }
        
         
        )
    })
}
products();

function cartProduct(){
    cartCont.innerHTML=""
    cartStorage.map((e)=>{
        cartCont.innerHTML +=`
        <div class="cart-item" id="${e.productId}">
            <div>
                <img src="${e.productImageURLs[0]}" alt="">
                
            </div>
            <div>
                <h3>${e.name}</h3>
                <input type="number">
                <h5>${e.price}</h5>
            </div>
            <div><h4 class="sub">SubTotal ${e.price}</h4></div>
            <div><i class="fa-thin fa-trash-can-xmark"></i></div>
        </div>` 

    })
    removeProduct();
    subtotal()
    grandTotal()
}

function removeProduct(){
    let del = document.querySelectorAll(".fa-trash-can-xmark");
    del.forEach((btn) =>{
        btn.addEventListener("click",() =>{
            let parentId = btn.parentElement.parentElement.id
            console.log(parentId);

            cartStorage = cartStorage.filter((e) =>{
                if(e.productId != parentId){
                    return e
                }
            })
            console.log(cartStorage);
            cartProduct();
            if(cartStorage.length == 0){
                cartSection.style.right= "-100%"
    
    
            }
        })

        // setTimeout(()=>{cartStorage},1000)
      
    })
}

function subtotal(){
    let input = document.querySelectorAll("input")

    input.forEach((quantity)=>{
        quantity.addEventListener("input",()=>{
            if(quantity.value < 1){
                quantity.value = 1;

            }

            let parent = quantity.parentElement.parentElement
            let price = parent.querySelector("h5")
            let sub = parent.querySelector("h4")
            sub.innerHTML = quantity.value*price.innerHTML
           console.log(parent,price,sub);
           grandTotal()
        })

    })

}

function grandTotal(){

    let sub = document.querySelectorAll(".sub")
    let temp = 0
    sub.forEach((e)=>{
       let  subNumber = parseInt(e.innerHTML.replace("SubTotal",""))
        temp +=subNumber

    })

    total.innerHTML = `total : ${temp}`
    console.log(temp)

}