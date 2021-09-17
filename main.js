// request function

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


function httpRequest(id, functions){
	let xhr = getHttpRequest(); 

	xhr.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			let data = xhr.response;
			functions(data);
		} 

	} 
		

	xhr.open("GET","http://localhost:8000/api/v1/titles/" + id, true );
	xhr.responseType = "json";
	xhr.send();
}





// BEST MOVIE

const bestMovie = document.getElementById("best-movie");
const bestMovieTitle = document.getElementById("best-movie__title");
const bestMovieImg = document.getElementById("best-movie__img");
const bestMovieAbstract = document.getElementById("best-movie__abstract");
const bestMovieBtn = document.getElementById("best-movie__btn")

let bestMovieScore = "?imdb_score_min=9.6"

function getbestMovieAbstract(data){
	bestMovieAbstract.innerHTML = data.description;
}


function getBestMovieData(data){
	let bestMovieData = data.results;
	bestMovieTitle.innerHTML = bestMovieData[0].title;
	bestMovieImg.setAttribute("src", bestMovieData[0].image_url);
	let bestMovieId = bestMovieData[0].id;

	httpRequest(bestMovieId, getbestMovieAbstract);
}

httpRequest(bestMovieScore, getBestMovieData);


function getBestMovieId(data){
	let bestMovieData = data.results;
	let bestMovieId = bestMovieData[0].id;
	httpRequest(bestMovieId, fillPopup)
}


//click btn best movie

function bestMoviePopup(){
	openPopup("best-movie__btn");
	httpRequest(bestMovieScore, getBestMovieId);
}

// POPUP

function openPopup(id){
	let getElementTop = document.getElementById(id).offsetTop;
	let getElementLeft = document.getElementById(id).offsetLeft;

	document.getElementById("overlay").style.display = "block";
	document.getElementById("popup-movie").style.top = getElementTop + "px" ;
	document.getElementById("popup-movie").style.left = getElementLeft + "px" ;


}

function fillPopup(movie) {
	console.log(movie)
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

//add movies images

function getData(data){
	//console.log(data);
	let movieData = data.results;
	getChildren(movieData, "top-rated_img_visible");
}

httpRequest(bestMovieScore, getData);

function getChildren (data, id){
	let elementParent = document.getElementById(id);
	for (let i = 0; i < data.length - 1; i++){
		elementParent.children[i].setAttribute("src", data[i + 1].image_url);
	}

}

function getLastChildImg(data){
	let lastMovieImg = data.results;
	let topRateDiv = document.getElementById("top-rated_img_visible");
	topRateDiv.children[3].setAttribute("src", lastMovieImg[0].image_url);

}

httpRequest("?imdb_score=9.4", getLastChildImg);


//EVENT CLICK RIGHT ARROW

function getBtnId(btn){
	const btnId = document.getElementById(btn);
	return btnId;
}


const btnTopRatedR = getBtnId("top-rated_btnR")

btnTopRatedR.addEventListener("click", e => {
	const imagInvisible = document.getElementById("top-rated_img_invisible");
	const imagVisible = document.getElementById("top-rated_img_visible");

	console.log(imagVisible.style)

	imagInvisible.style.display = "block";
	imagVisible.style.display = "none";
	btnTopRatedR.style.display = "none";

	const btnTopRatedL = getBtnId("top-rated_btnL");
	btnTopRatedL.style.display = "block";

})

//EVENT CLICK LEFT ARROW

const btnTopRatedL = getBtnId("top-rated_btnL")

btnTopRatedL.addEventListener("click", e => {
	const imagInvisible = document.getElementById("top-rated_img_invisible");
	const imagVisible = document.getElementById("top-rated_img_visible");

	imagInvisible.style.display = "none";
	imagVisible.style.display = "flex";
	btnTopRatedL.style.display = "none";

	const btnTopRatedR = getBtnId("top-rated_btnR");
	btnTopRatedR.style.display = "block";

	console.log(imagVisible);
	console.log(imagVisible.style);


})













