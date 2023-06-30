const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const direction = {x: 0, y: 0}

const ctx = canvas.getContext('2d');

function drawObstacle(o){
    ctx.fillStyle = '#777777';

    ctx.beginPath();
        ctx.arc(
            o.position.x - player.position.x + canvas.width / 2,
            o.position.y - player.position.y + canvas.height / 2,
            o.radius,
            0,
            2*Math.PI
        )
    ctx.fill();
}

function drawPlayer(){
    ctx.fillStyle = '#ffffff';

    ctx.beginPath();
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            player.radius,
            0,
            2*Math.PI
        )
    ctx.fill();
}

class Obstacle {
    constructor(position, radius, direction){
        this.position = position;

        this.radius = radius;

        this.direction = Math.atan2(direction.y, direction.x);

        this.lifespan = 360;
    }

    update(){
        this.position.x += 2 * Math.cos(this.direction);
        this.position.y += 2 * Math.sin(this.direction);

        if((this.radius + player.radius) >= Math.hypot(this.position.x - player.position.x, this.position.y - player.position.y)){
            alert('ты умер');
            throw new Error('ты умер далбаеб играй сначала уже');
        }
            
    }
}

class Player {
    constructor(position){
        this.position = position;

        this.radius = 10;


    }
}

let obstacles = [];

let player = new Player({x: 0, y: 0});

const keys = {}

document.body.addEventListener('keypress', e => {
    keys[e.code] = true;
})

document.body.addEventListener('keyup', e => {
    keys[e.code] = false;
})



setInterval(() => {
    if(Math.random() * 100 > 96){
        let ang = Math.random() * 2;
        let pos = {
                    x: 300* Math.cos(ang),
                    y: 300* Math.sin(ang)
                }
 
        obstacles.push(
            new Obstacle(
                pos,
                35 + Math.random() * 15,
                {
                    x: player.position.x - pos.x,
                    y: player.position.y - pos.y
                }
            )
        )
    }

    for(o of obstacles){
        o.update();
    }

    obstacles.forEach((o, i) => {
        o.lifespan--;
        if(o.lifespan <= 0)
            obstacles.splice(i, 1);
    })

    ctx.fillStyle = '#161616';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawPlayer();

    for(o of obstacles){
        drawObstacle(o);
    }
    
    direction.x = 0;
    direction.y = 0;

    if(keys['KeyW'])
        direction.y--;
    if(keys['KeyA'])
        direction.x--;
    if(keys['KeyS'])
        direction.y++;
    if(keys['KeyD'])
        direction.x++;
    
    if(!(direction.x == 0 && direction.y == 0))
    
    {
        const angle = Math.atan2(direction.y, direction.x);
    
        player.position.x += Math.cos(angle) * 5;
        player.position.y += Math.sin(angle) * 5;
    }
}, 1000/60)
