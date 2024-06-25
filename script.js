// api link
let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"

// last edited wont change 
let toBeChangedInputField = null;
let recentChangedInput = null;

// enhancing the dropdown options
const dropdowns = document.querySelectorAll(".country select");
let defaultCountry1 = "INR";
let defaultCountry2 = "USD";
for( let select of dropdowns){ // for of cux this is iterable and not object
    for(let country in countryList){
        let newOption = document.createElement("option");
        newOption.value = country;
        newOption.innerText  =country;
        // adding default values to the dropdowns 
        if(country == defaultCountry1&&select.name == "FROM"){
            newOption.selected = "selected";
        }else if(country==defaultCountry2&&select.name == "TO"){
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }
    // adding functionalities to dropdowns for changing flags
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });
}

// enhancing the input fields
let inputs = document.querySelectorAll(".input");
for(let input of inputs){
    // let id = input.parentElement.querySelector(".input").getAttribute("id");
    let id = input.getAttribute("id");
    input.addEventListener("input",(event)=>{
        // event.target.getAttribute("id");
        recentChangedInput = id;
        for(let other of inputs){
            if(other != event.target){
                toBeChangedInputField = other.getAttribute("id");
            }
        }
    });
}

//  adding functionalities to the `get exchange` button
let exchangeButton = document.querySelector(".exchangeButton");
exchangeButton.addEventListener("click",async (event)=>{
    event.preventDefault();
    if(toBeChangedInputField==null){
        alert("Please provide input");
        return;
    }
    // if(typeof(toBeChangedInputField) == typeof("sdfsdfsdfsdfsdfsdfsdsfsdfsdfsdfsdfsdfsfsdfdfsfsfsfsd"))
    let recentEdit = document.querySelector(`#${recentChangedInput}`);
    let amount = recentEdit.value;
    let toBeChanged = document.querySelector(`#${toBeChangedInputField}`);
    // console.log(toBeChanged.parentElement.querySelector("select").value);
    let ExchangeRate = await getExchangeRate(toBeChanged.parentElement.querySelector("select"));
    let newAmount = amount*ExchangeRate;
    toBeChanged.value = newAmount;
});


// updating the flag image:
const updateFlag = (selected)=>{
    let currCode = selected.value;
    // console.log(currCode);
    flag = countryList[currCode];
    let newSrc = `https://flagsapi.com/${flag}/flat/64.png`;
    selected.parentElement.querySelector("img").src = newSrc;
}

// getting exchange rate
const getExchangeRate = async (selected)=>{
    let toCountry = selected.value.toLowerCase();
    let fromCountry = document.querySelector(`#${recentChangedInput}`).parentElement.querySelector("select").value.toLowerCase();
    if(toCountry==fromCountry) return 1;
    URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCountry}.json`;
    
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Data received from API:", data);

        const key = fromCountry
        // console.log("Key to access in data object:", key);

        if (data.hasOwnProperty(key)) {

            const innerObj = data[key];
            // console.log(typeof(innerObj));

            const excRate = innerObj[toCountry];
            // console.log("Exchange rate retrieved:", excRate);
            return excRate;
        } else {
            console.error(`Key ${key} not found in data object`);
            return null; // Handle the case where the key doesn't exist
        }
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    }
}