const querySearch = document.location.search
const id = new URLSearchParams(querySearch).get("id")
const divElementos = document.getElementById('elementos')
const card = document.createElement('div')
const eventData = data.events.find(event=>event._id==id)

card.innerHTML = `<div class="card mb-4" id='detail_card' style="width: 22rem;">
<img class="card-img-top" src="${eventData.image}">
<div class="card-body d-flex flex-wrap flex-column">
    <h5 class="card-title">${eventData.name}</h5>
    <p class="card-text">${eventData.description}</p>
    <p class="card-text"><b>Category:</b> ${eventData.category}</p>
    <p class="card-text"><b>Place:</b> ${eventData.place}</p>
    <p class="card-text"><b>Capacity:</b> ${eventData.capacity} - Estimate: ${eventData.assistance}</p>
</div>
<div class="card-footer d-flex flex-wrap flex-column ">
    <small>Price: $${eventData.price} / Date: ${eventData.date}</small>
</div>
</div>`
divElementos.appendChild(card)