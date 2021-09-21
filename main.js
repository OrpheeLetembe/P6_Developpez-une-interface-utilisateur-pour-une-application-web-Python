// REQUEST FUNCTION

//function to ensure compatibility with the various browsers

const getHttpRequest = function() {


	let httpRequest = false;

	if (window.XMLHttpRequest) {

		httpRequest = new XMLHttpRequest();

		if (httpRequest.overrideMimeType) {
			httpRequest.overrideMimeType("text/xml");
		}

	}

	else if (window.ActiveXObject){

		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}

		catch (e){
			try{
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){}
		}
	}

	if (!httpRequest){
		alert("Abandon :(Impossible de créer une instance XMLHTTP");

		return false;
	}


    return httpRequest;
}


//function to send requests to the server

function httpRequest(uri, process) {
	let xhr = getHttpRequest(); 

	xhr.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200){
			let data = xhr.response;
			process(data);

		} 
	} 
		
	xhr.open("GET","http://localhost:8000/api/v1/titles/" + uri, true );
	xhr.responseType = "json";
	xhr.send();
}


function getBtnId(btn) {
	const btnId = document.getElementById(btn);
	return btnId;
}


// BEST MOVIE

const bestMovie = document.getElementById("best-movie");
const bestMovieTitle = document.getElementById("best-movie__title");
const bestMovieImg = document.getElementById("best-movie__img");
const bestMovieAbstract = document.getElementById("best-movie__abstract");


let bestMovieUri = "?imdb_score_min=9.6"


function getBestMovieInfo(data) {
	let bestMoviesData = data.results;
	let bestMovieId = bestMoviesData[0].id;
	httpRequest(bestMovieId, setBestMovieInfo);
}

function setBestMovieInfo(data) {
	bestMovieTitle.innerHTML = data.title;
    bestMovieImg.setAttribute("src", data.image_url);
    bestMovieAbstract.innerHTML = data.description;
}

//query to retrieve the information of the best movie

httpRequest(bestMovieUri,  getBestMovieInfo);

const bestMovieBtn = getBtnId("best-movie__btn");

function bestMoviePopup(data) {
	let bestMoviesData = data.results;
	let bestMovieId = bestMoviesData[0].id;
	httpRequest(bestMovieId, fillPopup);

}


bestMovieBtn.addEventListener("click", e => {
	openPopup();
	httpRequest(bestMovieUri, bestMoviePopup);
})



// POPUP

function openPopup() {
	document.getElementById("overlay").style.display = "flex";
	document.getElementById("overlay").style.zIndex = "1";

	document.getElementById("popup-movie").style.top = 20 + "%" ;
	document.getElementById("popup-movie").style.left = 20 + "%" ;
}

function fillPopup(movie) {
    const popup = document.getElementById("popup-movie");
    const movieImg = document.getElementById("popup-movie__img");
    const movieTitle = document.getElementById("popup-movie__title");
    const movieAbstract = document.getElementById("popup-movie__abstract");
    const movieGenre = document.getElementById("popup-movie__genre");
    const movieDate = document.getElementById("popup-movie__date");
    const movieRate = document.getElementById("popup-movie__rated");
    const movieImdb = document.getElementById("popup-movie__imdb");
    const movieDirector = document.getElementById("popup-movie__director");
    const movieActors = document.getElementById("popup-movie__actors");
    const movieDuration = document.getElementById("popup-movie__duration");
    const movieCountry = document.getElementById("popup-movie__country");
    const movieBoxOffice = document.getElementById("popup-movie__box");

    movieImg.setAttribute("src", movie.image_url);
    movieTitle.innerHTML = movie.title;
    movieAbstract.innerHTML = movie.long_description; 
    movieGenre.innerHTML = "Genres :"+" "+ movie.genres;
    movieDate.innerHTML = "Date published :"+" "+ movie.date_published;
    movieRate.innerHTML = "Rated :"+" "+movie.rated;
    movieImdb.innerHTML = "Imdn score :"+" "+movie.imdb_score;
    movieDirector.innerHTML = "Directors :"+" "+movie.directors;
    movieActors.innerHTML = "Actors :"+" "+movie.actors;
    movieDuration.innerHTML = "Duration :"+" "+movie.duration;
    movieCountry.innerHTML = "Countires :"+" "+movie.countries;
    movieBoxOffice.innerHTML = "Box office :"+" "+movie.worldwide_gross_icome; 
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";   
}

const btnPopup = getBtnId("popup-movie__btn");

btnPopup.addEventListener("click", e => {
	closePopup();
})

//FUNCTION ADD MOVIES IMAGES

function addMoviesImg(data, id) {
	let elementParent = document.getElementById(id);
	for (let i = 0; i < elementParent.children.length; i++){
		elementParent.children[i].setAttribute("src", data[i].image_url); 
		elementParent.children[i].addEventListener("click", e => {
			openPopup();
			httpRequest(data[i].id, fillPopup);	
		})
	}
		
}

//FUNCTION EVENT CLICK BUTTON TO DISPLAY MOVIES

