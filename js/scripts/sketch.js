let particles = [];
let points = [];
let word = "pascalou";
let font;

function preload() {
  font = loadFont('Assassin.ttf');
}
function setup(){
    createCanvas(innerWidth, innerHeight);
    colorMode(HSB,100);
    // Get the points X and Y for the word
    points = font.textToPoints(word, 20, height/1.6, width/word.length*2.5);
}
function draw(){
    background(200);
    for (const particle of particles) {
        particle.show();
        particle.update();
        // Particle not on the screen anymore
        if (!particle.viewable) {
            // Remove the particle 
            particles.splice(particles.indexOf(particle),1);
        }
    }
    if (mouseIsPressed) {
        // Each click create a particle 
        if (points.length > 0) {
            // Push the mouse position for the spawn and the point position for the target
            particles.push(new Particle(mouseX, mouseY,points[0].x, points[0].y));
            // We remove the point, 1 point 1 particle
            points.splice(0,1);
        }else{
            // No more points particle go to the top
            particles.push(new Particle(mouseX, mouseY,random(width/4,width/1.6),-50));
        }   
    }
}