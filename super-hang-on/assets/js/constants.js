const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    D: 68,
    S: 83,
    W: 87,
   };
   const COLORS = {
    SKY: '#72D7EE',
    TREE: '#005108',
    FOG: '#669999',
    LIGHT: { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#CCCCCC' },
    DARK: { road: '#696969', grass: '#009A00', rumble: '#BBBBBB' },
    START: { road: 'white', grass: 'white', rumble: 'white' },
    FINISH: { road: 'black', grass: 'black', rumble: 'black' },
   };
   const BACKGROUND = {
    SKY: { x: 1, y: 1, w: 800, h: 300 },
    HILLS: { x: 1, y: 302, w: 800, h: 300 },
    WOODS: { x: 1, y: 603, w: 800, h: 300 },
   };
   const ROAD = {
    LENGTH: { NONE: 0, SHORT: 25, MEDIUM: 50, LONG: 100 }, // num segments
    HILL: { NONE: 0, LOW: 20, MEDIUM: 40, HIGH: 60 },
    CURVE: { NONE: 0, EASY: 2, MEDIUM: 4, HARD: 6 },
   };
   const SPRITES = {
    BIKE: [
      // DRIVING LEFT
      { x: 237, y: 19, w: 62, h: 54 }, // left-3 tire 1
      { x: 301, y: 19, w: 62, h: 54 }, // left-3 tire 2
      { x: 143, y: 11, w: 45, h: 62 }, // left-2 tire 1
      { x: 190, y: 11, w: 45, h: 62 }, // left-2 tire 2
      { x: 69, y: 3, w: 35, h: 70 }, // left-1 tire 1
      { x: 106, y: 3, w: 35, h: 70 }, // left-1 tire 2
      // DRIVING STRAIGHT
      { x: 1, y: 1, w: 32, h: 72 }, // straight-1 tire 1
      { x: 35, y: 1, w: 32, h: 72 }, // straight-1 tire 2
      // DRIVING RIGHT
      { x: 223, y: 151, w: 35, h: 70 }, // right-1 tire 1
      { x: 260, y: 151, w: 35, h: 70 }, // right-1 tire 2
      { x: 129, y: 159, w: 45, h: 62 }, // right-2 tire 1
      { x: 176, y: 159, w: 45, h: 62 }, // right-2 tire 2
      { x: 1, y: 167, w: 62, h: 54 }, // right-3 tire 1
      { x: 65, y: 167, w: 62, h: 54 }, // right-3 tire 2
      // BRAKING LEFT
      { x: 237, y: 93, w: 62, h: 54 }, // left-3 tire 1 (break)
      { x: 301, y: 93, w: 62, h: 54 }, // left-3 tire 2 (break)
      { x: 143, y: 85, w: 45, h: 62 }, // left-2 tire 1 (break)
      { x: 190, y: 85, w: 45, h: 62 }, // left-2 tire 2 (break)
      { x: 69, y: 77, w: 35, h: 70 }, // left-1 tire 1 (break)
      { x: 106, y: 77, w: 35, h: 70 }, // left-1 tire 2 (break)
      // BRAKING STRAIGHT
      { x: 1, y: 75, w: 32, h: 72 }, // straight-1 tire 1 (brake)
      { x: 35, y: 75, w: 32, h: 72 }, // straight-1 tire 2 (brake)
      // BRAKING RIGHT
      { x: 223, y: 225, w: 35, h: 70 }, // right-1 tire 1 (break)
      { x: 260, y: 225, w: 35, h: 70 }, // right-1 tire 2 (break)
      { x: 129, y: 233, w: 45, h: 62 }, // right-2 tire 1 (break)
      { x: 176, y: 233, w: 45, h: 62 }, // right-2 tire 2 (break)
      { x: 1, y: 241, w: 62, h: 54 }, // right-3 tire 1 (break)
      { x: 65, y: 241, w: 62, h: 54 }, // right-3 tire 2 (break)
    ],
    BIKE_BRAKE: [
      // LEFT
      { x: 69, y: 77, w: 35, h: 70 }, // left-1 tire 1 (break)
      { x: 106, y: 77, w: 35, h: 70 }, // left-1 tire 2 (break)
      { x: 143, y: 85, w: 45, h: 62 }, // left-2 tire 1 (break)
      { x: 190, y: 85, w: 45, h: 62 }, // left-2 tire 2 (break)
      { x: 237, y: 93, w: 62, h: 54 }, // left-3 tire 1 (break)
      { x: 301, y: 93, w: 62, h: 54 }, // left-3 tire 2 (break)
      // STRAIGHT
      { x: 1, y: 75, w: 32, h: 72 }, // straight-1 tire 1 (brake)
      { x: 35, y: 75, w: 32, h: 72 }, // straight-1 tire 2 (brake)
      // RIGHT
      { x: 223, y: 225, w: 35, h: 70 }, // right-1 tire 1 (break)
      { x: 260, y: 225, w: 35, h: 70 }, // right-1 tire 2 (break)
      { x: 129, y: 233, w: 45, h: 62 }, // right-2 tire 1 (break)
      { x: 176, y: 233, w: 45, h: 62 }, // right-2 tire 2 (break)
      { x: 1, y: 241, w: 62, h: 54 }, // right-3 tire 1 (break)
      { x: 65, y: 241, w: 62, h: 54 }, // right-3 tire 2 (break)
    ],
    ARROW: { x: 1, y: 315, w: 38, h: 32 }, // arrow leftside road
    BILLBOARD01: { x: 41, y: 297, w: 86, h: 50 }, // billboard 1
    BILLBOARD02: { x: 129, y: 297, w: 86, h: 50 }, // billboard 2
    LAMPPOST: { x: 365, y: 1, w: 35, h: 198 }, // lamppost on the leftside
    LAMPPOST_MIRRORED: { x: 400, y: 1, w: 35, h: 198 }, // lamppost on the rightside (mirrored)
    TREE: { x: 365, y: 201, w: 38, h: 122 }, // tree
   };
   SPRITES.SCALE = 0.1 * (1 / SPRITES.BIKE[6].w);