const EventEmitter = require ('events');

const emitter = new EventEmitter();

emitter.on('event', function(){
    console.log('Evento2');
})

emitter.emit('event');

/*emitter.on('event+argumentos', function(a){
    console.log('el arreglo tiene '+a.id+''+a.nombre);
})
emitter.emit('event+argumentos', {id: 2000,nombre:'5'});*/
emitter.on('eventthis', (a,b)=> {
    console.log(a,b, this);
})
emitter.emit('eventthis', 1, 4);