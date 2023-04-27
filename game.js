const context = document.querySelector('canvas').getContext('2d')

context.canvas.height = 400;
context.canvas.width = 1220;

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
                controller.left = key_state;
                break;
            case 38: // up arrow
                controller.up = key_state;
                break;
            case 39: // right arrow
                controller.right = key_state;
                break;
        }
    }
}