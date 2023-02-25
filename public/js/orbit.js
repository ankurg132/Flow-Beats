var sketchProc = function(processingInstance) {
    with (processingInstance) {
      size(600, 600); 
      frameRate(60);    
      smooth();
      
  {
      noStroke();
      angleMode = "degrees";
      //textFont(createFont("ink free", 0));
      textFont(createFont("Verdana", 0));
      var lag = false;
      var game;
      var cannon;
  } //Defaults
  
  {
      //Key|Button stuff
      var clicked = false;
      var hover = false;
      var keys = [];
      keyPressed = function () {
          keys[keyCode] = true;
      };
      keyReleased = function () {
          keys[keyCode] = false;
      };
      mouseClicked = function () {
          clicked = true;
      };
  } //Keys/Mouse
  
  {
      var Button = function(config) {
          this.x = config.pos.x || 0;
          this.y = config.pos.y || 0;
          this.radius = config.radius || 80;
          this.radiusBase = this.radius;
          this.content = config.content || "Home";
          this.page = config.page || "home";
          this.level = config.level || 0;
          this.amplitude = this.radius * 0.1;
          this.colorLight = config.colorLight || color(255, 161, 25);
          this.colorDark = config.colorDark || color(244, 106, 7);
          this.colorLightAlpha = color(red(this.colorLight), green(this.colorLight), blue(this.colorLight), 100);
          this.colorDarkAlpha = color(red(this.colorDark), green(this.colorDark), blue(this.colorDark), 100);
          this.colorHover = color(red(this.colorLight), green(this.colorLight), blue(this.colorLight), 60);
          this.colorHoverOuter = color(red(this.colorLight), green(this.colorLight), blue(this.colorLight), 40);
          
          this.textColor = config.textColor || color(0, 0, 0, 200);
          this.textSize = config.textSize || 20;
          this.angleBase = floor(random(-30, 30));
          this.angle = this.angleBase;
          this.hover = false;
          this.scale = 1;
      };
      
      Button.prototype.update = function() {
          this.scale = abs(sin(radians(frameCount*1.1)) * 0.1) + 1;
      };
      
      Button.prototype.display = function () {
          textSize(this.textSize);
          strokeWeight(1);
          noStroke();
  
          //circles
          if (dist(mouseX, mouseY, this.x, this.y) <= this.radius / 2) { //hover
              this.hover = true;
              if(clicked) {
                  game.page = this.page;
                  
                  if(this.page === "level") {
                      game.page = "next";
                      game.level = this.level;
                  }
                  else {
                      game.reset();
                  }
              }
              
              this.drawPlanet();
              
          }
          else { //not hover
              this.hover = false;
              this.drawPlanet();
          }
      };
      
      Button.prototype.drawPlanet = function() {
          this.angle++;
          if(this.hover === true) {
              this.angle++;
              
              pushMatrix();
                  translate(this.x, this.y);
                  scale(this.scale);
                  
                  fill(this.colorHover);
                  ellipse(0, 0, this.radius*1.2, this.radius*1.2);
                  fill(this.colorHoverOuter);
                  ellipse(0, 0, this.radius*1.4, this.radius*1.4);
  
                  fill(this.colorLight);
                  rotate(radians(-frameCount*2));
                  ellipse(0, -this.radius*1.2/2, 5, 5);
                  ellipse(0, this.radius*1.2/2, 5, 5);
                  ellipse(-this.radius*1.2/2, 0, 5, 5);
                  ellipse(this.radius*1.2/2, 0, 5, 5);
                  rotate(radians(frameCount*4));
                  fill(this.colorDark);
                  ellipse(0, -this.radius*1.4/2, 5, 5);
                  ellipse(0, this.radius*1.4/2, 5, 5);
                  ellipse(-this.radius*1.4/2, 0, 5, 5);
                  ellipse(this.radius*1.4/2, 0, 5, 5);
              popMatrix();
              
          }
          
          noStroke();
          fill(this.color);
          
          pushMatrix();
              translate(this.x, this.y);
              
              scale(this.scale);
              
              rotate(radians(this.angle));
              //right
              fill(this.colorLight);
              arc(0, 0, this.radius, this.radius, radians(90), radians(270));
              fill(this.colorDark);
              arc(0, 0, this.radius, this.radius, radians(-89), radians(90));
              
              noFill();
              strokeWeight(8 * (this.radius/this.radiusBase));
              strokeCap(ROUND);
              
              stroke(this.colorDarkAlpha);
              line(-this.radius*0.05, -this.radius*0.4, this.radius*0.2, -this.radius*0.4);
              line(-this.radius*0.3, -this.radius*0.2, this.radius*0.2, -this.radius*0.2);
              line(-this.radius*0.1, 0, this.radius*0.2, 0);
              line(-this.radius*0.2, this.radius*0.2, this.radius*0.2, this.radius*0.2);
              line(-this.radius*0.1, this.radius*0.4, this.radius*0.2, this.radius*0.4);
              
              stroke(this.colorLightAlpha);
              line(-this.radius*0.05, -this.radius*0.3, this.radius*0.1, -this.radius*0.3);
              line(-this.radius*0.3, -this.radius*0.1, this.radius*0.2, -this.radius*0.1);
              line(-this.radius*0.1, this.radius*0.1, this.radius*0.3, this.radius*0.1);
              line(-this.radius*0.3, this.radius*0.3, this.radius*0.2, this.radius*0.3);
              
              stroke(this.colorLight);
              strokeWeight(4 * (this.radius/this.radiusBase));
              ellipse(0, 0, this.radius*0.95, this.radius*0.95);
          popMatrix();
          
          textAlign(CENTER, CENTER);
          fill(this.textColor);
          text(this.content, this.x, this.y);
      };
      
      Button.prototype.run = function() {
          this.update();
          this.display();
      };
  } //Buttons
  
  {
      var colors = [
          color(255, 255, 255),
          color(104, 200, 38),
          color(1, 168, 210),
          color(244, 105, 4),
          color(117, 39, 149)
      ];    
  } //Colors
  
  {
      
      var Star = function(config) {
          this.pos = config.pos || new PVector(random(0, width), random(0, height));
          this.size = config.size || 10;
          this.velocity = config.velocity || new PVector(0, 0);
          this.color = colors[floor(random(0, colors.length))];
          this.r = red(this.color);
          this.b = blue(this.color);
          this.g = green(this.color);
          this.backColor = color(this.r, this.g, this.b, random(50, 100));
      };
      
      Star.prototype.update = function() {
          this.pos.add(this.velocity);
      };
      
      Star.prototype.display = function() {
          noFill();
          stroke(this.backColor);
          strokeWeight(this.size*0.5);
          strokeCap(ROUND);
          pushMatrix();
              translate(this.pos.x, this.pos.y);
              line(0, -this.size/2, 0, this.size/2);
              line(-this.size/2, 0, this.size/2, 0);
          popMatrix();
      };
      
      Star.prototype.run = function() {
          this.update();
          this.display();
      };
      
  } //Star
  
  {
      
      var Barrier = function(config) {
          this.pos = config.pos || new PVector(0, 0);
          this.w = config.w || 100;
          this.h = config.h || 20;
          this.color = config.color || color(255, 0, 0);
          this.color2 = config.color2 || color(255, 255, 0);
          this.theta = config.theta || random(0.7, 1.2);
          this.amplitude = config.amplitude || random(0.3, 0.5);
      };
      
      Barrier.prototype.update = function() {
          this.pos.y += sin(radians(frameCount * this.theta)) * this.amplitude;
      };
      
      Barrier.prototype.display = function() {
          noStroke();
          fill(red(this.color), green(this.color), blue(this.color), 200);
          rect(this.pos.x, this.pos.y, this.w, this.h, 5);
          fill(0, 0, 0, 40);
          rect(this.pos.x, this.pos.y + this.h/2, this.w, this.h/2, 5);
      };
      
      Barrier.prototype.run = function() {
          this.update();
          this.display();
      };
      
      Barrier.prototype.collision = function (missile) {
          if (missile.pos.x + missile.size / 2 > this.pos.x &&
              missile.pos.y + missile.size / 2 > this.pos.y &&
              missile.pos.x - missile.size / 2 < this.pos.x + this.w &&
              missile.pos.y - missile.size / 2 < this.pos.y + this.h) {
              game.addExplosion({
                  pos: new PVector(missile.pos.x, missile.pos.y),
                  backColor: this.color,
                  w: 40,
                  h: 40
              });
              return true;
          }
          return false;
      };
      
  } //Barrier
  
  {
      
      var Oscillator = function(config) {
          this.origin = config.origin || new PVector(width/2, height/2);
          this.angle = config.angle || new PVector(0, 0);
          this.velocity = config.velocity || new PVector(random(-2, 2), random(-2, 2));
          this.amplitude = config.amplitude || new PVector(random(this.origin.x*0.3, this.origin.x*0.5), random(this.origin.y*0.3, this.origin.y*0.5));
          this.radius = this.amplitude.mag()*0.25;
          
          this.color = config.color || colors[floor(random(1, colors.length))];
          this.r = red(this.color);
          this.g = green(this.color);
          this.b = blue(this.color);
          
          this.pos = config.pos || new PVector(0, 0);
          
          this.w = config.w || this.radius;
          this.h = config.h || this.radius;
          this.thetaX = 0.0;
          this.thetaY = 0.0;
          this.amplitude2 = config.amplitude2 || 5.0;
          this.dx = 0.0;
          this.dy = 0.0;
          this.thetaChangeX = random(3, 12);
          this.thetaChangeY = random(3, 12);
      };
      
      Oscillator.prototype.oscillate = function() {
          this.thetaX += this.thetaChangeX;
          this.thetaY += this.thetaChangeY;
          this.dx = sin(radians(this.thetaX)) * this.amplitude2;
          this.dy = sin(radians(this.thetaY)) * this.amplitude2;
          this.w = this.dx + this.radius;
          this.h = this.dy + this.radius;
          
          this.amplitude.mult(1.001);
          this.amplitude.limit(300);
          this.angle.add(this.velocity);
      };
      
      Oscillator.prototype.display = function() {
          this.pos.x = sin(radians(this.angle.x)) * this.amplitude.x;
          this.pos.y = sin(radians(this.angle.y)) * this.amplitude.y;
       
          var v = new PVector(this.pos.x, this.pos.y);
          
          var opacity = map(v.mag(), 0, this.origin.x, 70, 255);
          
          this.pos.add(this.origin);
      
          pushMatrix();
      
          stroke(200, 200, 200, 30);
          strokeWeight(1);
          line(this.origin.x, this.origin.y, this.pos.x, this.pos.y);
          noStroke();
          
          fill(this.r, this.g, this.b, opacity);
          ellipse(this.pos.x, this.pos.y, this.w, this.h);
          
          fill(0, 0, 0, 20);
          arc(this.pos.x, this.pos.y, this.w, this.h, 0, radians(180));
          
          popMatrix();
      };
      
      Oscillator.prototype.run = function() {
          this.oscillate();
          this.display();
      };
      
      Oscillator.prototype.collision = function(obj) {
          var dx = this.pos.x - obj.pos.x;
          var dy = this.pos.y - obj.pos.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.radius/2 + obj.size/2) {
              game.addExplosion({
                  pos: this.pos,
                  backColor: this.color,
                  w: 40,
                  h: 40
              });
              
              return true;
          }
          return false;
      };
      
      var OscillatorSystem = function(config) {
          this.oscillators = [];
          this.num = config.num || 1;
      
          for(var i = 0; i < this.num; i++) {
              this.oscillators.push(new Oscillator({}));
          }
      };
      
      OscillatorSystem.prototype.run = function() {
          for(var i = 0; i < this.oscillators.length; i++) {
              this.oscillators[i].run();
          }
      };
      
      OscillatorSystem.prototype.add = function(n) {
          for(var i = 0; i < n; i++) {
              this.oscillators.push(new Oscillator({}));
          }
      };
      
  } //Oscillator
  
  {
      
      var Wave = function(config) {
          this.xSpacing = config.xSpacing || 16;
          this.theta = config.theta || 0.0;
          this.amplitude = config.amplitude || 25.0;
          this.baseHeight = config.baseHeight || height * 0.8;
          this.radius = config.radius || 25;
          this.points = config.points || new Array(width + this.xSpacing);
          this.colors = [
              color(104, 200, 38, 150),
              color(1, 168, 210, 150),
              color(244, 105, 4, 150),
              color(117, 39, 149, 150)
          ];
      };
      
      Wave.prototype.init = function() {
          this.points = new Array(width + this.xSpacing);
          
          var x = this.theta;
          var c;
          for (var i = 0; i < this.points.length; i++) {
              c = this.colors[floor(random(0, this.colors.length))];
              this.points[i] = {
                  y: sin(radians(x)) * this.amplitude,
                  color: c,
                  shade: color(red(c), green(c), blue(c), 50)
              };
              x += 1;
          }
      };
      
      Wave.prototype.update = function() {
          this.theta += 2;
          
          var x = this.theta;
          for (var i = 0; i < this.points.length; i++) {
              this.points[i].y = sin(radians(x)) * this.amplitude;
              x += 1;
          }
      };
      
      Wave.prototype.display = function() {
          noStroke();
          
          for(var x = 0; x < this.points.length; x+= this.xSpacing * 2) {
              fill(this.points[x].shade);
              rect(x - this.radius/4, this.baseHeight + this.points[x].y + this.radius/2, this.radius/2, height);
              fill(this.points[x].color);
              ellipse(x, this.baseHeight + this.points[x].y, this.radius, this.radius);
              fill(0, 0, 0, 40);
              arc(x, this.baseHeight + this.points[x].y, this.radius, this.radius, 0, radians(180));
          }
      };
      
      Wave.prototype.run = function() {
          this.update();
          this.display();
      };
  
  } //Wave
  
  {
      
      var Spiral = function(config) {
          this.pos = config.pos || new PVector(width/2, height/2);
          this.basePos = new PVector(this.pos.x, this.pos.y);
          this.speed = config.speed || random(3, 6);
          this.radius = config.radius || random(20, 40);
          this.xAmp = 0;
          this.yAmp = 0;
          this.xAmpSpeed = random(0.0007, 0.001);
          this.yAmpSpeed = random(0.0007, 0.001);
          this.dir = config.dir || random() < 0.5 ? 1 : -1;
          this.index = 0;
          this.colors = [
              color(104, 200, 38),
              color(1, 168, 210),
              color(244, 105, 4),
              color(117, 39, 149)
          ];
          this.color = config.color || this.colors[floor(random(this.colors.length))];
          this.r = red(this.color);
          this.g = green(this.color);
          this.b = blue(this.color);
      };
      
      Spiral.prototype.update = function() {
          this.index+= this.speed;
          this.pos = new PVector(sin(radians(this.index*this.dir)) * width * this.xAmp + this.basePos.x, -cos(radians(this.index*this.dir)) * height * this.yAmp + this.basePos.y);
          
          this.xAmp+= this.xAmpSpeed;
          this.yAmp+= this.yAmpSpeed;
      };
      
      Spiral.prototype.display = function() {
          noStroke();
          
          fill(this.r, this.g, this.b, 200);
          ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
          
          fill(0, 0, 0, 20);
          arc(this.pos.x, this.pos.y, this.radius, this.radius, 0, radians(180));
      };
      
      Spiral.prototype.collision = function(obj) {
          var dx = this.pos.x - obj.pos.x;
          var dy = this.pos.y - obj.pos.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.radius/2 + obj.size/2) {
              game.addExplosion({
                  pos: this.pos,
                  backColor: this.color,
                  w: 40,
                  h: 40
              });
              
              return true;
          }
          return false;
      };
      
      Spiral.prototype.run = function() {
          this.update();
          this.display();
      };
      
      var SpiralSystem = function(config) {
          this.spirals = [];
          this.trails = [];
      };
      
      SpiralSystem.prototype.update = function() {
          for(var i = this.trails.length-1; i >= 0; i--) {
              if(this.trails[i].timeToLive-- <= 0) {
                  this.trails.splice(i, 1);
              }
          }
      };
      
      SpiralSystem.prototype.display = function() {
          noStroke();
          for(var i = this.trails.length-1; i >= 0; i--) {
              var trail = this.trails[i];
              fill(trail.r, trail.g, trail.b, trail.timeToLive);
              ellipse(trail.pos.x, trail.pos.y, trail.radius, trail.radius);
          }
      };
      
      SpiralSystem.prototype.add = function(n) {
          for(var i = 0; i < n; i++) {
              this.spirals.push(new Spiral({
                  pos: new PVector(random(width*0.3, width*0.7), random(height*0.3, height*0.5))
              }));
          }
      };
      
      SpiralSystem.prototype.run = function() {
          var n = 0;
          for(var i = this.spirals.length-1; i >= 0; i--) {
              var spiral = this.spirals[i];
              
              if(spiral.pos.x + spiral.radius * 5 < 0 || spiral.pos.x - spiral.radius * 5 > width || spiral.pos.y - spiral.radius * 5 > height || spiral.pos.y + spiral.radius * 5 < 0) {
                  this.spirals.splice(i, 1);
                  n++;
              }
              else {
                  this.trails.push(
                  {
                      timeToLive: floor(random(50, 70)),
                      radius: random(spiral.radius*0.2, spiral.radius*0.4),
                      pos: new PVector(spiral.pos.x, spiral.pos.y),
                      r: spiral.r,
                      g: spiral.g,
                      b: spiral.b
                  });
                  
                  spiral.run();
              }
          }
          
          this.add(n);
          
          this.update();
          this.display();
      };
  
  } //Spiral
  
  {
      var Enemy = function(config) {
          this.pos = config.pos || new PVector(width/2, height/2);
          this.radius = config.radius || 30;
          this.dir = config.dir || new PVector(0, 0);
          this.acceleration = config.acceleration || new PVector(0, 0);
          this.angle = config.angle || 0;
          this.rotate = config.rotate || 5;
          this.color = config.color || color(253, 163, 25, 200);
          this.color2 = config.color2 || color(246, 104, 4, 200);
      };
      
      Enemy.prototype.update = function() {
          this.angle+=this.rotate;
          this.pos.add(this.acceleration);    
      };
      
      Enemy.prototype.display = function() {
          noFill();
          strokeWeight(this.radius*0.2);
          strokeCap(ROUND);
          pushMatrix();
              translate(this.pos.x, this.pos.y);
              rotate(radians(this.angle));
              stroke(this.color);
              line(0, -this.radius/3, 0, this.radius/3);
              stroke(this.color2);
              line(-this.radius/3, 0, this.radius/3, 0);
          popMatrix();
      };
      
      Enemy.prototype.run = function() {
          this.update();
          this.display();
      };
      
      Enemy.prototype.collision = function(missile) {
          if (missile.pos.x + missile.size / 2 > this.pos.x &&
              missile.pos.y + missile.size / 2 > this.pos.y &&
              missile.pos.x - missile.size / 2 < this.pos.x + this.radius/2 &&
              missile.pos.y - missile.size / 2 < this.pos.y + this.radius/2) {
                  
              game.addExplosion({
                  pos: new PVector(this.pos.x + this.radius / 2, this.pos.y + this.radius / 2),
                  w: 40,
                  h: 40,
                  backColor: this.color
              });
              
              return true;
          }
          return false;
      };
      
  } //Enemy
  
  {
      var Boss = function(config) {
          this.pos = config.pos || new PVector(width/2, height/2);
          this.basePos = new PVector(this.pos.x, this.pos.y);
          this.radius = config.radius || 80;
          this.baseRadius = this.radius;
          this.color = config.color || color(253, 163, 25, 200);
          this.colorInner = config.colorInner || color(246, 104, 4);
          this.colorHover = color(red(this.color), green(this.color), blue(this.color), 60);
          this.colorHoverOuter = color(red(this.color), green(this.color), blue(this.color), 40);
          this.enemies = [];
          this.angle = 0;
          this.amplitude = 10;
          this.rotate = config.rotate || 5;
          this.lives = config.lives || 10;
          this.forceField = config.forceField || 10;
          this.oscillators = config.oscillators || 0;
          this.enemyFrequency = config.enemyFrequency || 0.04;
      };
      
      Boss.prototype.update = function() {
          this.pos.y = this.basePos.y + (sin(radians(frameCount*1.5)) * this.amplitude);
          this.angle+=this.rotate;
          
          //add new enemy
          if(this.forceField <= 0) {
              this.enemyFrequency = 0.05;   
          }
          
          if(random() < this.enemyFrequency) {
              var xDir = random() < 0.5 ? 1 : -1;
              var yDir = random() < 0.5 ? 1 : -1;
              this.enemies.push(
                  new Enemy({
                      pos: new PVector(this.pos.x, this.pos.y),
                      acceleration: new PVector(random(1, 3) * xDir, random(1, 3) * yDir)
                  })
              );
          }
          
          for(var i = 0; i < this.enemies.length; i++) {
              this.enemies[i].run();    
          }
      };
      
      Boss.prototype.display = function() {
          if(this.lives > 0) {
  
              //Force Field
              if(this.forceField > 0) {
                  pushMatrix();
                  translate(this.pos.x, this.pos.y);
                  noFill();
                  stroke(this.colorHover);
                  ellipse(0, 0, this.radius*1.2, this.radius*1.2);
                  stroke(this.colorHoverOuter);
                  ellipse(0, 0, this.radius*1.4, this.radius*1.4);
                  noStroke();
                  fill(this.colorInner);
                  rotate(radians(-frameCount*2));
                  ellipse(0, -this.radius*1.2/2, 5, 5);
                  ellipse(0, this.radius*1.2/2, 5, 5);
                  ellipse(-this.radius*1.2/2, 0, 5, 5);
                  ellipse(this.radius*1.2/2, 0, 5, 5);
                  rotate(radians(frameCount*4));
                  fill(this.color);
                  ellipse(0, -this.radius*1.4/2, 5, 5);
                  ellipse(0, this.radius*1.4/2, 5, 5);
                  ellipse(-this.radius*1.4/2, 0, 5, 5);
                  ellipse(this.radius*1.4/2, 0, 5, 5);
                  popMatrix();
              }
              
              pushMatrix();
                  translate(this.pos.x, this.pos.y);
                  
                  noStroke();
                  fill(this.color);
                  
                  //right
                  fill(255, 161, 25);
                  arc(0, 0, this.radius, this.radius, radians(90), radians(270));
                  fill(244, 106, 7);
                  arc(0, 0, this.radius, this.radius, radians(-89), radians(90));
                  
                  noFill();
                  strokeWeight(8);
                  strokeCap(ROUND);
                  
                  stroke(244, 106, 7, 100);
                  line(-this.radius*0.05, -this.radius*0.4, this.radius*0.2, -this.radius*0.4);
                  line(-this.radius*0.3, -this.radius*0.2, this.radius*0.2, -this.radius*0.2);
                  line(-this.radius*0.1, 0, this.radius*0.2, 0);
                  line(-this.radius*0.2, this.radius*0.2, this.radius*0.2, this.radius*0.2);
                  line(-this.radius*0.1, this.radius*0.4, this.radius*0.2, this.radius*0.4);
                  
                  stroke(255, 161, 25, 100);
                  line(-this.radius*0.05, -this.radius*0.3, this.radius*0.1, -this.radius*0.3);
                  line(-this.radius*0.3, -this.radius*0.1, this.radius*0.2, -this.radius*0.1);
                  line(-this.radius*0.1, this.radius*0.1, this.radius*0.3, this.radius*0.1);
                  line(-this.radius*0.3, this.radius*0.3, this.radius*0.2, this.radius*0.3);
                  
                  stroke(255, 161, 25);
                  strokeWeight(4);
                  ellipse(0, 0, this.radius*0.95, this.radius*0.95);
              popMatrix();
              
              pushMatrix();
                  translate(this.pos.x, this.pos.y);
                  fill(0, 0, 0, 100);
                  textSize(20);
                  textAlign(CENTER, CENTER);
                  text(this.lives, 0, 0);
              popMatrix();
          }
      };
      
      Boss.prototype.run = function() {
          this.update();
          this.display();
      };
      
      Boss.prototype.collision = function (missile) {
          var dx = this.pos.x - missile.pos.x;
          var dy = this.pos.y - missile.pos.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.radius/2 + missile.size) {
              if(this.forceField <= 0) {
                  this.lives--;
              }
              return true;
          }
          return false;
      };
  
  } //Boss
  
  {
      var Alien = function(config) {
          this.index = config.index || 0;
          this.pos = new PVector(sin(radians(this.index)) * width * 0.46 + width/2, -cos(radians(this.index)) * height * 0.46 + height/2);
          this.w = config.w || random(20, 50);
          this.h = config.h || random(20, 50);
          this.thetaX = 0.0;
          this.thetaY = 0.0;
          this.amplitude = config.amplitude || 5.0;
          this.dx = 0.0;
          this.dy = 0.0;
          this.base = random(30, 50);
          this.thetaChangeX = random(3, 12);
          this.thetaChangeY = random(3, 12);
          this.color = config.color || colors[floor(random(1, colors.length))];
          this.color = color(red(this.color), green(this.color), blue(this.color), random(100, 200));
          this.attack = false;
          this.timeToAttack = config.timeToAttack || floor(random(100, 1000));
          this.dead = false;
          this.attackPos = new PVector(0, 0);
          this.velocity = config.velocity || new PVector(0, 0);
          this.target = config.direction || new PVector(width/2, height/2);
          this.topspeed = 2;
      };
      
      Alien.prototype.setDirection = function() {
          this.acceleration = PVector.sub(this.attackPos, this.target);
          this.acceleration.normalize();
          this.acceleration.mult(2);
      };
      
      Alien.prototype.update = function() {
          this.thetaX += this.thetaChangeX;
          this.thetaY += this.thetaChangeY;
          this.dx = sin(radians(this.thetaX)) * this.amplitude;
          this.dy = sin(radians(this.thetaY)) * this.amplitude;
          this.w = this.dx + this.base;
          this.h = this.dy + this.base;
          
          if(this.attack === true && this.dead === false) {
              this.velocity.add(this.acceleration);
              this.velocity.limit(this.topspeed);
              this.attackPos.sub(this.velocity);   
          }
      };
      
      Alien.prototype.display = function() {
          noStroke();
          if(this.attack === false) {
              fill(this.color);
          }
          else {
              fill(41, 40, 41);
          }
          ellipse(this.pos.x, this.pos.y, this.w, this.h);
          fill(0, 0, 0, 20);
          arc(this.pos.x, this.pos.y, this.w, this.h, 0, radians(180));
          
          if(this.attack === true && this.dead === false) {
              fill(this.color);
              ellipse(this.attackPos.x, this.attackPos.y, this.w, this.h);
              fill(0, 0, 0, 20);
              arc(this.attackPos.x, this.attackPos.y, this.w, this.h, 0, radians(180));
          }
      };
      
      Alien.prototype.run = function() {
          this.update();
          this.display();
      };
      
      Alien.prototype.collision = function (missile) {
          if (missile.pos.x + missile.size / 2 > this.attackPos.x &&
              missile.pos.y + missile.size / 2 > this.attackPos.y &&
              missile.pos.x - missile.size / 2 < this.attackPos.x + this.w &&
              missile.pos.y - missile.size / 2 < this.attackPos.y + this.h) {
              game.addExplosion({
                  pos: this.attackPos,
                  backColor: this.color,
                  w: 40,
                  h:40
              });
              return true;
          }
          return false;
      };
      
      var AlienArmy = function(config) {
          this.killed = 0;
          this.diameter = config.diameter || width * 0.95;
          this.color = config.color || color(random(100, 160), random(100, 160), random(100, 160), random(100, 150));
          this.aliens = [];
          
          for(var i = 0; i < 360; i+= 10) {
              this.aliens.push(
                  new Alien({
                      index: i
                  }));
          }
          
          this.angle = config.angle || 0;
          this.speed = config.speed || 0.5;
      };
      
      AlienArmy.prototype.update = function() {
          for(var i = 0; i < this.aliens.length; i++) {
              var alien = this.aliens[i];
              
              alien.index+= 0.2;
              alien.pos = new PVector(sin(radians(alien.index)) * width * 0.46 + width/2, -cos(radians(alien.index)) * height * 0.46 + height/2);
              
              if(alien.attack === false && alien.timeToAttack <= 0) {
                  alien.attack = true;
                  alien.attackPos = new PVector(alien.pos.x, alien.pos.y);
                  alien.setDirection();
              }
              else {
                  alien.timeToAttack-= this.speed;   
              }
          }
      };
      
      AlienArmy.prototype.display = function() {
          for(var i = 0; i < this.aliens.length; i++) {
              this.aliens[i].run();
          }
      };
      
      AlienArmy.prototype.run = function() {
          this.update();
          this.display();
      };
  } //Alien
  
  {
      var Blob = function(config) {
          this.pos = config.pos || new PVector(random(width*0.1, width*0.9), -height*0.25);
          this.radius = config.radius || random(15, 30);
          this.amplitude = config.amplitude || 0.2;
          this.color = config.color || colors[floor(random(1, colors.length - 1))];
          this.color = color(red(this.color), green(this.color), blue(this.color), random(100, 200));
          
          this.velocity = config.velocity || new PVector(0, 0);
          this.target = config.target || new PVector(width/2, height/2);
          this.topspeed = config.topspeed || 3;
          
          this.t = PVector.sub(this.target, this.pos);
          this.acceleration = new PVector(this.t.x, this.t.y);
          this.acceleration.normalize();
          this.acceleration.mult(this.topspeed);
      };
      
      Blob.prototype.applyForce = function (force) {
          this.acceleration.add(force);
      };
      
      Blob.prototype.update = function() {
          this.pos.add(this.acceleration);
      };
      
      Blob.prototype.display = function() {
          noStroke();
          
          fill(this.color);
          ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
          fill(0, 0, 0, 20);
          arc(this.pos.x, this.pos.y, this.radius, this.radius, 0, radians(180));
      };
      
      Blob.prototype.run = function() {
          this.update();
          this.display();
      };
      
      Blob.prototype.collision = function (obj) {
          var dx = this.pos.x - obj.pos.x;
          var dy = this.pos.y - obj.pos.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.radius/2 + obj.size/2) {
              game.addExplosion({
                  pos: this.pos,
                  backColor: this.color,
                  w: 40,
                  h: 40
              });
              
              return true;
          }
          return false;
      };
      
      var Blobs = function(config) {
          this.topspeed = config.topspeed || 3;
          this.blobsArray = [];
          this.trails = [];
          
          this.pos = config.pos || new PVector(width/2, height/2);
          this.radius = config.radius || 40;
          
          this.frequency = lag === true ? 3 : 2;
      };
      
      Blobs.prototype.addBlob = function(cannon) {
          this.blobsArray.push(
              new Blob({
                  target: new PVector(cannon.pos.x, cannon.pos.y),
                  topspeed: this.topspeed,
              })
          );
      };
      
      Blobs.prototype.update = function() {
          for(var i = this.blobsArray.length - 1; i >= 0; i--) {
              var blob = this.blobsArray[i];
              
              //if(blob.pos.y >= blob.target.y) {
              if(blob.pos.y >= height * 1.1) {
                  this.blobsArray.splice(i, 1);
              }
              else {
                  if(frameCount % this.frequency === 0) {
                      this.trails.push(
                          {
                              timeToLive: 200,
                              pos: new PVector(blob.pos.x + random(-5, 5), blob.pos.y),
                              radius: random(blob.radius/4, blob.radius/2),
                              color: random() < 0.5 ? [90, 160, 150] : [70, 108, 111]
                          }
                      );
                  }
              }
          }
      };
      
      Blobs.prototype.display = function() {
          noStroke();
          for(var i = this.trails.length - 1; i >= 0; i--) {
              var trail = this.trails[i];
              
              if(lag === true) {
                  trail.timeToLive-= floor(random(4, 6));
              }
              else {
                  trail.timeToLive-= floor(random(2, 4));
              }
  
              if(trail.timeToLive <= 0) {
                  this.trails.splice(i, 1);
              }
              else {
                  fill(trail.color[0], trail.color[1], trail.color[2], trail.timeToLive);
                  ellipse(trail.pos.x, trail.pos.y, trail.radius, trail.radius);
              }
          }
          
          for(var i = 0; i < this.blobsArray.length; i++) {
              this.blobsArray[i].run();
          }
      };
      
      Blobs.prototype.run = function() {
          this.update();
          this.display();
      };
  
  } //Blob
  
  {
      var Missile = function (config) {
          this.pos = config.pos || new PVector(0, 0);
          this.velocity = config.velocity || new PVector(0, 0);
          this.acceleration = config.acceleration || new PVector(0, 0);
          this.thrust = config.thrust || new PVector(0, 0);
          this.gravity = config.gravity || new PVector(0, 0);
          this.size = config.size || 10;
          this.applyForce(this.thrust);
          this.color = config.color || color(255, 255, 255, 200);
      };
  
      Missile.prototype.applyForce = function (force) {
          this.acceleration.add(force);
      };
  
      Missile.prototype.update = function () {
          this.applyForce(this.gravity);
          this.velocity.add(this.acceleration);
          this.pos.add(this.velocity);
          this.acceleration.mult(0);
      };
  
      Missile.prototype.display = function () {
          fill(38, 36, 36);
          fill(this.color);
          noStroke();
          pushMatrix();
          translate(this.pos.x, this.pos.y);
          ellipse(0, 0, this.size, this.size);
          popMatrix();
      };
  
      Missile.prototype.run = function () {
          this.update();
          this.display();
      };
  
  } //Missile
  
  {
      var Explosion = function (config) {
          this.pos = config.pos || new PVector(0, 0);
          this.w = config.w || 15;
          this.h = config.h || 15;
          this.rotation = random(360);
          this.rotationDelta = config.rotationDelta || random(-5, 5);
          this.velocity = config.velocity || new PVector(0, 0);
          this.acceleration = config.acceleration || new PVector(0, 0);
          this.force = config.force || new PVector(random(-2, 2), random(-2, 2));
          this.timeToLive = 255;
          this.red = config.red || random(255);
          this.green = config.green || random(255);
          this.blue = config.blue || random(255);
          this.applyForce(this.force);
      };
  
      Explosion.prototype.applyForce = function (force) {
          this.acceleration.add(force);
      };
  
      Explosion.prototype.update = function () {
          this.velocity.add(this.acceleration);
          this.pos.add(this.velocity);
          this.acceleration.mult(0);
          this.rotation += this.rotationDelta;
      };
  
      Explosion.prototype.display = function () {
          pushMatrix();
          translate(this.pos.x, this.pos.y);
          rotate(radians(this.rotation));
          noStroke();
          fill(color(this.red, this.green, this.blue, this.timeToLive));
          rect(-this.w / 2, -this.h / 2, this.w, this.h);
          popMatrix();
      };
  
      Explosion.prototype.run = function () {
          this.update();
          this.display();
      };
  
  } //Explosion
  
  {
      var Spike = function(config) {
          this.x = config.x;
          this.y = config.y || 5;
          this.size = config.size;
          this.w = this.size;
          this.h = this.size * 1.4;
          this.color = config.color;
          this.color1 = color(red(this.color), green(this.color), blue(this.color), 200);
          this.color2 = color(red(this.color), green(this.color), blue(this.color), 150);
      };
      
      var Island = function(config) {
          this.w = config.w || 300;
          this.h = config.h || 8;
          this.maxWidth = 100;
          this.spikes = [];
          this.colors = [
              color(104, 200, 38),
              color(1, 168, 210),
              color(244, 105, 4)
          ];
          this.numberOfSpikes = config.numberOfSpikes || round(this.w/25);
          
          this.floorColor = this.colors[floor(random(0, this.colors.length))];
          
          this.init();
      };
      
      Island.prototype.init = function() {
           for(var i = 0; i < this.numberOfSpikes; i++) {
              this.spikes.push(
                  new Spike ({
                  x: random(this.maxWidth / 2, this.w-this.maxWidth/2),
                  size: random(30, this.maxWidth), 
                  color: this.colors[floor(random(0, this.colors.length))]
              }));
          }
          
          var l = floor(random(1, 4));
          var r = floor(random(1, 4));
          
          this.spikes.push(
                  new Spike ({
                  x: this.maxWidth/l/2*1.1,
                  size: this.maxWidth/l, 
                  color: this.colors[floor(random(0, this.colors.length))]
              }));
          this.spikes.push(
                  new Spike ({
                  x: this.w-this.maxWidth/r/2*1.1,
                  size: this.maxWidth/r, 
                  color: this.colors[floor(random(0, this.colors.length))]
              }));
                  
      };
      
      Island.prototype.display = function() {
          for(var i = 0; i < this.spikes.length; i++) {
              var spike = this.spikes[i];
              pushMatrix();
                  translate(spike.x, spike.y);
                  noStroke();
                  fill(spike.color1);
                  triangle(-spike.w/2, 0, 0, 0, 0, spike.h);
                  fill(spike.color2);
                  triangle(0, 0, spike.w/2, 0, 0, spike.h);
              popMatrix();
          }
          
          //ground
          noStroke();
          fill(94, 189, 149);
          fill(this.floorColor);
          rect(0, 0, this.w, this.h, 10);
      };
      
      Island.prototype.getIsland = function() {
          background(0, 0, 0, 0);
          this.display();
          return get(0, 0, this.w, this.maxWidth*1.4);
      };
  } //Island
  
  {
      var DeadlyArc = function(config) {
          this.pos = config.pos || new PVector(0, 0);
          this.radius = config.radius || 8;
          this.dir = config.dir || floor(random(0, 4));
          this.color = config.color || color(253, 163, 25, 200);
          this.color2 = config.color2 || color(246, 104, 4, 200);
          this.speed = config.speed || 1.2;
      };
      
      DeadlyArc.prototype.update = function() {
          switch(this.dir) {
              case 0:
                  this.pos.add(-this.speed, 0); //left
                  break;
              case 1:
                  this.pos.add(this.speed, 0); //right
                  break;
              case 2:
                  this.pos.add(0, -this.speed); //up
                  break;
              case 3:
                  this.pos.add(0, this.speed); //down
                  break;
          }
          
          this.radius+= sin(radians(frameCount * 8)) * 0.2;
      };
      
      DeadlyArc.prototype.collision = function(obj) {
          var dx = this.pos.x - obj.pos.x;
          var dy = this.pos.y - obj.pos.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.radius/2 + obj.size/2) {
              return true;
          }
          return false;
      };
      
      DeadlyArc.prototype.display = function() {
          noStroke();
      
          switch(this.dir) {
              case 0: //left
                  fill(this.color);
                  ellipse(this.pos.x + this.radius * 2, this.pos.y - this.radius * 4, this.radius, this.radius);
                  ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
                  ellipse(this.pos.x + this.radius * 2, this.pos.y + this.radius * 4, this.radius, this.radius);
                  fill(this.color2);
                  ellipse(this.pos.x + this.radius, this.pos.y - this.radius * 2, this.radius, this.radius);
                  ellipse(this.pos.x + this.radius, this.pos.y + this.radius * 2, this.radius, this.radius);
                  break;
              case 1: //right
                  fill(this.color);
                  ellipse(this.pos.x - this.radius * 2, this.pos.y - this.radius * 4, this.radius, this.radius);
                  ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
                  ellipse(this.pos.x - this.radius * 2, this.pos.y + this.radius * 4, this.radius, this.radius);
                  fill(this.color2);
                  ellipse(this.pos.x - this.radius, this.pos.y - this.radius * 2, this.radius, this.radius);
                  ellipse(this.pos.x - this.radius, this.pos.y + this.radius * 2, this.radius, this.radius);
                  break;
              case 2: //up
                  fill(this.color);
                  ellipse(this.pos.x - this.radius * 4, this.pos.y + this.radius * 2, this.radius, this.radius);
                  ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
                  ellipse(this.pos.x + this.radius * 4, this.pos.y + this.radius * 2, this.radius, this.radius);
                  fill(this.color2);
                  ellipse(this.pos.x - this.radius * 2, this.pos.y + this.radius, this.radius, this.radius);
                  ellipse(this.pos.x + this.radius * 2, this.pos.y + this.radius, this.radius, this.radius);
                  break;
              case 3: //down
                  fill(this.color);
                  ellipse(this.pos.x - this.radius * 4, this.pos.y - this.radius * 2, this.radius, this.radius);
                  ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
                  ellipse(this.pos.x + this.radius * 4, this.pos.y - this.radius * 2, this.radius, this.radius);
                  fill(this.color2);
                  ellipse(this.pos.x - this.radius * 2, this.pos.y - this.radius, this.radius, this.radius);
                  ellipse(this.pos.x + this.radius * 2, this.pos.y - this.radius, this.radius, this.radius);
                  break;
          }
      };
      
      DeadlyArc.prototype.run = function() {
          this.update();
          this.display();
      };
  
  } //Deadly Arc
  
  {
      var Transition = function(config) {
          this.blocks = [];
          this.blockSize = config.blockSize || lag === true ? 150 : 75;
          this.fullImage = "";
      };
      
      Transition.prototype.update = function() {
          var block;
          for(var i = this.blocks.length-1; i >= 0; i--) {
              block = this.blocks[i];
              
              if(block.pos.y > height * 1.1) {
                  this.blocks.splice(i, 1);
              }
              else {
                  block.velocity.add(0, 0.2);
                  block.pos.add(block.velocity);
              }
          }
      };
      
      Transition.prototype.display = function() {
          var block;
          noFill();
          stroke(240, 235, 235, 20);
          for(var i = 0; i < this.blocks.length; i++) {
              block = this.blocks[i];
              
              pushMatrix();
                  translate(block.pos.x, block.pos.y);
                  block.angle+= block.velocity.x;
                  rotate(radians(block.angle));
                  image(block.img, 0, 0);
                  rect(0, 0, this.blockSize, this.blockSize);
              popMatrix();
          }
      };
      
      Transition.prototype.init = function() {
          this.fullImage = get(0, 0, width, height);
          
          for(var i = 0; i < width; i+= this.blockSize) {
              for(var j = 0; j < height; j+= this.blockSize) {
                  var img = get(i, j, this.blockSize, this.blockSize);
                  this.blocks.push(
                      {
                          img: img,
                          pos: new PVector(i, j),
                          velocity: new PVector(random(-3, 3), random(-5, -2)),
                          angle: 0
                      });
              }
          }
      };
      
      Transition.prototype.run = function() {
          this.update();
          this.display();
      };
      
  } //Transition
  
  {
      var Cannon = function (config) {
          this.index = config.index || 0;
          this.dir = 1;
          this.speed = 2;
          this.pos = config.pos || new PVector(sin(radians(this.index)) * width * 0.46 + width/2, -cos(radians(this.index)) * height * 0.46 + height/2);
          this.mouse = new PVector(0, 0);
          this.w = config.w || 13;
          this.h = config.h || 40;
          this.size = config.size || 40;
          this.angle = config.angle || 0;
          this.colorLight = config.colorLight || color(1, 105, 142);
          this.colorDark = config.colorDark || color(0, 76, 102);
          this.opacity = 255;
          this.trans = 0;
          this.transSpeed = 15;
      };
      
      Cannon.prototype.setPos = function(dir) {
          switch(this.dir) {
              case "Left":
                  this.pos = new PVector(width * 0.1, height/2);
                  break;
              case "Right":
                  this.pos = new PVector(width * 0.9, height/2);
                  break;
              case "Up":
                  this.pos = new PVector(width/2, height * 0.1);
                  break;
              default:
                  this.pos = new PVector(width/2, height * 0.9);
                  break;
          }
      };
  
      Cannon.prototype.update = function () {
          if(game.level === 1 || game.level === 7) {
              this.index+=0.6 * this.dir;
              this.pos = new PVector(sin(radians(this.index)) * width * 0.46 + width/2, -cos(radians(this.index)) * height * 0.46 + height/2);
              
              if(keys[RIGHT] || keys[68]) {
                  this.dir = -1;
              }
              else if(keys[LEFT] || keys[65]) {
                  this.dir = 1;
              }
          }
          else if(game.level === 2) {
              
          }
          else if(game.level === 3) {
              if(this.trans === 1) {
                  this.opacity+=this.transSpeed;
                  if(this.opacity >= 255) {
                      this.trans = 0;
                  }
              }
              else if(this.trans === -1) {
                  this.opacity-=this.transSpeed;
                  if(this.opacity <= 0) {
                      this.trans = 1;
                      this.setPos();
                  }
              } 
          }
          else if(game.level === 4) {
              if(keys[RIGHT] || keys[68]) { //D or right
                  this.dir = 1;
              }
              else if(keys[LEFT] || keys[65]) { //A or left
                  this.dir = -1;
              }
              else {
                  this.dir = 0;
              }
              
              this.pos.x = constrain(this.pos.x + this.speed * this.dir, 50, width * 0.55);
              this.pos.y = height * 0.64 + (cos(radians(frameCount*1.5)) * 20);
          }
          else if(game.level === 5 || game.level === 6 || game.level === 9) {
              this.speed = 4 * this.dir;
      
              this.pos.x = constrain(this.pos.x + this.speed, 25, width - 25);
              this.index = floor(this.pos.x / game.wave.xSpacing);
              this.pos.y = game.wave.points[this.pos.x].y + game.wave.baseHeight;
              
              if(keys[RIGHT] || keys[68]) { //Right/D
                  this.dir = 1;
              }
              else if(keys[LEFT] || keys[65]) { //Left/A
                  this.dir = -1;
              }
              else {
                  this.dir = 0;
              }
          }
          else if(game.level === 8) {
              if(keys[RIGHT] || keys[68]) { //D or right
                  this.dir = 1;
              }
              else if(keys[LEFT] || keys[65]) { //A or left
                  this.dir = -1;
              }
              else {
                  this.dir = 0;
              }
              
              this.pos.x = constrain(this.pos.x + this.speed * this.dir, this.w, width - this.w);
          }
              
          this.mouse = new PVector(mouseX, mouseY);
          this.mouse.sub(this.pos);
          this.mouse.normalize();
          this.mouse.mult(this.h);
          this.angle = this.mouse.heading() + radians(90);
      };
  
      Cannon.prototype.display = function () {
          pushMatrix();
              translate(this.pos.x, this.pos.y);
              rotate(this.angle);
              noStroke();
              fill(this.colorLight);
              fill(52, 111, 143, this.opacity);
              rect(-this.w / 2, -this.h, this.w, this.h, 5);
              ellipse(0, 0, this.w * 3.5, this.w * 3.5);
              fill(this.colorDark);
              arc(0, 0, this.w * 2.5, this.w * 2.5, 0, radians(270));
          popMatrix();
      };
  
      Cannon.prototype.setDirection = function() {
          if (keyPressed) {
              if(keyCode === 38 || keyCode === 87) { //Up/W
                  this.dir = "Up";
                  this.trans = -1;
              }
              else if(keyCode === 40 || keyCode === 83) { //Down/S
                  this.dir = "Down";
                  this.trans = -1;
              }
              else if(keyCode === 37 || keyCode === 65) { //Left/A
                  this.dir = "Left";
                  this.trans = -1;
              }
              else if(keyCode === 39 || keyCode === 68) { //Right/D
                  this.dir = "Right";
                  this.trans = -1;
              }
              
              keyCode = 0;
          }  
      };
  
      Cannon.prototype.run = function () {
          if(game.level === 3) {
              this.setDirection();
          }
          this.update();
          this.display();
      };
  } //Cannon
  
  {
      var Game = function(config) {
          this.page = "home";
          this.level = 0;
          this.levelComplete = false;
          this.paused = false;
          this.pausedScreen = "";
          this.trans = new Transition({});
          this.delay = 0;
          this.delayAmount = 100;
          this.backgroundColor = color(63, 46, 136);
          this.blobs = new Blobs({});
          this.score = 0;
          this.totalScore = 0;
          this.finalScore = 0;
          this.initialLives = config.initialLives || 5;
          this.lives = this.initialLives;
          this.arcs = [];
          this.barriers = [];
          this.colors = [
              color(104, 200, 38, 150),
              color(1, 168, 210, 150),
              color(244, 105, 4, 150),
              color(117, 39, 149, 150)
          ];
          this.levels = [
              {
                  title: "Level 1",
                  transition: "Destroy the small enemy ships to take\ndown the force field.\n\nUse the AD or Left/Right Arrow keys\nto change direction.",
                  bossLives: 10,
                  forceField: 10,
                  bossPoints: 50,
                  enemyPoints: 10
              },
              {
                  title: "Level 2",
                  transition: "Beware the blobs!!\n\nDestroy them all to progress to\nthe next level.",
                  bossLives: 15,
                  forceField: 15,
                  bossPoints: 100,
                  enemyPoints: 20
              },
              {
                  title: "Level 3",
                  transition: "Teleport to avoid the deadly arcs!!\n\nUse the WASD or Arrow keys to teleport.",
                  bossLives: 20,
                  forceField: 20,
                  bossPoints: 200,
                  enemyPoints: 30
              },
              {
                  title: "Level 4",
                  transition: "Relaxing on the island getaway.\n\nUse the AD or Left/Right Arrow keys to\navoid the meteors.",
                  bossLives: 25,
                  forceField: 25,
                  bossPoints: 300,
                  enemyPoints: 50
              },
              {
                  title: "Level 5",
                  transition: "Might get a little bit sea sick with these waves.\n\nUse the AD or Left/Right Arrow keys to\navoid the meteors.",
                  bossLives: 25,
                  forceField: 25,
                  bossPoints: 500,
                  enemyPoints: 75
              },
              {
                  title: "Level 6",
                  transition: "Those blasted barriers!!\n\nUse the AD or Left/Right Arrow keys to\navoid the meteors.",
                  bossLives: 25,
                  forceField: 25,
                  bossPoints: 1000,
                  enemyPoints: 100
              },
              {
                  title: "Level 7",
                  transition: "Beware the oscillators!!\n\nDestroy them all to progress to\nthe next level.",
                  bossLives: 25,
                  forceField: 20,
                  oscillators: 100,
                  bossPoints: 2000,
                  enemyPoints: 200
              },
              {
                  title: "Level 8",
                  transition: "Might get a bit dizzy watching these spirals.",
                  bossLives: 25,
                  forceField: 20,
                  spirals: 100,
                  bossPoints: 3000,
                  enemyPoints: 300
              },
              { //BOSS Level
                  title: "Level 9",
                  transition: "Finale\n\nTake out the boss!!\n\nGood luck :)",
                  bossLives: 30,
                  forceField: 25,
                  spirals: 1000,
                  bossPoints: 5000,
                  enemyPoints: 500
              }
          ];
          this.backColor = config.backColor || this.colors[2];
          this.textColor = config.textColor || color(255, 255, 255, 200);
          this.textColorLight = config.textColorLight || color(245, 242, 245, 80);
          this.textSizeHeading = 30;
          this.textSizeBody = 18;
          this.textSizeHeadingScene = 24;
          this.alienArmy = new AlienArmy({});
          this.boss = new Boss({});
          this.cannon = new Cannon({
              pos: new PVector(width/2, height/2)
          });
          this.wave = new Wave({});
          this.island = new Island({});
          this.islandImage = this.island.getIsland();
          this.noStars = 20;
          this.stars = [];
          this.missiles = [];
          this.explosions = [];
          this.missileFired = false;
          this.canShoot = true;
          this.enemies = [];
          this.gameOver = false;
          this.numberOfAliens = this.alienArmy.aliens.length;
          this.highScores = [
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              },
              {
                  user: "Could be you",
                  score: 0
              }];
          this.highScores.sort(function(a, b) {
              return b.score - a.score;
          });
          {
              this.playButton = new Button({
                  pos: new PVector(width*0.4, height*0.6),
                  content: "Play",
                  page: "start",
                  radius: 120,
                  textSize: 28
              });
              
              this.howButton = new Button({
                  pos: new PVector(width*0.2, height*0.2),
                  content: "How",
                  page: "how",
                  colorLight: color(105, 201, 41),
                  colorDark: color(3, 165, 212),
                  textSize: 19
              });
              
              this.highScoreButton = new Button({
                  pos: new PVector(width*0.75, height*0.85),
                  content: "High\nScores",
                  page: "scores",
                  radius: 90,
                  colorLight: color(138, 214, 238),
                  colorDark: color(7, 169, 203),
                  textSize: 17
              });
              
              this.levelsButton = new Button({
                  pos: new PVector(width*0.8, height*0.4),
                  content: "Levels",
                  page: "levels",
                  radius: 90,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200),
                  textSize: 19
              });
              
              this.homeButton = new Button({
                  pos: new PVector(width*0.5, height*0.9),
                  content: "Home",
                  page: "home",
                  colorLight: color(235, 41, 149),
                  colorDark: color(163, 38, 148),
                  textColor: color(255, 255, 255, 200),
                  textSize: 18
              });
              
              this.nextButton = new Button({
                  pos: new PVector(width/2, height*0.6),
                  content: "Play",
                  page: "next",
                  textSize: 18
              });
              
              this.replayButton = new Button({
                  pos: new PVector(width/2, height*0.6),
                  content: "Replay",
                  page: "replay",
                  textSize: 18
              });
              
          } //Buttons
          
          {
              
              this.level1Button = new Button({
                  pos: new PVector(width*0.2, height*0.3),
                  content: "1",
                  page: "level",
                  level: 1,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level2Button = new Button({
                  pos: new PVector(width*0.5, height*0.3),
                  content: "2",
                  page: "level",
                  level: 2,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level3Button = new Button({
                  pos: new PVector(width*0.8, height*0.3),
                  content: "3",
                  page: "level",
                  level: 3,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level4Button = new Button({
                  pos: new PVector(width*0.2, height*0.5),
                  content: "4",
                  page: "level",
                  level: 4,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level5Button = new Button({
                  pos: new PVector(width*0.5, height*0.5),
                  content: "5",
                  page: "level",
                  level: 5,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level6Button = new Button({
                  pos: new PVector(width*0.8, height*0.5),
                  content: "6",
                  page: "level",
                  level: 6,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level7Button = new Button({
                  pos: new PVector(width*0.2, height*0.7),
                  content: "7",
                  page: "level",
                  level: 7,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level8Button = new Button({
                  pos: new PVector(width*0.5, height*0.7),
                  content: "8",
                  page: "level",
                  level: 8,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
              this.level9Button = new Button({
                  pos: new PVector(width*0.8, height*0.7),
                  content: "9",
                  page: "level",
                  level: 9,
                  colorLight: color(225, 34, 41),
                  colorDark: color(109, 40, 149),
                  textColor: color(255, 255, 255, 200)
              });
              
          } //Level Buttons
      };
      
      Game.prototype.displayScene1 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Force Field\n" + (this.boss.forceField), width/2, height*0.25);
          textSize(this.textSizeBody);
          text("Destroy the enemies to\ntake out the sheild.", width/2, height*0.75);
              
          this.boss.run();
          
          if(this.gameOver === false) {
              this.cannon.run();
          }
      };
      Game.prototype.displayScene2 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Beware the blobs!!", width/2, height*0.25);
          textSize(this.textSizeBody);
          this.alienArmy.run();
          if(this.gameOver === false) {
              this.cannon.run();
          }
      };
      Game.prototype.displayScene3 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Force Field\n" + (this.boss.forceField), width/2, height*0.25);
          textSize(this.textSizeBody);
          text("Teleport using WASD or Arrows keys\nto avoid the deadly arcs.\n\nThey'll destroy you completely!", width/2, height*0.7);
          
          this.runDeadlyArcs();
          this.boss.run(); 
          if(this.gameOver === false) {
              this.cannon.run();
          }
      };
      Game.prototype.displayScene4 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Force Field\n" + (this.boss.forceField), width/2, height*0.25);
          
          this.boss.run();
          image(this.islandImage, width*0.07, height*0.68 + (cos(radians(frameCount*1.5)) * 20));
          if(this.gameOver === false) {
              this.cannon.run();
          }
          
          if(random() < 0.01) {
              this.blobs.addBlob(this.cannon);
          }
          this.blobs.run();
      };
      Game.prototype.displayScene5 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Force Field\n" + (this.boss.forceField), width/2, height*0.5);
          
          this.boss.run(); 
          this.wave.run();
          if(this.gameOver === false) {
              this.cannon.run();
          }
          
          if(random() < 0.01) {
              this.blobs.addBlob(this.cannon);
          }
          this.blobs.run();
      };
      Game.prototype.displayScene6 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Force Field\n" + (this.boss.forceField), width/2, height*0.4);
          
          this.boss.run(); 
          this.wave.run();
          if(this.gameOver === false) {
              this.cannon.run();
          }
          
          if(random() < 0.01) {
              this.blobs.addBlob(this.cannon);
          }
          this.blobs.run();
          
          this.runBarriers();
      };
      Game.prototype.displayScene7 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Oscillators\n" + this.oscillators, width/2, height*0.25);
          
          textSize(this.textSizeBody);
          text("Use the AD or left/right arrow keys\nto change direction.\n\nYou need to destroy the oscillators!", width/2, height*0.7);
          
          this.oscillatorSystem.run();
          if(this.gameOver === false) {
              this.cannon.run();
          }
      };
      Game.prototype.displayScene8 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Spirals\n" + this.spirals, width/2, height*0.25);
          
          textSize(this.textSizeBody);
          text("Use the portal.\n\nYou need to destroy the spirals!", width/2, height*0.7);
          
          if(random() < 0.01) {
              this.blobs.addBlob(this.cannon);
          }
          this.blobs.run();
          
          this.spiralSystem.run();
          if(this.gameOver === false) {
              this.cannon.run();
          }
      };
      Game.prototype.displayScene9 = function() {
          fill(this.textColorLight);
          textAlign(CENTER);
          textSize(this.textSizeHeadingScene);
          text("Force Field\n" + (this.boss.forceField), width/2, height*0.4);
          
          this.boss.run(); 
          this.wave.run();
          if(this.gameOver === false) {
              this.cannon.run();
          }
          
          if(random() < 0.01) {
              this.blobs.addBlob(this.cannon);
          }
          this.blobs.run();
          this.spiralSystem.run();
          this.runBarriers();
      };
      Game.prototype.displayScene = function() {
          switch(this.level) {
              case 1:
                  this.displayScene1();
                  break;
              case 2:
                  this.displayScene2();
                  break;
              case 3:
                  this.displayScene3();
                  break;
              case 4:
                  this.displayScene4();
                  break;
              case 5:
                  this.displayScene5();
                  break;
              case 6:
                  this.displayScene6();
                  break;
              case 7:
                  this.displayScene7();
                  break;
              case 8:
                  this.displayScene8();
                  break;
              case 9:
                  this.displayScene9();
                  break;
          }
      };
      Game.prototype.addMissile = function () {
          var mouse = this.cannon.mouse.get();
          var dist = PVector.dist(new PVector(mouseX, mouseY), this.cannon.pos);
          dist *= 0.04;
          mouse.normalize();
          mouse.mult(dist);
      
          this.missiles.push(new Missile(
              {
                  pos: PVector.add(this.cannon.pos, this.cannon.mouse),
                  gravity: new PVector(0, 0),
                  thrust: mouse
              }
          ));
      
          this.missileFired = true;
      };
      Game.prototype.runMissiles = function () {
          for(var i = this.missiles.length - 1; i >= 0; i--) {
              var missile = this.missiles[i];
              missile.run();
              
              var hit = false;
              
              if(this.level === 2) {
                  if (this.checkHitAlien(missile)) {
                      this.score += this.levels[this.level-1].enemyPoints;
                      this.numberOfAliens--;
                      this.missiles.splice(i, 1);
                      this.setMissileFired();
                      hit = true;
                  }
              }
              else if(this.level === 6 || this.level === 9) {
                  if (this.checkHitBarrier(missile)) {
                      this.missiles.splice(i, 1);
                      this.setMissileFired();
                      hit = true;
                  }
              }
              else if(this.level === 7 && this.oscillators > 0) {
                  if(this.checkHitOscillator(missile)) {
                      this.score += this.levels[this.level-1].enemyPoints;
                      this.oscillators = constrain(this.oscillators - 1, 0, this.oscillators);
                      
                      if(this.oscillators === 0) {
                          this.oscillatorSystem.oscillators = [];
                      }
                      else {
                          if(random() < 0.1) {
                              this.oscillatorSystem.add(2);
                          }
                          else {
                              this.oscillatorSystem.add(1);
                          }
                      }
                      
                      this.missiles.splice(i, 1);
                      this.setMissileFired();
                      hit = true;
                  }
              }
              
              if(hit === false && (this.level === 8 || this.level === 9) && this.spirals > 0) {
                  if(this.checkHitSpiral(missile)) {
                      this.score += this.levels[this.level-1].enemyPoints;
                      this.spirals = constrain(this.spirals - 1, 0, this.spirals);
                      
                      if(this.spirals === 0) {
                          this.spiralSystem.spirals = [];
                      }
                      else {
                          if(random() < 0.01) {
                              this.spiralSystem.add(2);
                          }
                          else {
                              this.spiralSystem.add(1);
                          }
                      }
                      
                      this.missiles.splice(i, 1);
                      this.setMissileFired();
                      hit = true;
                  }
              }
              
              if(this.level !== 2 && this.level !== 7 && this.level !== 8 && hit === false) {
                  if(this.checkHitEnemy(missile)) {
                      this.score += this.levels[this.level-1].enemyPoints;
                      this.missiles.splice(i, 1);
                      this.boss.forceField = constrain(this.boss.forceField - 1, 0, this.boss.forceField);
                      this.setMissileFired();
                  }
                  else if((this.level === 4 || this.level === 5 || this.level === 6 || this.level === 9) && this.checkHitBlob(missile)) {
                      this.missiles.splice(i, 1);
                      this.setMissileFired();
                  }
                  else if(this.level !== 7 && this.boss.collision(missile)) {
                      if(this.boss.forceField === 0) {
                          this.score += this.levels[this.level-1].bossPoints;
                      }
                      this.addExplosion({
                          pos: new PVector(missile.pos.x, missile.pos.y),
                          w: 40,
                          h: 40,
                          backColor: this.boss.colorInner
                      });
                      this.missiles.splice(i, 1);
                      this.setMissileFired();
                  }
              }
              else if(this.level === 8 && hit === false && this.checkHitBlob(missile)) {
                  this.missiles.splice(i, 1);
                  this.setMissileFired();
              }
                  
              if (missile.pos.y - missile.size > height || missile.pos.y + missile.size < 0 || missile.pos.x - missile.size > width || missile.pos.x + missile.size < 0) { //outside the canvas
                  this.missiles.splice(i, 1);
                  this.setMissileFired();
              }
          }
      };
      Game.prototype.setMissileFired = function () {
          this.missileFired = (this.missiles.length > 0);
      };
      Game.prototype.addExplosion = function (config) {
          var r = red(config.backColor) || 0;
          var g = green(config.backColor) || 0;
          var b = blue(config.backColor) || 0;
      
          var w = config.w || 10;
          var h = config.h || 10;
          
          var n = lag === true ? 5 : 10;
          
          for (var i = 0; i < n; i++) { //change from 10 t0 5 for better performance
              this.explosions.push(
                  new Explosion({
                      pos: new PVector(config.pos.x, config.pos.y),
                      w: random(w * 0.2, w * 0.4),
                      h: random(h * 0.2, h * 0.4),
                      red: r,
                      green: g,
                      blue: b
                  }));
          }
      };
      Game.prototype.runDeadlyArcs = function() {
          //Add new arcs
          if(random() < 0.01) {
              this.arcs.push(
                  new DeadlyArc({
                      pos: new PVector(this.boss.pos.x, this.boss.pos.y)
                  })
              );
          }
          
          //Run each of the arcs
          for(var i = this.arcs.length - 1; i >= 0; i--) {
              var arc = this.arcs[i];
              arc.run();
              
              if(arc.pos.x > width || arc.pos.x + arc.radius < 0 || arc.pos.y > height || arc.pos.y + arc.radius < 0) {
                  this.arcs.splice(i, 1);
              }
          }
      };
      Game.prototype.runBarriers = function() {
          //Run each of the barriers
          for(var i = this.barriers.length - 1; i >= 0; i--) {
              this.barriers[i].run();
          }
      };
      Game.prototype.runExplosions = function () {
          for (var i = this.explosions.length - 1; i >= 0; i--) {
              var explosion = this.explosions[i];
      
              explosion.timeToLive -= 5;
      
              if (explosion.timeToLive === 0) {
                  this.explosions.splice(i, 1);
              }
              else {
                  explosion.run();
              }
          }
      };
      Game.prototype.runStars = function() {
          for(var i = this.stars.length -1; i >=0; i--) {
              var star = this.stars[i];
              star.run();
              
              if(star.pos.x > width) {
                  star.pos = new PVector(random(-width*0.3, -width*0.1), random(0, height));
                      star.size = random(5, 10);
                      star.velocity = new PVector(random(0.1, 0.3), 0);
              }
          }
      };
      Game.prototype.runBlobs = function() {
          if(random() < 0.005) {
              this.blobs.addBlob({pos: new PVector(random(0, width), height * 1.1)});
          }
          this.blobs.run();
      };
      Game.prototype.checkHitBarrier = function (missile) {
          for(var i = 0; i < this.barriers.length; i++) {
              var barrier = this.barriers[i];
              if (barrier.collision(missile)) {
                  return true;
              }
          }
          return false;
      };
      Game.prototype.checkHitAlien = function (missile) {
          for(var i = 0; i < this.alienArmy.aliens.length; i++) {
              var alien = this.alienArmy.aliens[i];
              if (alien.attack === true && alien.dead === false && alien.collision(missile)) {
                  alien.dead = true;
                  return true;
              }
          }
          
          return false;
      };
      Game.prototype.checkHitOscillator = function (missile) {
          for(var i = this.oscillatorSystem.oscillators.length - 1; i >= 0; i--) {
              var oscillator = this.oscillatorSystem.oscillators[i];
              if (oscillator.collision(missile)) {
                  this.oscillatorSystem.oscillators.splice(i, 1);
                  return true;
              }
          }
          
          return false;
      };
      Game.prototype.checkHitSpiral = function (missile) {
          for(var i = this.spiralSystem.spirals.length - 1; i >= 0; i--) {
              var spiral = this.spiralSystem.spirals[i];
              if (spiral.collision(missile)) {
                  this.spiralSystem.spirals.splice(i, 1);
                  return true;
              }
          }
          
          return false;
      };
      Game.prototype.checkHitEnemy = function (missile) {
          for(var i = this.boss.enemies.length - 1; i >= 0; i--) {
              var enemy = this.boss.enemies[i];
              if (enemy.collision(missile)) {
                  this.boss.enemies.splice(i, 1);
                  return true;
              }
          }
          
          return false;
      };
      Game.prototype.checkHitBlob = function (missile) {
          for(var i = this.blobs.blobsArray.length - 1; i >= 0; i--) {
              var blob = this.blobs.blobsArray[i];
              if (blob.collision(missile)) {
                  this.blobs.blobsArray.splice(i, 1);
                  return true;
              }
          }
          
          return false;
      };
      Game.prototype.checkHitArc = function(cannon) {
          for(var i = this.arcs.length - 1; i >= 0; i--) {
              var arc = this.arcs[i];
              if (arc.collision(cannon)) {
                  this.arcs.splice(i, 1);
                  return true;
              }
          }
          
          return false;
      };
      Game.prototype.displayStats = function() {
          pushStyle();
              fill(this.textColorLight);
              textAlign(RIGHT);
              textSize(20);
              text("Lives: " + this.lives, width * 0.99, 25);
              
              textAlign(LEFT);
              text("Score: " + (this.finalScore + this.score), width*0.01, 25);
              
              textAlign(CENTER);
              text("Level: " + this.level, width*0.5, 25);
          popStyle();
      };
      Game.prototype.checkCollision = function() {
          var collide = false;
          if(this.level === 2) {
              if(this.checkHitAlien(this.cannon) === true) {
                  collide = true;
                  this.numberOfAliens--;
              }
          }
          else if(this.level === 3) {
              if(this.checkHitArc(this.cannon) === true) {
                  collide = true;
                  this.lives = 0;
              }
          }
          else if(this.level === 4 || this.level === 5 || this.level === 6) {
              if(this.checkHitBlob(this.cannon) === true) {
                  collide = true;
                  this.lives = 0;
              }
          }
          else if(this.level === 7) {
              if(this.checkHitOscillator(this.cannon) === true) {
                  collide = true;
                  
                  if(this.oscillators === 0) {
                      this.oscillatorSystem.oscillators = [];
                  }
                  else {
                      if(random() < 0.1) {
                          this.oscillatorSystem.add(2);
                      }
                      else {
                          this.oscillatorSystem.add(1);
                      }
                  }
              }
          }
          else if(this.level === 8) {
              if(this.checkHitSpiral(this.cannon) === true) {
                  collide = true;
                  
                  if(this.spirals === 0) {
                      this.spiralSystem.spirals = [];
                  }
                  else {
                      if(random() < 0.01) {
                          this.spiralSystem.add(2);
                      }
                      else {
                          this.spiralSystem.add(1);
                      }
                  }
              }
              else if(this.checkHitBlob(this.cannon) === true) {
                  collide = true;
                  this.lives = 0;
              }
          }
          else if(this.level === 9) {
              if(this.checkHitBlob(this.cannon) === true) {
                  collide = true;
                  this.lives = 0;
              }
              else if(this.checkHitSpiral(this.cannon) === true) {
                  collide = true;
                  
                  if(this.spirals === 0) {
                      this.spiralSystem.spirals = [];
                  }
                  else {
                      if(random() < 0.01) {
                          this.spiralSystem.add(2);
                      }
                      else {
                          this.spiralSystem.add(1);
                      }
                  }
              }
              else if(this.checkHitBlob(this.cannon) === true) {
                  collide = true;
                  this.lives = 0;
              }
          }
          
          //No enemy exist in level 2
          if(this.level !== 2 && this.checkHitEnemy(this.cannon) === true) {
              collide = true;
          }
          
          if(collide === true) {
              this.lives--;
              
              if(this.lives <= 0) {
                  this.gameOver = true;
                  this.trans.init();
              }
              
              this.addExplosion({
                  pos: new PVector(this.cannon.pos.x, this.cannon.pos.y),
                  w: 40,
                  h: 40,
                  backColor: this.cannon.colorLight
              });
          }
          
      };
      Game.prototype.play = function() {
          if(this.level > 0 && this.level <= this.levels.length) {
              this.run();
          }
          else if(this.level > this.levels.length) {
              this.gameComplete();
          }
      };
      Game.prototype.run = function() {
          if(this.paused) {
              pushStyle();
                  noStroke();
                  image(this.pausedScreen, 0, 0, width, height);
                  rectMode(CENTER);
                  fill(this.backColor);
                  rect(width/2, height/2, 300, 150, 10);
                  textAlign(CENTER, CENTER);
                  textSize(40);
                  fill(this.textColor);
                  text("PAUSED", width/2, height*0.47);
                  textSize(20);
                  text("Press P to resume", width/2, height*0.55);
              popStyle();
              return;
          }
          
          //If game over or level complete; and in transition
          if((this.gameOver || this.levelComplete) && this.transition) {
              this.runStars();
              this.displayScene();
              this.displayStats();
  
              if (this.missileFired) {
                  this.runMissiles();
              }
              
              this.runExplosions();
              
              if(this.delay++ === this.delayAmount) {
                 this.transition = false;
                 this.trans.init();
              }
          }
          //Else if game over and transition completed
          else if(this.gameOver && this.transition === false) {
              this.lives = this.initialLives;
              this.totalScore = this.finalScore + this.score;
              this.score = 0;
              this.page = "gameover";
              this.gameOver = false;
          }
          //Else if level complete and transition completed
          else if(this.levelComplete && this.transition === false) {
              if(this.level < this.levels.length) {
                  this.page = "next";
              }
              else {
                  this.page = "gamecomplete";
              }
  
              this.finalScore += this.score;
              this.score = 0;
              
              this.level++;
              if (this.level > this.levels.length) {
                  this.level = 1; //Or should this be set back to 0?
              }
              this.init();
          }
          //Else run through everything...
          else {
              this.runStars();
              this.displayScene();
              this.displayStats();
              
              if (clicked) {
                  this.addMissile();
              }
          
              if (this.missileFired) {
                  this.runMissiles();
              }
              
              this.runExplosions();
              this.checkCollision();
              this.checkLevelComplete();
          }
      };
      Game.prototype.checkLevelComplete = function () {
          if(this.level === 2) {
              if(this.numberOfAliens === 0) {
                  this.levelComplete = true;
              }
          }
          else if(this.level === 7) {
              if(this.oscillators === 0) {
                  this.levelComplete = true;
              }  
          }
          else if(this.level === 8) {
              if(this.spirals === 0) {
                  this.levelComplete = true;
              }  
          }
          else {
              if(this.boss.lives === 0) {
                  this.levelComplete = true;
              }  
          }
      };
      Game.prototype.setGameLevel = function() {
          this.transition = true;
          
          switch(this.level) {
              case 1:
                  game.cannon = new Cannon({
                      pos: new PVector(width/2, height/2)
                  });
  
                  this.boss = new Boss({
                      lives: this.levels[this.level-1].bossLives,
                      forceField: this.levels[this.level-1].forceField
                  });
                  break;
              case 2:
                  this.alienArmy = new AlienArmy({});
                  
                  this.cannon = new Cannon({
                      pos: new PVector(width/2, height/2)
                  }); 
                  break;
              case 3:
                  this.cannon = new Cannon({
                      pos: new PVector(width * 0.9, height/2)
                  });
  
                  this.boss = new Boss({
                      lives: this.levels[this.level-1].bossLives,
                      forceField: this.levels[this.level-1].forceField
                  });
                  break;
              case 4:
                  this.cannon = new Cannon({
                      pos: new PVector(width * 0.3, height*0.6)
                  }); 
                  this.boss = new Boss({
                      pos: new PVector(width * 0.8, height * 0.2),
                      lives: this.levels[this.level-1].bossLives,
                      forceField: this.levels[this.level-1].forceField
                  });
                  
                  this.blobs = new Blobs({
                      topspeed: 4
                  });
                  
                  break;
              case 5:
                  this.wave.init();
                  this.wave.dir = 1;
                  
                  var index = floor(width/2);
                  this.cannon = new Cannon({
                      pos: new PVector(index, this.wave.points[index].y)
                  });
  
                  this.boss = new Boss({
                      lives: this.levels[this.level-1].bossLives,
                      forceField: this.levels[this.level-1].forceField,
                      pos: new PVector(width/2, height*0.2)
                  });
                  
                  this.blobs = new Blobs({
                      topspeed: 6
                  });
  
                  break;
              case 6:
                  this.wave.init();
                  this.wave.dir = 1;
                  
                  var index = floor(width/2);
                  this.cannon = new Cannon({
                      pos: new PVector(index, this.wave.points[index].y)
                  });
  
                  this.boss = new Boss({
                      lives: this.levels[this.level-1].bossLives,
                      forceField: this.levels[this.level-1].forceField,
                      pos: new PVector(width/2, height*0.2)
                  });
                  
                  this.blobs = new Blobs({
                      topspeed: 6
                  });
                  
                  this.barriers.push(
                      new Barrier({
                          pos: new PVector(width*0.4, random(height*0.45, height*0.6)),
                          w: width*0.2,
                          color: this.colors[floor(random(0, this.colors.length))]
                      })
                  );
                  this.barriers.push(
                      new Barrier({
                          pos: new PVector(width*0.1, random(height*0.45, height*0.6)),
                          w: width*0.15,
                          color: this.colors[floor(random(0, this.colors.length))]
                      })
                  );
                  this.barriers.push(
                      new Barrier({
                          pos: new PVector(width*0.75, random(height*0.45, height*0.6)),
                          w: width*0.15,
                          color: this.colors[floor(random(0, this.colors.length))]
                      })
                  );
  
                  break;
              case 7:
                  this.cannon = new Cannon({
                      pos: new PVector(width * 0.9, height/2)
                  });
  
                  this.oscillatorSystem = new OscillatorSystem({
                      num: 7
                  });
                  this.oscillators = this.levels[this.level-1].oscillators;
                  
                  break;
              case 8: //boss level
                  this.cannon = new Cannon({
                      pos: new PVector(width * 0.5, height * 0.9)
                  });
                  
                  this.spiralSystem = new SpiralSystem({});
                  this.spirals = this.levels[this.level-1].spirals;
                  this.spiralSystem.add(4);
                  
                  break;
              case 9:
                  this.wave.init();
                  this.wave.dir = 1;
                  
                  var index = floor(width/2);
                  this.cannon = new Cannon({
                      pos: new PVector(index, this.wave.points[index].y)
                  });
  
                  this.boss = new Boss({
                      lives: this.levels[this.level-1].bossLives,
                      forceField: this.levels[this.level-1].forceField,
                      pos: new PVector(width/2, height*0.2)
                  });
                  
                  this.blobs = new Blobs({
                      topspeed: 6
                  });
                  
                  this.barriers.push(
                      new Barrier({
                          pos: new PVector(width*0.4, random(height*0.45, height*0.6)),
                          w: width*0.2,
                          color: this.colors[floor(random(0, this.colors.length))]
                      })
                  );
                  this.barriers.push(
                      new Barrier({
                          pos: new PVector(width*0.1, random(height*0.45, height*0.6)),
                          w: width*0.15,
                          color: this.colors[floor(random(0, this.colors.length))]
                      })
                  );
                  this.barriers.push(
                      new Barrier({
                          pos: new PVector(width*0.75, random(height*0.45, height*0.6)),
                          w: width*0.15,
                          color: this.colors[floor(random(0, this.colors.length))]
                      })
                  );
                  
                  this.spiralSystem = new SpiralSystem({
                      speed: random(2, 4)
                  });
                  this.spirals = this.levels[this.level-1].spirals;
                  this.spiralSystem.add(3);
                  
                  break;
          }
      };
      Game.prototype.init = function() {
          this.stars = [];
          for(var i = 0; i < this.noStars; i++) {
              this.stars.push(
                  new Star({
                      pos: new PVector(random(-width*0.2, width*0.9), random(0, height)),
                      size: random(5, 10),
                      velocity: new PVector(random(0.1, 0.3), 0)
                  })
              );
          }
          
          this.levelComplete = false;
          this.delay = 0;
          this.transX = 0;
          
          this.lives = this.initialLives;
          
          this.barriers = [];
          this.missiles = [];
          this.explosions = [];
          this.arcs = [];
          this.blobs.blobsArray = [];
          this.blobs.trails = [];
          
          if(this.level > 0) {
              this.setGameLevel();
          }
          else {
              this.blobs = new Blobs({topspeed: 6});
          }
      };
      Game.prototype.reset = function() {
          switch(this.page) {
              case "start":
                  this.finalScore = 0;
                  this.totalScore = 0;
                  this.level = 1;
                  this.init();
              break;
              case "play":
                  break;
              case "replay":
                  this.init();
                  break;
              case "next":
                  this.init();
                  this.page = "play";
                  break;
              default:
                  this.level = 0;
                  break;
          }
      };
      Game.prototype.homeScreen = function() {
          this.runStars();
          this.runBlobs();
          
          fill(this.textColor);
          textAlign(CENTER);
          textSize(60);
          text("Orbit", width/2, height*0.3);
          
          this.playButton.run();
          this.levelsButton.run();
          this.highScoreButton.run();
          this.howButton.run();
      };
      Game.prototype.howScreen = function() {
          this.runStars();
          this.runBlobs();
          
          fill(this.textColor);
          textAlign(CENTER);
          textSize(this.textSizeHeading);
          text("How", width/2, height*0.15);
          
          textSize(this.textSizeBody * 0.9);
          text("Use the WASD or Arrow keys\nto move, change direction, or teleport\ndepending on the level.\n\nPoint the mouse in the direction of the target\nthen click to shoot.\n\nInstructions for each level are within the game.\n\nFor most levels, you need to destroy a certain number\nof enemies to take down the force field.\n\nPress \"P\" to pause at anytime while playing.\nYou might get a bit tired shooting too much.\n\nHave fun :)", width/2, height*0.25);
          
          this.homeButton.display();
      };
      Game.prototype.levelsScreen = function() {
          this.runStars();
          this.runBlobs();
          
          fill(this.textColor);
          textAlign(CENTER);
          textSize(this.textSizeHeading);
          text("Levels", width/2, height*0.15);
          
          this.level1Button.display();
          this.level2Button.display();
          this.level3Button.display();
          this.level4Button.display();
          this.level5Button.display();
          this.level6Button.display();
          this.level7Button.display();
          this.level8Button.display();
          this.level9Button.display();
          
          this.homeButton.display();
      };
      Game.prototype.scoresScreen = function() {
          this.runStars();
          this.runBlobs();
          
          fill(this.textColor);
          textAlign(CENTER);
          textSize(this.textSizeHeading);
          text("High Scores", width/2, height*0.15);
          
          textSize(this.textSizeBody*0.8);
  
          var hs = "";
          for(var i = 0; i < this.highScores.length; i++) {
              hs+= (i+1) + ". " + this.highScores[i].user + ": " + this.highScores[i].score + "\n\n";
          }
          
          text(hs, width/2, height*0.25);
          
          this.homeButton.display();
      };
      Game.prototype.nextScreen = function () {
          this.runStars();
          this.runBlobs();
          
          fill(this.textColor);
          textSize(this.textSizeHeading);
          textAlign(CENTER, TOP);
          text(this.levels[this.level-1].title, width/2, height*0.15);
          textSize(this.textSizeBody);
          text(this.levels[this.level-1].transition, width/2, height*0.25);
          
          this.homeButton.display();
          this.nextButton.display();
          
          this.trans.run();
      };
      Game.prototype.completeScreen = function () {
          this.runStars();
          this.runBlobs();
          
          fill(this.textColor);
          textSize(this.textSizeHeading);
          textAlign(CENTER, TOP);
          text("Complete", width/2, height*0.15);
          
          text("Total Score: " + this.finalScore, 300, height*0.25);
          textSize(this.textSizeBody);
          text("Congratulations, you have destroyed the boss.\n\nPlanet earth is now safe\nbecause you are so awesome.\n\nHowever, if you wish to go back in time,\nclick on the Home button to play again.", 300, height*0.35);
          
          this.homeButton.display();
          
          this.trans.run();
      };
      Game.prototype.gameoverScreen = function () {
          this.runStars();
          this.runBlobs();
          
          fill(this.textColor);
          textSize(this.textSizeHeading);
          textAlign(CENTER, TOP);
          text("Failed", width/2, height*0.15);
          
          textSize(this.textSizeBody);
          text("Score: " + (this.totalScore + this.score), 300, height*0.25);
          text("Press Replay to try again", 300, height*0.4);
          
          this.homeButton.display();
          this.replayButton.display();
          
          this.trans.run();
      };
      Game.prototype.checkPaused = function() {
          if (keyPressed && keyCode === 80) { //P - Pause
              if(this.page === "play" || this.page === "replay") {
                  this.paused = !this.paused;
                  this.pausedScreen = get();
              }
              keyCode = 0;
          }
      };
      
  } //Game
  
  game = new Game({});
  game.init();
  
  draw = function () {
      game.checkPaused();
      
      background(game.backgroundColor);
  
      switch (game.page) {
          case "play":
          case "replay":
              game.play();
              break;
          case "start":
          case "next":
              game.nextScreen();
              break;
          case "home":
              game.homeScreen();
              break;
          case "how":
              game.howScreen();
              break;
          case "levels":
              game.levelsScreen();
              break;
          case "scores":
              game.scoresScreen();
              break;
          case "gamecomplete":
              game.completeScreen();
              break;
          case "gameover":
              game.gameoverScreen();
              break;
      }
  
      clicked = false;
  };
      
    }
  }
  
  var canvas = document.getElementById("canvas"); 
//   var processingInstance = new Processing(canvas, sketchProc);