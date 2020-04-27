const fs = require('fs');

class Ticket{

	constructor(numero,escritorio){
		this.numero=numero;
		this.escritorio=escritorio;
	}
}

class	TicketControl{

		constructor(){
			this.ultimo=0;
			this.hoy= new Date().getDate();
			this.tickets=[];
			this.ultimos4=[];

			let data = require('../data/data.json');

			if (this.hoy===data.hoy){
				this.ultimo=data.ultimo;
				this.tickets=data.tickets;//tickets en cola sin atender
				this.ultimos4=data.ultimos4;//Ultimos 4 tickets atendidos
			}else{
				this.reIniciarTickets();
			}
		}

		reIniciarTickets(){
			console.log('Reiniciando el sistema');
			this.ultimo=0;
			this.tickets=[];
			this.ultimos4=[];
			this.grabarData();
		}

		siguienteTicket(){
			this.ultimo++;

			let ticket= new Ticket(this.ultimo,null);
			this.tickets.push(ticket);

			this.grabarData();

			return `Ticket ${this.ultimo}`;
		}

		ticketActual(){
			
			return `Ticket ${this.ultimo}`;
		}

		ultimosCuatro(){
			
			return this.ultimos4;
		}

		atenderTicket(escritorio){

			if (this.tickets.length===0){
				return 'No hay tickets';
			}

			let numeroTicket=this.tickets[0].numero;//extrae el ticket mas antiguo
			//console.log(`this.tickets[0]:${this.tickets[0]}`);
			//console.log(`numeroTicket:${numeroTicket}`);
			this.tickets.shift();//borra el primer ticket en cola

			let atenderTicket= new Ticket(numeroTicket,escritorio);//crea  ticket que se va ha atender
			//console.log(atenderTicket);
			this.ultimos4.unshift(atenderTicket);//Inserta al inicio,

			if (this.ultimos4.length > 4){
				this.ultimos4.splice(-1,1);//borra el ultimo
			}

			console.log('Ultimos 4:');
			console.log(this.ultimos4);

			this.grabarData();

			return atenderTicket;
		}

		grabarData(){

			let data={
				ultimo: this.ultimo,
				hoy: 	this.hoy,
				tickets:this.tickets,
				ultimos4:this.ultimos4
			}

			let datastring= JSON.stringify(data);

			fs.writeFileSync('./server/data/data.json',datastring);


		}

}

module.exports={TicketControl}