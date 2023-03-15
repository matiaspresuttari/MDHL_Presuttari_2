const divElementos = document.getElementById('elementos')
const divCheck = document.getElementById('containerCheck')
const input = document.querySelector('input')

input.addEventListener('input',()=>{
    let arrayFiltrado=filtrarPorTexto(data.events,input.value)
    crearCards(arrayFiltrado)
})

divCheck.addEventListener('change',()=>{
    console.log('cambiando');
})


crearCards(data.events)
crearChecks(data.events)
filtrarPorNombre(data.events)

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
                <small>Price: $${event.price}</small>
                <a href="./details.html?id=${event._id}" type="button" class="btn btn-info mt-2">Details</a>
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
        checkboxes+=`<label>
            <input type="checkbox">
                ${category}
        </label>`
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
    console.log(arrayChecked);
}