function rigthClick(imagvisible, imaginvisible, btnL, btnR) {
	const imagVisible = document.getElementById(imagvisible);
	const imagInvisible = document.getElementById(imaginvisible);

	imagInvisible.style.display = "flex";
	imagVisible.style.display = "none";

	let movieBtnR = getBtnId(btnR);
	movieBtnR.style.display = "none";

	let movieBtnL = getBtnId(btnL);
	movieBtnL.style.display = "block";
}

function leftClick(imagvisible, imaginvisible, btnL, btnR) {
	const imagVisible = document.getElementById(imagvisible);
	const imagInvisible = document.getElementById(imaginvisible);

	imagInvisible.style.display = "none";
	imagVisible.style.display = "flex";

	let movieBtnL = getBtnId(btnL);
	movieBtnL.style.display = "none";


	let movieBtnR = getBtnId(btnR);
	movieBtnR.style.display = "block";
}

//TOP RATED MOVIES

//add movies images

function getTopMovieVisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "top-rated_img_visible");
}

const topRatedMovieVisibleUri = "?imdb_score_min=9.3&imdb_score_max=9.6&page=2"

httpRequest(topRatedMovieVisibleUri, getTopMovieVisible);


function getTopMovieInvisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "top-rated_img_invisible");
}

const topRatedMovieInvisibleUri = "?imdb_score_min=9.3&imdb_score_max=9.6&page=3"

//event click right arrow

const btnTopRatedR = getBtnId("top-rated_btnR")

btnTopRatedR.addEventListener("click", e => {
	rigthClick("top-rated_img_visible", "top-rated_img_invisible", "top-rated_btnL", "top-rated_btnR");
	httpRequest(topRatedMovieInvisibleUri, getTopMovieInvisible);
})


//Event click left arrow

const btnTopRatedL = getBtnId("top-rated_btnL")

btnTopRatedL.addEventListener("click", e => {
	leftClick("top-rated_img_visible", "top-rated_img_invisible", "top-rated_btnL", "top-rated_btnR");
	
})

//ACTION

//add movies images

const actionMovieVisibleUri = "?genre_contains=action&imdb_score_min=8&imdb_score_max=9";

function getActionMovieVisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "action_img_visible");
}

httpRequest(actionMovieVisibleUri, getActionMovieVisible);


const actionMovieInvisibleUri = "?genre_contains=action&imdb_score_min=8&imdb_score_max=9&page=2"

function getActionMovieInvisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "action_img_invisible");
}

 //event click right arrow

const btnActionR = getBtnId("action_btnR")

btnActionR.addEventListener("click", e => {
	rigthClick("action_img_visible", "action_img_invisible", "action_btnL", "action_btnR");
	httpRequest(actionMovieInvisibleUri, getActionMovieInvisible);
})

 //event click left arrow

const btnActionL = getBtnId("action_btnL")

btnActionL.addEventListener("click", e => {
	leftClick("action_img_visible", "action_img_invisible", "action_btnL", "action_btnR");
})
	

// COMEDY

//add movies images

const comedyMovieVisibleUri = "?genre_contains=comedy&imdb_score_min=8&imdb_score_max=9";

function getComedyMovieVisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "comedy_img_visible");
}

httpRequest(comedyMovieVisibleUri, getComedyMovieVisible);


function getComedyMovieInvisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "comedy_img_invisible");
}

//event click right arrow

const comedyMovieInvisibleUri = "?genre_contains=comedy&imdb_score_min=8&imdb_score_max=9&page=2"

const btnComedyR = getBtnId("comedy_btnR")

btnComedyR.addEventListener("click", e => {
	rigthClick("comedy_img_visible", "comedy_img_invisible", "comedy_btnL", "comedy_btnR");
	httpRequest(comedyMovieInvisibleUri, getComedyMovieInvisible);
})

//event click left arrow

const btnComedyL = getBtnId("comedy_btnL")

btnComedyL.addEventListener("click", e => {
	leftClick("comedy_img_visible", "comedy_img_invisible", "comedy_btnL", "comedy_btnR");
})



// ROMANCE

//add movies images

const romanceMovieVisibleUri = "?genre_contains=romance&imdb_score_min=8&imdb_score_max=9";

function getRomanceMovieVisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "romance_img_visible");
}

httpRequest(romanceMovieVisibleUri, getRomanceMovieVisible);


function getRomanceMovieInvisible(data) {
	let movieData = data.results;
	addMoviesImg(movieData, "romance_img_invisible");
}

//event click right arrow

const romanceMovieInvisibleUri = "?genre_contains=romance&imdb_score_min=8&imdb_score_max=9&page=2"

const btnRomanceR = getBtnId("romance_btnR")

btnRomanceR.addEventListener("click", e => {
	rigthClick("romance_img_visible", "romance_img_invisible", "romance_btnL", "romance_btnR");
	httpRequest(romanceMovieInvisibleUri, getRomanceMovieInvisible);
})

//event click left arrow

const btnRomanceL = getBtnId("romance_btnL")

btnRomanceL.addEventListener("click", e => {
	leftClick("romance_img_visible", "romance_img_invisible", "romance_btnL", "romance_btnR");
})


























