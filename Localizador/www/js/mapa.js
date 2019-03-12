var app = {
	inicio: function(){
		this.iniciarFast();
	},

	iniciarFast: function(){
		FastClick.attach(document.body);
	},

	dispositivoListo: function(){
		navigator.geolocation.getCurrentPosition(app.dibujarCoords, app.errorCoords);
	},

	dibujarCoords: function(position){
		var miMapa = L.map('mapa').setView([position.coords.latitude, position.coords.longitude], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYWh1aXphciIsImEiOiJjanFxN2dyazIwOWVrNDNscHl1dWMwcnp3In0.g5y6qeWBJnZhnY74b3wboA', {
			attribution:'<a href="http://www.openstreetmap.org/copyright">© OpenStreetMap | </a>',
			maxZoom: 18
		}).addTo(miMapa);

		app.pintarMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

		miMapa.on('click', function(evento){
			var texto= 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
			app.pintarMarcador(evento.latlng, texto, miMapa);
		});
	},

	pintarMarcador: function(latlng, texto, mapa){
		var marcador = L.marker(latlng).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
	},

	errorCoords: function(error){
		console.log(error.code + ': ' + error.message);
	}
};

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function() {
		app.inicio();
	}, false);
	document.addEventListener('deviceready', function() {
		app.dispositivoListo();
	}, false);
}