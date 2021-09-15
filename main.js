// request function

function httpRequest(id, traitement){
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			let data = xhr.response;
			traitement(data);
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

let bestMovieScore = "?imdb_score_min=9.6"

function getbestMovieAbstract(data){
	bestMovieAbstract.innerHTML = data.description;
}


function getBestMovieData(data){
	let bestMovieData = data.results;
	bestMovieTitle.innerHTML = bestMovieData[0].title;
	bestMovieImg.setAttribute("src", bestMovieData[0].image_url);
	let bestMovieId = bestMovieData[0].id;

	let bestMovieDetail = httpRequest(bestMovieId, getbestMovieAbstract);
}


let bestMovieInfos = httpRequest(bestMovieScore, getBestMovieData)