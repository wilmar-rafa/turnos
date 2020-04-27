const { io } = require('../server');

const {TicketControl}= require('../classes/ticket-control.js');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

       
	console.log(`Usuario conectado`);

	let ticketActual= ticketControl.ticketActual();

    client.emit('ticketActual', {
    			actual:ticketActual
    });

    let ultimos4Tickets= ticketControl.ultimosCuatro();
    client.emit('ultimos4',ultimos4Tickets);



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        //client.broadcast.emit('enviarMensaje', data);
    });

    client.on('siguienteTicket', (data, callback) => {

    	let siguienteTicket=ticketControl.siguienteTicket();
        console.log(siguienteTicket);

        callback(siguienteTicket);
    });


    client.on('atenderTicket',(data,callback)=>{

    		if (!data.escritorio){
    			return callback({
    				ok:false,
    				message:'El escritorio es necesario... '
    			})
    		}

    		let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    		callback(atenderTicket);

    		client.broadcast.emit('ultimos4',ultimos4Tickets);
    		
    });

});