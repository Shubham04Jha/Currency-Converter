// api link
let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"

// enhancing the dropdown options
const dropdowns = document.querySelectorAll(".country select");
let defaultCountry1 = "INR";
let defaultCountry2 = "USD";
for( let select of dropdowns){ // for of cux this is iterable and not object
    for(let country in countryList){
        let newOption = document.createElement("option");
        newOption.value = country;
        newOption.innerText  =country;
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

//  adding functionalities to the get exchange button
let exchangeButton = document.querySelector(".exchangeButton");
exchangeButton.addEventListener("click",(event)=>{
    event.preventDefault();
    
})










// updating the flag image:
const updateFlag = (selected)=>{
    let currCode = selected.value;
    // console.log(currCode);
    flag = countryList[currCode];
    let newSrc = `https://flagsapi.com/${flag}/flat/64.png`;
    selected.parentElement.querySelector("img").src = newSrc;
}