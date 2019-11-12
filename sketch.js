let capture
let tracker


let antler

let rednose
let rednose_x = 0
let rednose_y = 0

let lights

let snowflakes = []

let christmas

function preload() {
    
    antler = loadImage('antler.jpg')
    rednose = loadImage('rednose.png')
    lights = loadImage('lights.png')

    christmas = loadSound('christmas.mp3')
}


function setup() {

    createCanvas(800, 600)
    capture = createCapture(VIDEO)
    capture.size(800, 600)
    capture.hide()

    //tracker follows moving things on the screen
    tracker = new clm.tracker()
    tracker.init()
    tracker.start(capture.elt)    

}


function draw() {    

    background(0)
    //show video feed
    image(capture, 0, 0, capture.width, capture.height)
    image(lights, 0, 0, width, 100)
    
    let t = frameCount / 60
    for (let i = 0; i < random(5); i++) {
        snowflakes.push(new snowflake())
    }

    for (let flake of snowflakes) {
        flake.update(t)
        flake.display()
    }


    let positions = tracker.getCurrentPosition()
    //print(positions)

    //noStroke()
    stroke(255)
    strokeWeight(1)
    fill(255)

    let i = 0
    while (i < positions.length - 1) {

        // ellipse(positions[i][0], positions[i][1], 4, 4)
        // text(i, positions[i][0], positions[i][1])

        //line(positions[i][0], positions[i][1], positions[i+1][0], positions[i+1][1])

        i += 1
    }

    if (positions.length > 0) {
    let x_eye1 = positions[27][0] - 20
    let y_eye1 = positions[27][1] - 20

    let x_eye2 = positions[32][0] - 20
    let y_eye2 = positions[32][1] - 20




    //     push()
    //     // fill(127, 255, 212)

    //image(heart, x_eye1, y_eye1, 40, 40)
    //image(heart, x_eye2, y_eye2, 40, 40)

        // image(heart, positions[27][0], positions[27][1], 40, 40)
        // image(heart, positions[32][0], positions[32][1], 40, 40)
    //     // ellipse(positions[27][0], positions[27][1], 20, 20)
    //     // ellipse(positions[32][0], positions[32][1], 20, 20)
    //     pop()

    //}



    //antle image
    let x_forehead = positions[21][0] - 130
    let y_forehead = positions[21][1] - 280

    image(antler, x_forehead, y_forehead, 300, 300)


    //nose image
    rednose_x = positions[62][0] - 25
    rednose_y = positions[62][1] - 25

    image(rednose, rednose_x, rednose_y, 50, 50)
    

    // let x_right = positions[42][0] 
    // let y_right = positions[42][1]

    // let x_left = positions[43][0]
    // let y_left = positions[43][1]

    // let distance_left = dist(x_eye1, y_eye1, x_left, y_left)
    // let distance_right = dist(x_eye2, y_eye2, x_right, y_right)

    // if (distance_left > distance_right) {
    //     print('facing right')
    // } else {
    //     print('facing left')
    // }

}


}

function snowflake(){
    //initialize coordinates
    this.posX = 0
    this.posY = random(-50, 0)
    this.initialangle = random(0, 2 * PI)
    this.size = random(2, 5)

    //radius of snowflake spiral, chosen so the snowflakes are uniformly spread out
    this.radius = sqrt(random(pow(width, 2)))

    this.update = function(time){
        //x position follows a circle
        let w = 0.6
        let angle = w * time + this.initialangle
        this. posX = width + this.radius * sin(angle)

        //different size snowflakes fall at different y speeds
        this.posY += pow(this.size, 0.5)

        //delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this)
            snowflakes.splice(index, 1)
        }
    }

    this.display = function() {
        ellipse(this.posX, this.posY, this.size)
    }




}


function mousePressed(){

    if (mouseX > rednose_x && mouseX < rednose_x + 50 && mouseY > rednose_y && mouseY < rednose_y + 50) {
        print('nose clicked')
        push()
        christmas.play()
        pop()
    } else {
        print('nose not clicked')
        print(mouseX, mouseY, rednose_x, rednose_y)
    }

}

