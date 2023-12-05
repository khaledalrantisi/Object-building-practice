<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bouncing Balls</title>
  <style>
    /* Your CSS styles here */
    body {
      margin: 0;
      overflow: hidden;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="myCanvas"></canvas>
  <script>
    // Your JavaScript code here
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const balls = [];
    
    class Ball {
      constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
      }
    
      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    
      update() {
        if ((this.x + this.size) >= canvas.width || (this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
    
        if ((this.y + this.size) >= canvas.height || (this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
    
        this.x += this.velX;
        this.y += this.velY;
      }
    
      collisionDetect() {
        for (const ball of balls) {
          if (this !== ball) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < this.size + ball.size) {
              ball.color = this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            }
          }
        }
      }
    }
    
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function createBalls() {
      while (balls.length < 25) {
        const size = random(10, 20);
        const ball = new Ball(
          random(0 + size, canvas.width - size),
          random(0 + size, canvas.height - size),
          random(-7, 7),
          random(-7, 7),
          `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
          size
        );
    
        balls.push(ball);
      }
    }
    
    function loop() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
      }
    
      requestAnimationFrame(loop);
    }
    
    createBalls();
    loop();
    
    window.addEventListener("resize", function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      balls.length = 0;
      createBalls();
    });
  </script>
</body>
</html>
