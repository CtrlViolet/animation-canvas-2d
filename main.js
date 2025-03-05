// Obtiene el elemento canvas desde el DOM
const canvas = document.getElementById("canvas");

// Obtiene el contexto 2D del canvas para dibujar
let ctx = canvas.getContext("2d");

// Ajusta las dimensiones del canvas al tamaño de la ventana del navegador
const window_height = window.innerHeight; // Obtiene la altura de la ventana
const window_width = window.innerWidth;   // Obtiene la anchura de la ventana
canvas.height = window_height; // Ajusta la altura del canvas al tamaño de la ventana
canvas.width = window_width;   // Ajusta la anchura del canvas al tamaño de la ventana

/**
 * Clase que representa un círculo animado en el canvas con contador de rebotes
 */
class Circle {
    /**
     * Constructor de la clase Circle
     * @param {number} x - Posición en el eje X
     * @param {number} y - Posición en el eje Y
     * @param {number} radius - Radio del círculo
     * @param {string} color - Color del borde y texto del círculo
     * @param {string} text - Texto dentro del círculo
     * @param {number} speed - Velocidad de movimiento
     */
    constructor(x, y, radius, color, text, speed) {
        this.posX = x; // Almacena la posición X inicial del círculo
        this.posY = y; // Almacena la posición Y inicial del círculo
        this.radius = radius; // Define el radio del círculo
        this.color = color; // Establece el color del borde y texto
        this.text = text; // Define el texto que aparecerá dentro del círculo
        this.speed = speed; // Almacena la velocidad de movimiento

        // Establece la dirección inicial del movimiento
        this.dx = (Math.random() > 0.5 ? 1 : -1) * this.speed; // Movimiento en el eje X aleatorio
        this.dy = (Math.random() > 0.5 ? 1 : -1) * this.speed; // Movimiento en el eje Y aleatorio

        this.bounceCount = 0; // Contador de rebotes, inicializado en 0

        // Si el círculo se mueve solo en un eje, se fuerza un pequeño ajuste
        if (Math.abs(this.dx) === 0) this.dx = this.speed;
        if (Math.abs(this.dy) === 0) this.dy = this.speed;
    }

    /**
     * Método para dibujar el círculo en el canvas
     * @param {CanvasRenderingContext2D} context - Contexto del canvas
     */
    draw(context) {
        context.beginPath(); // Inicia un nuevo trazado para dibujar el círculo
        context.strokeStyle = this.color; // Establece el color del borde del círculo
        context.lineWidth = 2; // Define el grosor de la línea del borde
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2); // Dibuja el círculo
        context.stroke(); // Aplica el trazo al círculo
        context.closePath(); // Finaliza el trazado

        // Configuración del texto dentro del círculo
        context.fillStyle = this.color; // Establece el color del texto
        context.textAlign = "center"; // Alinea el texto al centro horizontalmente
        context.textBaseline = "middle"; // Alinea el texto al centro verticalmente
        context.font = "20px Arial"; // Define el tipo y tamaño de fuente
        context.fillText(`${this.text}: ${this.bounceCount}`, this.posX, this.posY); 
        // Dibuja el texto dentro del círculo, incluyendo el contador de rebotes
    }

    /**
     * Método para actualizar la posición del círculo y detectar colisiones con los bordes
     * @param {CanvasRenderingContext2D} context - Contexto del canvas
     */
    update(context) {
        this.draw(context); // Llama al método para dibujar el círculo en su nueva posición

        // Detectar colisión con los bordes laterales (izquierda y derecha)
        if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
            this.dx = -this.dx; // Invierte la dirección en el eje X
            this.bounceCount++; // Aumenta el contador de rebotes
        }

        // Detectar colisión con los bordes superior e inferior
        if (this.posY + this.radius >= window_height || this.posY - this.radius <= 0) {
            this.dy = -this.dy; // Invierte la dirección en el eje Y
            this.bounceCount++; // Aumenta el contador de rebotes
        }

        // Actualizar la posición del círculo sumando su velocidad a las coordenadas
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// Función para generar una posición aleatoria asegurando que no esté pegada a los bordes
function getRandomPosition(radius, limit) {
    return Math.random() * (limit - 2 * radius) + radius; // Asegura que haya espacio suficiente
}

// Genera valores aleatorios para la posición inicial de los círculos sin que estén pegados a los bordes
let randomX1 = getRandomPosition(50, window_width);
let randomY1 = getRandomPosition(50, window_height);
let randomX2 = getRandomPosition(50, window_width);
let randomY2 = getRandomPosition(50, window_height);
//test
// Radio aleatorio asegurando que no sea demasiado pequeño o grande
let randomRadius = Math.floor(Math.random() * 50 + 30);

// Crea dos círculos con colores y velocidades diferentes
let miCirculo = new Circle(randomX1, randomY1, randomRadius, "blue", "Tec1", 5);
let miCirculo2 = new Circle(randomX2, randomY2, randomRadius, "red", "Tec2", 2);

/**
 * Función de animación que actualiza los círculos en cada cuadro de animación
 */
function updateCircle() {
    requestAnimationFrame(updateCircle); // Solicita la actualización continua de la animación
    ctx.clearRect(0, 0, window_width, window_height); // Limpia el canvas antes de redibujar
    miCirculo.update(ctx); // Actualiza el primer círculo
    miCirculo2.update(ctx); // Actualiza el segundo círculo
}

// Inicia la animación llamando a la función updateCircle()
updateCircle();
