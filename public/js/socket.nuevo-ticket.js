

var lblNuevoTicket= $('#lblNuevoTicket');

var socket = io();

socket.on('connect',function (){
	console.log("Cliente conectado al servidor:");
	
});

socket.on('disconnect',function (){
	console.log("Cliente desconectado del servidor");
});

$('button').on('click',function(){

	socket.emit('siguienteTicket',null, function (siguienteTicket){
	lblNuevoTicket.text(siguienteTicket);
	});

})

socket.on('ticketActual',function (resp){
	console.log("ticketActual",resp.actual);
	lblNuevoTicket.text(resp.actual);
});



