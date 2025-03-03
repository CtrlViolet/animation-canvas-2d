// Obtiene el elemento canvas desde el DOM
        const canvas = document.getElementById("canvas");
        
        // Obtiene el contexto 2D del canvas para dibujar
        let ctx = canvas.getContext("2d");

        // Ajusta las dimensiones del canvas al tamaño de la ventana del navegador
        const window_height = window.innerHeight;
        const window_width = window.innerWidth;
        canvas.height = window_height;
        canvas.width = window_width;
      
        /**
         * Clase que representa un círculo en el canvas con animación
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
                this.posX = x; // Posición X inicial
                this.posY = y; // Posición Y inicial
                this.radius = radius; // Radio del círculo
                this.color = color; // Color del borde y texto
                this.text = text; // Texto a mostrar dentro del círculo
                this.speed = speed; // Velocidad de movimiento
                
                // Dirección inicial del movimiento
                this.dx = 1 * this.speed; // Movimiento en el eje X
                this.dy = 1 * this.speed; // Movimiento en el eje Y
                this.dx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5) * this.speed;
                    this.dy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.5 + 0.5) * this.speed;
                
            }
            
            /**
             * Dibuja el círculo en el canvas
             * @param {CanvasRenderingContext2D} context - Contexto del canvas
             */
            draw(context) {
                context.beginPath(); // Inicia un nuevo trazado
                context.strokeStyle = this.color; // Color del borde del círculo
                context.lineWidth = 2; // Grosor de la línea del círculo
                context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2); // Dibuja el círculo
                context.stroke(); // Aplica el trazo al círculo
                context.closePath(); // Cierra el trazado
                
                // Dibujar el texto centrado dentro del círculo
                context.fillStyle = this.color; // Color del texto
                context.textAlign = "center"; // Centra el texto horizontalmente
                context.textBaseline = "middle"; // Centra el texto verticalmente
                context.font = "20px Arial"; // Establece la fuente del texto
                context.fillText(this.text, this.posX, this.posY); // Dibuja el texto en el círculo
            }

            /**
             * Actualiza la posición del círculo y detecta colisiones con los bordes
             * @param {CanvasRenderingContext2D} context - Contexto del canvas
             */
            update(context) {
                this.draw(context); // Llama al método para dibujar el círculo
                
                // Detectar colisiones con los bordes y cambiar dirección
                if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
                    this.dx = -this.dx; // Invierte la dirección en X
                }

                if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
                    this.dy = -this.dy; // Invierte la dirección en Y
                }
                
                // Actualizar la posición del círculo sumando su velocidad
                this.posX += this.dx;
                this.posY += this.dy;
            }
        }
        /*  
        // Genera valores aleatorios para la posición y tamaño de los círculos
        let randomX = Math.random() * window_width;
        let randomY = Math.random() * window_height;
        let randomRadius = Math.floor(Math.random() * 100 + 30);
        */ 
       // Función para generar una posición aleatoria segura
function getRandomPosition(radius) {
    return {
        x: Math.random() * (window_width - 2 * radius) + radius,
        y: Math.random() * (window_height - 2 * radius) + radius
    };
}

// Genera posiciones aleatorias seguras
const randomRadius = Math.floor(Math.random() * 50 + 30);
const position1 = getRandomPosition(randomRadius);
const position2 = getRandomPosition(randomRadius);

        // Crea dos círculos con colores y velocidades diferentes
        let miCirculo = new Circle(position1.x, position2.y, randomRadius, "blue", "Tec1", 5);
        let miCirculo2 = new Circle(position2.x, position2.y, randomRadius, "red", "Tec2", 2);

        /**
         * Función de animación que actualiza los círculos en cada cuadro
         */
        function updateCircle() {
            requestAnimationFrame(updateCircle); // Solicita la actualización continua de la animación
            //ctx.clearRect(0, 0, window_width, window_height); // Limpia el canvas antes de redibujar
            miCirculo.update(ctx); // Actualiza el primer círculo
            miCirculo2.update(ctx); // Actualiza el segundo círculo
        }

        updateCircle(); // Inicia la animación