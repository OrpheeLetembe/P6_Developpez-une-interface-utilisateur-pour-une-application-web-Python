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