// Agregar el evento al boton start
let btnStart =  document.querySelector(".start");//seleccionamos la clase start con un querySelector
console.log(btnStart);

btnStart.addEventListener("click", ()=>{
	console.log("Inicia el Juegoooooo");
	clearInterval(idInterval);
	iniciarJuego();
});

//Id interval
let idInterval 

//Imagenes
const trexito = new Image()//Jalamos la imagen a la pagina
trexito.src = 'trex1.webp'
console.log(trexito);
const cactusImg = new Image();
cactusImg.src = "cactus1.webp"
const huesoImg = new Image();
huesoImg.src = "hueso.png";

//sprites
const cero = new Image()
cero.src = "0.gif"

const uno= new Image()
uno.src = "1.gif"

const dos= new Image()
dos.src = "2.gif"

const tres = new Image()
tres.src = "3.gif"

const cuatro = new Image()
cuatro.src = "4.gif"

const cinco = new Image()
cinco.src = "5.gif"

const seis = new Image()
seis.src = "6.gif"

const siete = new Image()
siete.src = "7.gif"

//Arreglo sprites
const sprites =[cero,uno,dos,tres,cuatro,cinco,seis,siete] 
let posicion = 0;

// 1.-Seleccionar canvas
let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");

// lista de enemigos/otros elementos que se agregan en un arreglo[]
const nopalitos = [];
const huesos = [];


//crear nuestro personaje--> class
class Trex{
	constructor(x,y,w,h,color,vida,imagen,saltando,huesitos){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.vida = vida;
		this.imagen = imagen;
		this.saltando = false;
		this.score = 0;
	}
	avanzar(){
		if(this.x + this.w < 330){
			this.x +=10;
		}

	}
	retroceder(){
		if(this.x > 0){
			this.x -=10;
		}

	}
	saltar(){
		if(this.x < 285){
			this.saltando = true ;            
		}

	}
	agacharse(){
	}
	morirse(){}
	disparar(){
		const huesito = new Hueso(this.x + this.w, this.y + 10, 20, 40, huesoImg);
		huesos.push(huesito);
		console.log(huesito);
	}
	dibujarse(){
		ctx.fillStyle = this.color;
		// ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.drawImage(this.imagen, this.x, this.y,this.w, this.h);//agregar imagen al
	}                                           
}

//Crear enemigo/obstaculos(cactus)
class Cactus{
	constructor(x,y,w,h,imagen,nivel){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imagen = imagen;
		this.nivel = nivel;
	}
	dibujarse(){
			ctx.fillStyle = "black"
			// ctx.fillRect(this.x,this.y,this.w,this.h,this.imagen);
				this.x -=1;
				ctx.drawImage(this.imagen, this.x, this.y,this.w, this.h)
		}
}

//Proyectil - Hueso
class Hueso{
	constructor(x,y,w,h,imagen){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imagen = imagen;
	}
	dibujarse(){
			ctx.fillStyle = "black"
			// ctx.fillRect(this.x,this.y,this.w,this.h,this.imagen);
			ctx.drawImage(this.imagen, this.x, this.y,this.w, this.h)
			this.x +=3;
		}
}

// Dibujar linea 
function dibujarPiso(){
	ctx.beginPath();
	ctx.moveTo(0,170);
	ctx.lineTo(330,170);
	ctx.stroke();
	ctx.closePath();
}
dibujarPiso();

//funcion para Mostrar el nombre del juego
function mostrarDatos(distancia,score,vida){
	ctx.font = "20px Arial";//tamaño y tipo de fuente
	ctx.fillText("T-rexito",130,18)//añadimos texto en el canva
  //Distancia
	ctx.fillText(`${distancia}m`,15,20);
	// Score
	ctx.fillText(`Score:${score}`,250,20);
	ctx.fillText(`Vida:${vida}`,240,50);
}


  

// funcion para Escuchar teclas
function teclas(dinosaurio){
	// Recibimos un evento
	document.addEventListener("keyup",(evento)=>{
		switch(evento.code){//siwtch para diferentes casos
			case"KeyF":
			dinosaurio.disparar()
			break;
			case"Space"://espacio
			dinosaurio.saltar();//brincar
			break;
			case"ArrowRight"://flecha derecha
			dinosaurio.avanzar();
			break;
			case"ArrowLeft":
			dinosaurio.retroceder();
			break;
			case"ArrowDown":
			console.log("abajo");
			break;
			case"ArrowUp":
			console.log("arriba");
			break;
		}
	});
}

// Crear Enemigos
function crearCactus(){
	const num = Math.floor(Math.random()*100)
	// console.log(num);
	if (num===3){
		const cactus = new Cactus(300,140,30,60,cactusImg,"facil");
		nopalitos.push(cactus)
		
	}
}



//Funcion para iniciar el juego
function iniciarJuego(){
	let distancia = 0; 
	const dinosaurio = new Trex(0,140,40,60,"black",100,cero);
	teclas(dinosaurio);
	// console.log(dinosaurio);
	
	// <<<<A PARTIR DE AQUI SE REDIBUJA EL JUEGO>>>
	idInterval = setInterval(()=>{
		ctx.clearRect(0,0,330,210);
		dibujarPiso();
		dinosaurio.imagen = sprites[posicion];
		posicion++;
		if(posicion === 8){
			posicion = 0;
		}
		dinosaurio.dibujarse();
		// cactus.dibujarse();
		// Mostrar datos
		mostrarDatos(distancia,dinosaurio.score,dinosaurio.vida);
		distancia +=1;

		//Esta saltando?? configuramos el dinosaurio para saltar
		if(dinosaurio.saltando === true){
			// Altura maxima
			if(dinosaurio.y>0){
				dinosaurio.y -=5;
				dinosaurio.x +=5 ;
			}else{
				console.log("bajate");
				dinosaurio.saltando = false;
			}
		} 

		// no esta saltando- si salta está arriba lo cprogramamos para bajar 
		if(dinosaurio.saltando===false && dinosaurio.y<130){
			dinosaurio.y +=10;
		}

		// Dibujar enemigos/elementos extra
		nopalitos.forEach((cactus,index)=>{
			cactus.dibujarse();
			if(cactus.x<=dinosaurio.x+dinosaurio.w && 
				cactus.x >= dinosaurio.x &&
				cactus.y <= dinosaurio.y+dinosaurio.h){
				nopalitos.splice(index,1);//eliminamos del arreglo algun nopal
				dinosaurio.vida -=25;
				// si sigue vivo el dinosaurio
				if(dinosaurio.vida < 25){
					clearInterval(idInterval);
				}}});

				huesos.forEach((hueso,hIndex)=>{
					hueso.dibujarse();
					nopalitos.forEach((cactus,cIndex)=>{
						if(hueso.x + hueso.w >= cactus.x){
							huesos.splice(hIndex,1);
							nopalitos.splice(cIndex,1);
							dinosaurio.score +=1;
						}
					})
				})

		crearCactus();
	},1000/60)
}


// iniciarJuego();

// Listo-Pagina de inicio
// listo-agregar la imagen del t-rex*
// Listo-crear los cactus
// brincar
// Listo-recibir daño
// Listo-contador de avance/vida
// score
// perder
// LISTO-disparar
// agregar sonido
// ganar

