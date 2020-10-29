let width = 640;
let height = 480;
let fps = 60;
let step = 1 / fps;
let skySpeed = 0.0005;
let hillsSpeed = 0.001;
let woodsSpeed = 0.0015;
let skyOffset = 0;
let hillsOffset = 0;
let woodsOffset = 0;
let canvas = null;
let ctx = null;
let segments = [];
let cars = [];
let background = null;
let sprites = null;
let resolution = width / height; // scaling factor to provide resolution independence (computed)
let roadWidth = 2000; // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
let segmentLength = 200; // length of a single segment
let rumbleLength = 3; // number of segments per red/white rumble strip
let trackLength = null; // z length of entire track (computed)
let lanes = 3; // number of lanes
let fieldOfView = 100; // angle (degrees) for field of view
let cameraHeight = 1200; // z height of camera
let cameraDepth = 1 / Math.tan(((fieldOfView / 2) * Math.PI) / 180); // z distance camera is from screen (computed)
let drawDistance = 300; // number of segments to draw
let playerX = 0; // player x offset from center of road (-1 to 1 to stay independent of roadWidth)
let playerZ = cameraHeight * cameraDepth; // player relative z distance from camera (computed)
let centrifugal = 0.3; // centrifugal force multiplier when going around curves
let fogDensity = 4; // exponential fog density
let position = 0; // current camera Z position (add playerZ to get player's absolute Z position)
let speed = 0; // current speed
let maxSpeed = segmentLength / step; // top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier)
let maxSpeedKMH = 235;
let normalizedSpeed = 0.0;
let accel = maxSpeed / 5; // acceleration rate - tuned until it 'felt' right
let breaking = -maxSpeed; // deceleration rate when braking
let decel = -maxSpeed / 5; // 'natural' deceleration rate when neither accelerating, nor braking
let offRoadDecel = -maxSpeed / 2; // off road deceleration is somewhere in between
let offRoadLimit = maxSpeed / 4; // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
let totalCars = 200; // total number of cars on the road
let keyLeft = false;
let keyRight = false;
let keyFaster = false;
let keySlower = false;
let tire = 0;
let brake = 0;
let hang = 0;
let hangDelay = 50;
let hangTimer = 0;
let bikeSpriteSelector = 6;

