const BASE_URL = "https://user-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/users/"



const POSTER_URL = BASE_URL + '/posters/'
const users = []
const dataPanel = document.querySelector("#data-panel");

function UserList(data){
    let rawHTML =''

    data.forEach((user) => {
        // title, image, id 隨著每個 item 改變
        
        rawHTML += `
        <div class="col-sm-3">
            <div class="mb-2">
                <div class="card" >
                    <img src="${user.avatar}" class="card-img-top" alt="Movie Poster" data-bs-toggle="modal" data-bs-target="#user-modal">
                    <div class="card-body">
                        <h5 class="card-title">data-modal-user-id="${user.id}">${user.name} ${user.surname}</h5>
                    </div>
                </div>
            </div>
        </div>`
    })
    dataPanel.innerHTML = rawHTML
}
function showUserModal(id) {
    const modalTitle = document.querySelector('#user-modal-title')
    const modalImage = document.querySelector('#user-modal-image')
    const modalEmail = document.querySelector('#user-modal-email')
    const modalGender = document.querySelector('#user-modal-gender')
    const modalAge = document.querySelector('#user-modal-age')
    const modalRegion = document.querySelector('#user-modal-region')
    const modalDate = document.querySelector('#user-modal-date')

    axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">`
    modalEmail.innerText = data.email
    modalGender.innerText = data.gender
    modalAge.innerText = data.age
    modalRegion.innerText = data.region
    modalDate.innerText = 'Birthday: ' + data.birthday
    })
}
dataPanel.addEventListener("click", function onPanelClick(event) {
    let target = event.target
    if (target.matches(".card-img-top")) {
        
        let id = Number(target.dataset.id)
        showUserModal(id)
    }
})


axios.get(INDEX_URL).then((response) => {
    // for(const movie of response.data.results) {
    //     movies.push(movie)
    // }
    console.log(users.push(...response.data.results))
    users.push(...response.data.results)
    UserList(users)
})


