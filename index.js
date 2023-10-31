// const BASE_URL = 'https://webdev.alphacamp.io'
// const INDEX_URL = BASE_URL + '/api/movies'
// const POSTER_URL = BASE_URL + '/posters/'
// const movies =[]
// const dataPanel = document.querySelector('#data-panel')
// const searchForm = document.querySelector('#search-form')
// const searchInput = document.querySelector('#search-input')

// function renderMovieList(data){
//     let rawHTML =''

//     data.forEach((item) => {
//         // title, image, id 隨著每個 item 改變
//         rawHTML += `<div class="col-sm-3">
//         <div class="mb-2">
//         <div class="card">
//         <img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie Poster">
//         <div class="card-body">
//             <h5 class="card-title">${item.title}</h5>
//         </div>
//         <div class="card-footer">
//             <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
//             <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
//         </div>
//         </div>
//         </div>
//     </div>`
//     })
//     dataPanel.innerHTML = rawHTML
// }

// function showMovieModal(id) {
//     const modalTitle = document.querySelector('#movie-modal-title')
//     const modalImage = document.querySelector('#movie-modal-image')
//     const modalDate = document.querySelector('#movie-modal-date')
//     const modalDescription = document.querySelector('#movie-modal-description')

//     axios.get(INDEX_URL + id).then((response) => {
//     const data = response.data.results
//     modalTitle.innerText = data.title
//     modalDate.innerText = 'Release date: ' + data.release_date
//     modalDescription.innerText = data.description
//     modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">`
//     })
// }

// //加入電影收藏
// function addToFavorite(id){
//     // function isMovieIdMatched(movie){
//     //     return movie.id === id
//     // }
//     const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []   //會回傳||的左邊或右邊是true的東西，若兩個都是true的話就是左邊為優先
//     const movie = movies.find(movie => movie.id === id)
//     if (list.some((movie) => movie.id === id)){
//         return alert('電影已經在收藏清單中')
//     }
//     list.push(movie)
//     console.log(JSON.stringify(list))
//     localStorage.setItem('favoriteMovies', JSON.stringify(list))
// }

// dataPanel.addEventListener('click',function onPanelClicked(event){
//     // 
//     if (event.target.matches('.btn-show-movie')) {
//         console.log(Number(event.target.dataset.id))
//         showMovieModal(Number(event.target.dataset.id))  // 修改這裡
//     } else if (event.target.matches('.btn-add-favorite')) {
//         addToFavorite(Number(event.target.dataset.id))
//     }
// })

// // 收尋欄位
// searchForm.addEventListener('submit',function onSearchFormSubitted(event){
//     event.preventDefault() //請瀏覽器不要做預設的動作
//     console.log(searchInput.value)
//     const keyword = searchInput.value.trim().toLowerCase() //去頭去尾(把前後空白的部分刪掉)、把它變成小寫
//     let filteredMovies = [] //存放搜尋完的結果

//     // if (!keyword.length){
//     //     return alert("Please enter valid string")
//     // }
//     // for (const movie of movies){
//     //     if(movie.title.toLowerCase().includes(keyword)){
//     //         filteredMovies.push(movie)
//     //     }
//     // }
//     filteredMovies = movies.filter(movie => 
//         movie.title.toLowerCase().includes(keyword)
//     )
//     if (filteredMovies.length === 0){
//         return alert("Can't find movie with keyword:" + keyword)
//     }
//     renderMovieList(filteredMovies)
// })

// //增加喜愛清單
// //localStorage.setItem("default_language",'english') //會把東西存在local storage就算重整也不會不見
// // localStorage.getItem("default_language") //可以把local storage中default_language的值拿出來
// //localStorage.removeItem("default_language") //可以把local storage中default_language的值刪掉

// axios.get(INDEX_URL).then((response) => {
//     // for(const movie of response.data.results) {
//     //     movies.push(movie)
//     // }
//     movies.push(...response.data.results)
//     renderMovieList(movies)
// })

const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = [] //電影總清單
let filteredMovies = [] //搜尋清單

const MOVIES_PER_PAGE = 12

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')

function renderMovieList(data) {
    let rawHTML = ''
    data.forEach((item) => {
    // title, image, id
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
        <div class="card">
        <img src="${POSTER_URL + item.image
        }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
            <button 
            class="btn btn-primary 
            btn-show-movie" 
            data-bs-toggle="modal" 
            data-bs-target="#movie-modal" 
            data-id="${item.id}"
            >
            More
            </button>
            <button 
            class="btn btn-info btn-add-favorite" 
            data-id="${item.id}"
            >
            +
            </button>
        </div>
        </div>
    </div>
    </div>`
    })
    dataPanel.innerHTML = rawHTML
}

function renderPaginator(amount) {
    const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
    let rawHTML = ''

    for (let page = 1; page <= numberOfPages; page++) {
        rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
    }
    paginator.innerHTML = rawHTML
}

function getMoviesByPage(page) {
    const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE

    return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function showMovieModal(id) {
  // get elements
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')

  // send request to show api
    axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results

    // insert data into modal ui
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
        }" alt="movie-poster" class="img-fluid">`
    })
}

function addToFavorite(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = movies.find((movie) => movie.id === id)

    if (list.some((movie) => movie.id === id)) {
        return alert('此電影已經在收藏清單中！')
}

    list.push(movie)
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
}

// listen to data panel
dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        showMovieModal(event.target.dataset.id)
    } else if (event.target.matches('.btn-add-favorite')) {
        addToFavorite(Number(event.target.dataset.id))
}
})

//listen to search form
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
    event.preventDefault()
    const keyword = searchInput.value.trim().toLowerCase()

    filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword)
    )

    if (filteredMovies.length === 0) {
        return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
    }

    renderPaginator(filteredMovies.length)
    renderMovieList(getMoviesByPage(1))
})

// listen to paginator
paginator.addEventListener('click', function onPaginatorClicked(event) {
    if (event.target.tagName !== 'A') return

    const page = Number(event.target.dataset.page)
    renderMovieList(getMoviesByPage(page))
})

// send request to index api
axios
    .get(INDEX_URL)
    .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(1))
    })
    .catch((err) => console.log(err))