/********************Event Listeners ***********************/

//1. When the DOM is loaded. Load and display all animals in the data.js

document.addEventListener('DOMContentLoaded', initialize)

//2. When 

/******************** Functions ***********************/

function initialize(){
    //1. Fetch animals for data.js and display them in animals here snippet
    //2. Create a list of elements to append to the existing ul
    //3. Modify inner HTML of the li

    for (const animal of animalData){
        let li = document.createElement('li')
        li.innerHTML = addOneAnimal(animal)
        document.getElementById('animal-list').appendChild(li)
        
    }

    const setFreeBtns = document.getElementsByClassName('setFree')
    for(const setFreeBtn of setFreeBtns){
        setFreeBtn.addEventListener('click', setFree)
    }

    const donateBtns = document.getElementsByClassName('donate')
    for(const donateBtn of donateBtns){
        donateBtn.addEventListener('click', donate)
    }
    
            
}

function addOneAnimal(animal){
    
    return `
        <div class = 'card'>
             <div class = 'content'>
                <img src = ${animal.imageUrl} alt='Image of a/n ${animal.name}'/>
                <p>
                    <strong> Name: </strong> ${animal.name}
                </p><br>
                <p>
                    <strong> Description: </strong>${animal.description}
                </p><br>
                <p>
                    <strong> Donations: </strong>$<span id="donations">${animal.donations}</span>
                </p>
             </div>
             <div class = 'buttons'>
                <button class='donate'>Donate</button>
                <button class='setFree'>Set Free</button>
             </div>

        </div>
    `
}

function setFree(e){
    e.target.parentNode.parentNode.parentNode.remove()
}

function donate(e){
    const targeted = e.target.parentNode.parentNode
    console.log(targeted.donations.value)
}