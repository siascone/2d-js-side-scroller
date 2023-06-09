const context = document.querySelector('canvas').getContext('2d')

context.canvas.height = 400;
context.canvas.width = 1200;

// Start the fram count at 1 (also level 1)
let frameCount = 1;

// Set the number of obstacles to match the current "level" number
let objCount = frameCount;

// create a collection to hold the randomly generated x coordinates
const objXCoords = [];

const player = {
    height: 32,
    jumping: true,
    width: 32,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
};

const playerController = {
    left: false,
    right: false,
    up: false,

    keyListener: function(e) {
        let key_state = (e.type == "keydown") ? true : false;

        switch (e.keyCode) {
            case 37: // left arrow
                playerController.left = key_state;
                break;
            case 38: // up arrow
                playerController.up = key_state;
                break;
            case 39: // right arrow
                playerController.right = key_state;
                break;
        }
    }
}

const loop = function () {
    if (playerController.up && player.jumping == false) {
        player.yVelocity -= 20;
        player.jumping = true;
    }

    if (playerController.left) {
        player.xVelocity -= 0.5
    }

    if (playerController.right) {
        player.xVelocity += 0.5
    }

    player.yVelocity += 1.5; // gravity
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.9; // friction
    player.yVelocity *= 0.9; // friction

    // if the player is falling below floor line, then:
    if (player.y > 386 - 16 - 32) {
        player.jumping = false;
        player.y = 386 - 16 - 32;
        player.yVelocity = 0;
    }

    if (player.x < -20) {
        player.x = 1200;
    } else if (player.x > 1200) {
        player.x = -20;
        nextFrame();
    }

    // creates teh backdrop for each frame
    context.fillStyle = "#201a23";
    context.fillRect(0, 0, 1200, 400); // x, y, width, height
    // creates and fills the player square for each fram
    context.fillStyle = "white" // hex for cube color
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();
    // Create the obstacles for each frame
    // Set the standard obstacle height
    const height = 200 * Math.cos(Math.PI / 6);
    context.fillStyle = "pink";
    objXCoords.forEach((objXCoord) => {
        context.beginPath();

        // (x = random, y = coord. on "ground")
        context.moveTo(objXCoord, 385);

        // (x = ^random +20, y = coord. on "ground")
        context.lineTo(objXCoord + 20, 385);

        // (x = ^random + 10, y = peak of triange)
        context.lineTo(objXCoord + 10, 510 - height);

        context.closePath();

        context.fill();
    });
    // Creates the "Ground" for each frame
    context.strokeStyle = "#2e2532";
    context.lineWidth = 30;
    context.beginPath();
    context.moveTo(0, 385);
    context.lineTo(1200, 385);
    context.stroke();

    window.requestAnimationFrame(loop);
}

// Create the obstacles for each fram

const nextFrame = () => {
    // increase the frame / "level" count
    frameCount ++;

    for (let i = 0; i < objCount; i++) {
        let objXCoord = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
        objXCoords.push(objXCoord);
    }
}

window.addEventListener("keydown", playerController.keyListener)
window.addEventListener("keyup", playerController.keyListener)

window.requestAnimationFrame(loop);