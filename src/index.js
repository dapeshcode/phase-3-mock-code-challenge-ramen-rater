const url = `http://localhost:3000/ramens`
const ramenMenu = document.querySelector('div#ramen-menu')

/********************** fetch ramen *******************/
function fetchRamen() {
    fetch(url) 
    .then(res => res.json())
    .then( allRamen => renderRamen(allRamen))
}


/********************** render ramen *******************/

function renderRamen(allRamen) {
    allRamen.forEach(ramen => {
        renderOneRamenImg(ramen)
    })
}

function renderOneRamenImg({image, id}) {
    
        const img = document.createElement('img')
        img.dataset.id = id
        img.src = image
        ramenMenu.append(img)
}

/********************** event listeners *******************/

ramenMenu.addEventListener('click', (e) => {

    if(e.target.matches('img')) {
        const ramenDetail = ramenMenu.nextElementSibling.children
        const form = document.querySelector('form#ramen-rating')
        form.dataset.id = e.target.dataset.id
        ramenDetail[0].src = e.target.src
        const disName = ramenDetail[1]
        const disRestaurant = ramenDetail[2]
        const disRating = form[0]
        const disComment = form[1]
    


        fetch(`${url}/${e.target.dataset.id}`)
        .then(res => res.json())
        .then(({id, name, restaurant, rating, comment}) => {
            disName.textContent = name
            disRestaurant.textContent = restaurant
            disRating.value = rating
            disComment.value = comment

        })

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            
            fetch(`${url}/${e.target.dataset.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                },
                body: JSON.stringify({rating: disRating.value, comment: disComment.value})
            })
            .then(res => res.json())
            .then(({rating, comment}) => {
                disRating.value = rating
                disComment.value = comment
            })

        })
    }
})


/********************** app init *******************/

fetchRamen()






