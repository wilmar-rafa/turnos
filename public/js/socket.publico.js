
var socket = io();




socket.on('ultimos4',function (resp){
		console.log("ultimos4",resp);

		var audio = new Audio('../audio/new-ticket.mp3');
		audio.play();
		resp.forEach(Tickets4);

		
	
});

function Tickets4(ticket, index) {
			label='#lblTicket'+(index+1);
			label2='#lblEscritorio'+(index+1);

			console.log(label,label2);
		  $(label).text('Ticket '+ticket.numero);
		  $(label2).text('Escritorio '+ticket.escritorio);
}