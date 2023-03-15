const divElementos = document.getElementById('elementos')

let tarjetas = ''

for(let event of data.events){
    if(event.date[3]>1){
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
    }
}

divElementos.innerHTML = tarjetas
console.log(tarjetas);