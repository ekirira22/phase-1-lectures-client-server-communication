document.addEventListener('DOMContentLoaded', initialRender)
//Initial Render
//Get Data and render our animals to the DOM

//DOM Render Functions
function renderOneAnimal(animal){
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
        <img src = "${animal.imageUrl}" />
        <div class = "content">
            <h4> Animal Name </h4>
            <p>
                $<span class="donation-count">${animal.donations}</span> Donated
            </p>
            <p>${animal.description}</p>
        </div>
        <div class = "buttons">
            <button> Donate $10 </button>
            <button> Set Free </button>

        </div>
    `
//Add Animal card to DOM
document.querySelector('#animal-list').appendChild(card)
    // console.log(card)
}

//Fetch Requests
//Get Data from JSON File and render the data using getAllAnimals functions
function getAllAnimals(){
    //An Async function that takes an amount of time
    fetch('http://127.0.0.1:3000/animalData')
            // This gets our response however it is still not usable it has to be json
        .then(result => result.json()) //json is still an async function. Another .json will suffice
            .then(data => data.forEach(animal => renderOneAnimal(animal)))
}

function initialRender(){
    //grab animaldata and do a forEach on it. For every animal I would like to render that animal
    // animalData.forEach(animal => renderOneAnimal(animal))
    getAllAnimals() 
}