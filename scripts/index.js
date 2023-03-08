const divElementos = document.getElementById('elementos')

let tarjetas = ''

for(let event of data.events){
    tarjetas += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${event.image}">
        <div class="card-body d-flex flex-wrap justify-content-center">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
        </div>
        <div class="card-footer">
            <p class="card-text">${event.date}</p>
            <small>Price: $${event.price}</small>
        </div>
    </div>`
}

divElementos.innerHTML = tarjetas
console.log(tarjetas);