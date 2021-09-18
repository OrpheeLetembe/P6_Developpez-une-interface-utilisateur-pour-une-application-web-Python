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

function httpRequest(id, process){
	let xhr = getHttpRequest(); 

	xhr.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			let data = xhr.response;
			process(data);

		} 
	} 
		
	xhr.open("GET","http://localhost:8000/api/v1/titles/" + id, true );
	xhr.responseType = "json";
	xhr.send();
}


function getBtnId(btn){
	const btnId = document.getElementById(btn);
	return btnId;
}


// BEST MOVIE

const bestMovie = document.getElementById("best-movie");
const bestMovieTitle = document.getElementById("best-movie__title");
const bestMovieImg = document.getElementById("best-movie__img");
const bestMovieAbstract = document.getElementById("best-movie__abstract");


let bestMovieScore = "?imdb_score_min=9.6"


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

httpRequest(bestMovieScore,  getBestMovieInfo);

const bestMovieBtn = getBtnId("best-movie__btn");

function bestMoviePoppup(data) {
	let bestMoviesData = data.results;
	let bestMovieId = bestMoviesData[0].id;
	httpRequest(bestMovieId, fillPopup);

}


bestMovieBtn.addEventListener("click", e => {
	openPopup("best-movie__btn");
	httpRequest(bestMovieScore, bestMoviePoppup);
})



// POPUP

function openPopup(id){
	let getElementTop = document.getElementById(id).offsetTop;
	let getElementLeft = document.getElementById(id).offsetLeft;

	document.getElementById("overlay").style.display = "block";
	document.getElementById("overlay").style.zIndex = "1";

	document.getElementById("popup-movie").style.top = getElementTop + "px" ;
	document.getElementById("popup-movie").style.left = getElementLeft + "px" ;


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
    movieBoxOffice.innerHTML = "Box office :"+" "+movie.budget+" "+movie.budget_currency;

    
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
    
}


//TOP RATED MOVIES

function addMoviesImg(data, id){
	//console.log(data);
	let elementParent = document.getElementById(id);
	//console.log(bestMovieImg)
	for (let i = 0; i < data.length - 1; i++){
		if (data[i].imdb_score > 9.3){
			elementParent.children[i].setAttribute("src", data[i].image_url);
		}else{
			elementParent.children[i].setAttribute("src", data[i+1].image_url);
		}
	}

}

//add movies images

function getData(data){
	let movieData = data.results;
	addMoviesImg(movieData, "top-rated_img_visible");
}

const topRatedMovieScore = "?imdb_score_min=9.3&imdb_score_max=9.6&page=2"

httpRequest(topRatedMovieScore, getData);



//Event click right arrow

function getBtnId(btn){
	const btnId = document.getElementById(btn);
	return btnId;
}

const btnTopRatedR = getBtnId("top-rated_btnR")

btnTopRatedR.addEventListener("click", e => {
	const imagInvisible = document.getElementById("top-rated_img_invisible");
	const imagVisible = document.getElementById("top-rated_img_visible");

	imagInvisible.style.display = "flex";
	imagVisible.style.display = "none";
	btnTopRatedR.style.display = "none";

	const btnTopRatedL = getBtnId("top-rated_btnL");
	btnTopRatedL.style.display = "block";



})

//Event click left arrow

const btnTopRatedL = getBtnId("top-rated_btnL")

btnTopRatedL.addEventListener("click", e => {
	const imagInvisible = document.getElementById("top-rated_img_invisible");
	const imagVisible = document.getElementById("top-rated_img_visible");

	imagInvisible.style.display = "none";
	imagVisible.style.display = "flex";
	btnTopRatedL.style.display = "none";

	const btnTopRatedR = getBtnId("top-rated_btnR");
	btnTopRatedR.style.display = "block";

	//console.log(imagVisible);
	//console.log(imagVisible.style);


})

//httpRequest("?imdb_score=9.4", getLastChildImg);

















