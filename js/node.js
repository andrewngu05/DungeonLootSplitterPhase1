//Array to store the loot

const loot = [];

//declared varables at the top

let input = "";
let value = 0;
let totalValue = 0;
let partySize = 0;

//Variables that are from html
const partyInput = document.getElementById("partySize");
const nameInput = document.getElementById("lootName");
const valueInput = document.getElementById("lootValue");
const addButton = document.getElementById("addLootButton");
const splitButton = document.getElementById("splitLootButton");
const lootMessage = document.getElementById("lootMessage");
const splitMessage = document.getElementById("splitMessage");
const lootList = document.getElementById("lootList");
const totalLoot = document.getElementById("totalLoot");
const splitTotal = document.getElementById("splitTotal");
const perMember = document.getElementById("perMember");

//This will add up all the values in the array and display the total loot amount
function calculateTotal(){
    totalValue = 0;

    for(let i = 0; i < loot.length; i++){
        totalValue = totalValue + loot[i].value;
    }

    return totalValue;
}

//updates the loot list and the total value of the loot from the array
function renderLoot(){
    lootList.textContent = "";

    for(let i = 0; i < loot.length; i++){
        const listItem = document.createElement("li");
        listItem.textContent = "[" + (i + 1) + "] " + loot[i].name + " - $" + loot[i].value.toFixed(2);
        lootList.appendChild(listItem);
    }

    totalLoot.textContent = "$" + calculateTotal().toFixed(2);
}

//using function to ensure that the code runs when ever the add button is pressed
function addLoot(event){

    //stops page from rreloading
    event.preventDefault();

    //reads the loots name and value
    input = nameInput.value.trim();
    value = Number(valueInput.value);

    //checks that name and values will work
    if(input === ""){
        message.textContent = "Please enter a loot name.";

    }else if(valueInput.value === "" || isNaN(value)){
        message.textContent = "Loot value must be a valid number.";

    }else if(value < 0){
        message.textContent = "Loot value cannot be negative.";

    }else{
        //this makes it so that once the input is accepted the old messages will go away
        lootMessage.textContent = "";

        //Creates a object for the loot to enter into the array
        const item = {name: input, value: value };
        loot.push(item);

        renderLoot();

        splitMessage.textContent = "";
        splitTotal.textContent = "$0.00";
        perMember.textContent = "$0.00";

        //This cleans the text box and puts the cursor back
        nameInput.value = "";
        valueInput.value = "";
        nameInput.focus();
    }
}

//This piece of code handles the loot splitting button
function splitLoot(){
    partySize = Number(partyInput.value);

    //This checks if the party size is a whole number and includes at least one member as well as ensures that there is actual loot to split
    if(partyInput.value === "" || isNaN(partySize)){
        splitMessage.textContent = "Please enter the number of part members.";
    
    }else if(!Number.isInteger(partySize)){
        splitMessage.textContent = "Party size must be a whole number.";

    }else if(partySize < 1){
        splitMessage.textContent = "Party size must be 1 or greater.";

    }else if(loot.length === 0){
        splitMessage.textContent = "There is no loot to split yet.";

    }else{
        splitMessage.textContent = "";

        calculateTotal();
        splitTotal.textContent = "$" + totalValue.toFixed(2);
    }
}

//This will check to see when the button is clicked and will run the buttons program
addButton.addEventListener("click", addLoot);
splitButton.addEventListener("click", splitLoot);