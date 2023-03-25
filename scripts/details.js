const querySearch = document.location.search
const id = new URLSearchParams(querySearch).get("id")
const divElementos = document.getElementById('elementos')
const card = document.createElement('div')

let data=[]
traerData()

function traerData() {
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response=>response.json())
    .then(api=>{
        data=api.events
        detallar()
    }) 
}

function detallar(){
    const eventData = data.find(event=>event._id==id)
    if (eventData.assistance==undefined) {
        card.innerHTML = `
        <div class="card d-flex flex-wrap justify-content-between" id='detail_card' style="width:90vw; height:70vh; ">
            <div class='d-flex justify-content-center align-items-center p-3' style='max-width:40%; height:100%;'>
                <img class="card-img" style='' src="${eventData.image}">
            </div>
            <div class="card-body d-flex flex-column justify-content-between gap-3" style="width:60%; ">
                <div id='card-font' class='d-flex flex-wrap flex-column justify-content-between' style='height:90%'>
                    <h5 class="card-title">${eventData.name}</h5>
                    <p class="card-text">${eventData.description}</p>
                    <p class="card-text"><b>Category:</b> ${eventData.category}</p>
                    <p class="card-text"><b>Place:</b> ${eventData.place}</p>
                    <p class="card-text"><b>Capacity:</b> ${eventData.capacity} people</p>
                    <p class="card-text"><b>Estimate:</b> ${eventData.estimate} people</p>
                </div>
                <div id='card-font' class="card-footer d-flex flex-wrap justify-content-between" style='height:10%'>
                    <p class="card-text"><b>Price:</b> $${eventData.price}</p>
                    <p class="card-text"><b>Date:</b> ${eventData.date}</p>
                </div>
            </div>
        </div>
        `
    } else {
        card.innerHTML = `
        <div class="card d-flex flex-wrap justify-content-between" id='detail_card' style="width:90vw; height:70vh;">
            <div class='d-flex justify-content-center align-items-center p-3' style=' width:40%; height:100%;'>
                <img class="card-img" style='' src="${eventData.image}">
            </div>
            <div class="card-body d-flex flex-column justify-content-between gap-3" style="width:60%;">
                <div id='card-font' class='d-flex flex-wrap flex-column justify-content-between' style='height:90%'>
                    <h5 class="card-title">${eventData.name}</h5>
                    <p class="card-text">${eventData.description}</p>
                    <p class="card-text"><b>Category:</b> ${eventData.category}</p>
                    <p class="card-text"><b>Place:</b> ${eventData.place}</p>
                    <p class="card-text"><b>Capacity:</b> ${eventData.capacity} people</p>
                    <p class="card-text"><b>Assistance:</b> ${eventData.assistance} people</p>
                </div>
                <div id='card-font' class="card-footer d-flex flex-wrap justify-content-between" style='height:10%'>
                    <p id='card-font' class="card-text"><b>Price:</b> $${eventData.price}</p>
                    <p id='card-font' class="card-text"><b>Date:</b> ${eventData.date}</p>
                </div>
            </div>
        </div>
        `
    }
    divElementos.appendChild(card)
}