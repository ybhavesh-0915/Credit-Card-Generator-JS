let url = "https://fakerapi.it/api/v2/creditCards?_quantity="
let main = document.querySelector("main");
let qty = document.getElementById("selQty");
let generateBtn = document.getElementById("generateBtn");
let loader = document.createElement("div");
loader.classList.add("loader");
let error = false;

async function appendData() {
    let cardData = await getCardData(url + qty.value)
    loader.remove()
    if (!error) {
        main.removeAttribute("style")
        for (let i = 0; i < qty.value; i++) {
            let num = cardData[i].number;
            let cardNumber = '';
            for (let j = 0; j < num.length; j++) {
                cardNumber += num[j];
                if ((j + 1) % 4 === 0 && j !== num.length - 1) {
                    cardNumber += ' ';
                }
            }
            let cvv = Math.floor(Math.random() * 100) + 100;
            main.innerHTML +=
            `
                <div class="creditCard">
                    <div class="cardUpperFace">
                        <div class="cardName">${cardData[i].type}</div>
                        <div class="cardDetails">
                            <div class="cardNumber">${cardNumber}</div>
                            <div class="validDate">
                                <span>VALID THRU</span>
                                <span>${cardData[i].expiration}</span>
                            </div>
                            <div class="cardHolderName">${cardData[i].owner}</div>
                        </div>
                    </div>
                    <div class="cardLowerface">
                        <div class="serviceNumber">
                            For customer service call +123-456-789
                        </div>
                        <div class="blackBar"></div>
                        <div class="cvvNumber">${cvv}</div>
                        <div class="cont">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, deleniti? Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Vero, debitis.
                        </div>
                    </div>
                </div>
            `
        }
    }else{
        main.innerText = cardData
    }

}

async function getCardData(url) {
    try {
        main.innerHTML = "";
        main.setAttribute("style","height: calc(100vh - 52px); display:flex; justify-content:center; align-items:center;");
        main.appendChild(loader);
        let response = await axios.get(url);
        networkErr = false;
        return response.data.data;
    }
    catch (err) {
        error = true;
        if(navigator.onLine){
            return "Some Error occured try again";
        }else{
            return "Network Error Check your Connection";
        }
    }
}
appendData();
generateBtn.addEventListener("click", appendData);