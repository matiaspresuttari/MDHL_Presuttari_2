const trAssistance = document.getElementById('assistance')
const trUpcoming = document.getElementById('upcomingRevenues')
const trPast = document.getElementById('pastRevenues')

let date = 20230320
traerData()

function traerData() {
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response=>response.json())
    .then(api=>{
        data=api.events
        assistance(data)
        upcomingEvents(data)
        pastEvents(data)
    }) 
}

function assistance(array){
    let maxAssistName=''
    let maxAssistNum=0
    let minAssistName=''
    let minAssistNum=999999999
    let maxCapacityNum=0
    let maxCapacityName=''
    array.forEach(event=>{
        let eventDateArray=[]
        cont=0
        for (let index = 0; index < 10; index++) {
            if (index!=4 && index!=7) {
                eventDateArray[cont]=event.date[index]
                cont++
            }
        }
        let eventDate = eventDateArray.join('');
        if (eventDate<date) {
            if (((event.assistance/event.capacity)*100)>maxAssistNum) {
                maxAssistNum=((event.assistance/event.capacity)*100)
                maxAssistName=event.name
            }
            if (((event.assistance/event.capacity)*100)<minAssistNum) {
                minAssistNum=((event.assistance/event.capacity)*100)
                minAssistName=event.name
            }
            if (event.capacity>maxCapacityNum) {
                maxCapacityNum=event.capacity
                maxCapacityName=event.name
            }
        }
    })
    let info = ''
    info=`
    <td>${maxAssistName} (${maxAssistNum.toFixed(2)}%)</td>
    <td>${minAssistName} (${minAssistNum.toFixed(2)}%)</td>
    <td>${maxCapacityName} (${maxCapacityNum})</td>
    `
    trAssistance.innerHTML=info
}

function upcomingEvents(array) {
    let info = `
        <tr>
            <th colspan="3">Upcoming events statistics by category</th>
        </tr>
        <tr>
            <td class="subCategory">Categories</td>
            <td class="subCategory">Revenues</td>
            <td class="subCategory">Percentage of attendance</td>
        </tr>
    `
    let arrayCategories = array.map(cat => cat.category)
    let setCategories = new Set(arrayCategories)
    let categories = Array.from(setCategories)
    let revenues=[]
    let attendance=[]
    let capacity=[]
    for (let index = 0; index < categories.length; index++) {
        revenues.push(0)
        attendance.push(0)
        capacity.push(0)
    }
    array.forEach(event=>{
        let eventDateArray=[]
        cont=0
        for (let index = 0; index < 10; index++) {
            if (index!=4 && index!=7) {
                eventDateArray[cont]=event.date[index]
                cont++
            }
        }
        let eventDate = eventDateArray.join('');
        if (eventDate>date) {
            for (let index = 0; index < categories.length; index++) {
                if (event.category==categories[index]) {
                    revenues[index]+=(event.price*event.estimate)
                    attendance[index]+=event.estimate
                    capacity[index]+=event.capacity
                }
            }
        }
    })
    for (let index = 0; index < categories.length; index++) {
        if (attendance[index]!=0) {
            info+=`<tr>
                <td>${categories[index]}</td>
                <td>$${revenues[index].toFixed(1)}</td>
                <td>${((attendance[index]/capacity[index])*100).toFixed(2)}%</td>
            </tr>`
        }
    }
    trUpcoming.innerHTML=info
}

function pastEvents(array) {
    let info = `
        <tr>
            <th colspan="3">Past Events statistics by category</th>
        </tr>
        <tr>
            <td class="subCategory">Categories</td>
            <td class="subCategory">Revenues</td>
            <td class="subCategory">Percentage of attendance</td>
        </tr>
    `
    let arrayCategories = array.map(cat => cat.category)
    let setCategories = new Set(arrayCategories)
    let categories = Array.from(setCategories)
    let revenues=[]
    let attendance=[]
    let capacity=[]
    for (let index = 0; index < categories.length; index++) {
        revenues.push(0)
        attendance.push(0)
        capacity.push(0)
    }
    array.forEach(event=>{
        let eventDateArray=[]
        cont=0
        for (let index = 0; index < 10; index++) {
            if (index!=4 && index!=7) {
                eventDateArray[cont]=event.date[index]
                cont++
            }
        }
        let eventDate = eventDateArray.join('');
        if (eventDate<date) {
            for (let index = 0; index < categories.length; index++) {
                if (event.category==categories[index]) {
                    revenues[index]+=(event.price*event.assistance)
                    attendance[index]+=event.assistance
                    capacity[index]+=event.capacity
                }
            }
        }
    })
    for (let index = 0; index < categories.length; index++) {
        if (attendance[index]!=0) {
            info+=`<tr>
                <td>${categories[index]}</td>
                <td>$${revenues[index].toFixed(1)}</td>
                <td>${((attendance[index]/capacity[index])*100).toFixed(2)}%</td>
            </tr>`
        }
    }
    trPast.innerHTML=info
}