// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const search =document.querySelector(`[search-bar]`);


//===Fetch Function ===//
fetch('https://randomuser.me/api/?results=12&nat=us')
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
// store the employee HTML as we create it
    let employeeHTML = '';
// loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
    // template literals make this so much cleaner!
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

//==Lightbox Effect==/
function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    
    <div class= "lightbox" data-index="${index}">

        <img class="avatar" src="${picture.large}" />
        <div class="text-container lightbox-text">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    modal.style.display = "block";
    }
//-----------------------------//    
//--FUNCTION TO MAKE LIGHTBOX--//
//-----------------------------//
gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });

//-----------------------//
//----ARROW FUNCTION-----//
//-----------------------//
const arrowContainer = document.querySelector(".lightbox-arrow");
const arrowLeft = document.querySelector(".fa-arrow-left");
const arrowRight = document.querySelector(".fa-arrow-right");

arrowContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target === arrowLeft) {
        const card = e.target.closest(".card");
        let index = card.getAttribute('data-index');
        index -= 1;
        displayModal(index);
    } else if (e.target === arrowRight) {
        const lightbox = e.target.closest(".lightbox");
        // let index = card.getAttribute('.data-index');
        // index += 1;
        // displayModal(index);
        console.log(`${lightbox}`);
    }
});

//------------------------//
//----SEARCH FUNCTION-----//
//------------------------//

search.addEventListener("input",(e) => {
    const value = e.target.value;
    employees.forEach(user => {
        const first = user.name.first;
        const last = user.name.last
        const email= user.email;

        const searched = first.includes(value) || email.includes(value) || last.includes(value);
        user.element.classList.toggle("hide", !searched);
    })
});