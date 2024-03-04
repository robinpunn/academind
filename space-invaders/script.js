// we don't really need a class here since there will only be 1 player
class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        // horizontal movement
        if (this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if (this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;
        // horizontal boundaries
        if (this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // vertical movement
        if (this.game.keys.indexOf('ArrowUp') > -1) this.y -= this.speed;
        if (this.game.keys.indexOf('ArrowDown') > -1) this.y += this.speed;
        // vertical boundaries
        if (this.y < 0) this.y = 0;
        else if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
    }
}

// class that will handle various types of projectiles
class Projectile {

}

// class that will handle various types of enemies 
class Enemy {

}

// contains the main logic for the entire game
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);

        // event listeners
        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            // console.log(this.keys)
        })

        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
            // console.log(this.keys)
        })
    }
    render(context) {
        this.player.draw(context);
        this.player.update();
    }
}

// ensures js runs only after all our art assets are loaded
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;

    const game = new Game(canvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }
    animate();
})