window.addEventListener(
    'load',
    () => {
      initialize();
    },
    false
   );

   const initialize = async () => {
       canvas = document.createElement('canvas');
       canvas.width = width;
       canvas.height = height;
       canvas.style.backgroundColor = ('black');
       document.getElementById('container').appendChild(canvas);

       ctx = canvas.getContext('2d');
    //    ctx.imageSmoothingEnabled = false;
       ctx.font = '20px Verdana';

       Keyboard.setHandlers();
       Road.reset();

       background = await Loader.loadImage('assets/img/backgrounds.png');
       sprites = await Loader.loadImage('assets/img/sprites.png');

       run();

   };
   const run = () => {
           let now = null;
           let last = Util.timestamp();
           let dt = 0;
           let gdt = 0;

           const frame = () => {
               now = Util.timestamp();
               dt = Math.min(1, (now -last) / 1000);
               gdt = gdt + dt;
               while (gdt > step) {
                   gdt = gdt - step;
                   update(step);
               }
               render();
               last = now;
               requestAnimationFrame(frame);
           };

           frame();
   };

   const update = (dt) => {
       const playerSegment = Segment.find(position + playerZ);
       const speedPercent = speed/ maxSpeed;
       const dx = dt * 2 * speedPercent;
       
       startPosition = position;

       position = Util.increase(position, dt * speed, trackLength);

       skyOffset = Util.increase(skyOffset, (skySpeed * playerSegment.curve * (position - startPosition)) / segmentLength, 1);
       hillsOffset = Util.increase(hillsOffset, (hillsSpeed * playerSegment.curve * (position - startPosition)) / segmentLength, 1);
       woodsOffset = Util.increase(woodsOffset, (woodsSpeed * playerSegment.curve * (position - startPosition)) / segmentLength, 1);

       if (keyLeft) {
        if(speed > 0){
            playerX -= dx;
            if(hangTimer >= hangDelay) {
                hangTimer = 0;
                hang -=2;
                hang = Util.limit(hang, -6, 0);                
            }else{
                hangTimer += dt * 1000;
            }
        }

       } else if (keyRight) {   //    werk niet
        if(speed > 0){
            playerX += dx;
            if(hangTimer >= hangDelay) {
                hangTimer = 0;
                hang += 2;
                hang = Util.limit(hang, 0, 6);
                
            }else{
                hangTimer += dt * 1000;
            }
        }
       }else{
           if(hang !== 0){
               if(hangTimer >= hangDelay || hangTimer === 0) {
                   hangTimer = 0;
                   hang = hang < 0 ? hang + 2 : hang - 2;
               }
               hangTimer += dt * 1000;
           }
       }

       playerX = playerX - dx * speedPercent * playerSegment.curve * centrifugal

       if(keySlower) {
            speed = Util.accelerate(speed, breaking, dt);
            brake = 14;
       } else if(keyFaster) {
            speed = Util.accelerate(speed, accel, dt);
            brake = 0;
       } else{
            speed = Util.accelerate(speed, accel, dt);
            brake = 0;
       }

       if ((playerX < - 1 || playerX > 1) && speed > offRoadLimit) {
           speed = Util.accelerate(speed, offRoadDecel, dt);
       }

       playerX = Util.limit(playerX, -2, 2);
       speed = Util.limit(speed, 0, maxSpeed);
       tire = Util.toInt(position / 500) % 2;

       bikeSpriteSelector = 6 + tire + hang + brake;
    
   };
   const render = () => {
        let baseSegment = Segment.find(position);
        let basePercent = Util.percentRemaining(position, segmentLength);
        let playerSegment = Segment.find(position + playerZ);
        let playerPercent = Util.percentRemaining(position + playerZ, segmentLength);
        let playerY = Util.interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
        let maxy = height;
        let x = 0;
        let dx = -(baseSegment.curve * basePercent);

        ctx.clearRect(0, 0, width, height);

        Render.background(ctx, background, width, height, BACKGROUND.SKY, skyOffset, resolution * skySpeed * playerY);
        Render.background(ctx, background, width, height, BACKGROUND.HILLS, hillsOffset, resolution * hillsSpeed * playerY);
        Render.background(ctx, background, width, height, BACKGROUND.WOODS, woodsOffset, resolution * woodsSpeed * playerY);

        let n, i, segment, car, sprite, spriteScale, spriteX, spriteY;

        for (n = 0; n < drawDistance; n++) {
        segment = segments[(baseSegment.index + n) % segments.length];
        segment.looped = segment.index < baseSegment.index;
        segment.fog = Util.exponentialFog(n / drawDistance, fogDensity);
        segment.clip = maxy;
        Util.project(segment.p1, playerX * roadWidth - x, playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);
        Util.project(segment.p2, playerX * roadWidth - x - dx, playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);
        x = x + dx;
        dx = dx + segment.curve;
        if(segment.p1.camera.z <= cameraDepth || // behind us
            segment.p2.screen.y >= segment.p1.screen.y || // back face cull
            segment.p2.screen.y >= maxy) { // clip by (already rendered) hill
        continue;
        }
        Render.segment(ctx, width, lanes, segment.p1.screen.x, segment.p1.screen.y, segment.p1.screen.w, segment.p2.screen.x, segment.p2.screen.y, segment.p2.screen.w, segment.fog, segment.color);
        maxy = segment.p1.screen.y;
        }

        for (n = drawDistance - 1; n > 0; n--) {
            segment = segments[(baseSegment.index + n) % segments.length];
        
            // hier sprites
        
            if (segment == playerSegment) {
              Render.player(ctx, width, height, resolution, roadWidth, sprites, speed / maxSpeed, cameraDepth / playerZ, width / 2, height / 2 - ((cameraDepth / playerZ) * Util.interpolate(playerSegment.p1.camera.y, playerSegment.p2.camera.y, playerPercent) * height) / 2); // speed * (keyLeft ? -1 : keyRight ? 1 : 0), playerSegment.p2.world.y - playerSegment.p1.world.y
            }
          }

   };