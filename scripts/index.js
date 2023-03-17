const divElementos = document.getElementById('elementos')
const divCheck = document.getElementById('containerCheck')
const input = document.querySelector('input')

let data=[]
function traerData() {
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response=>response.json())
    .then(api=>{
        data=api.events
        input.addEventListener('input',filtro)
        divCheck.addEventListener('change',filtro)
        crearCards(data)
        crearChecks(data)
    }) 
}
traerData()

function crearCards(array){
    let tarjetas = ''
    array.forEach(event=>{
        tarjetas += `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${event.image}">
            <div class="card-body d-flex flex-wrap">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <p class="card-text">${event.date}</p>
            </div>
            <div class="card-footer d-flex flex-wrap flex-column ">
                <small><b>Price:</b> $${event.price}</small>
                <a href="./details.html?id=${event._id}" type="button" class="btn btn-info mt-2"><b>Details</b></a>
            </div>
        </div>`
    })
    divElementos.innerHTML = tarjetas
}

function crearChecks(array){
    let arrayCategories = array.map(cat => cat.category)
    let setCategories = new Set(arrayCategories)
    let categories = Array.from(setCategories)
    let checkboxes=''
    categories.forEach(category => {
        checkboxes+=`<div>
                    <input type="checkbox" class='form-check-input' id='${category}' value='${category}'>
                    <label class='form-check-label' for='${category}'>${category}</label>
                </div>`
    })
    divCheck.innerHTML=checkboxes
}

function filtrarPorTexto(array,texto){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function filtrarPorNombre(array){
    let checkboxes=document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecked = arrayChecks.filter(check=>check.checked)
    let arrayCheckedValues = arrayChecked.map(checkChecked=>checkChecked.value)
    let arrayFiltrado = array.filter(elemento=>arrayCheckedValues.includes(elemento.category))
    if (arrayChecked.length>0) {
        return arrayFiltrado
    }
    return array
}

function filtro(){
    let primerFiltro=filtrarPorTexto(data,input.value)
    let segundoFiltro=filtrarPorNombre(primerFiltro)
    crearCards(segundoFiltro)
}