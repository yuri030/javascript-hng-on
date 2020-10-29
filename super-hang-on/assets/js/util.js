class Util {
    constructor() {
      throw new Error("Class 'Util' should be used as a static Class. Do not instantiate!");
    }
    static timestamp()                       { return performance.now();                                                                                  }
      static toInt(obj, def)                   { return obj | 0;                                                                                            }
      static toFloat(obj, def)                 { if (obj !== null) { const x = parseFloat(obj);   if (!isNaN(x)) return x; } return Util.toFloat(def, 0.0); }  // ??????
    static limit(value, min, max)            { return Math.max(min, Math.min(value, max));                                                                }
    static randomInt(min, max)               { return Math.round(Util.interpolate(min, max, Math.random()));                                              }
    static randomChoice(options)             { return options[Util.randomInt(0, options.length-1)];                                                       }
    static percentRemaining(n, total)        { return (n%total)/total;                                                                                    }
    static accelerate(v, accel, dt)          { return v + (accel * dt);                                                                                   }
    static interpolate(a,b,percent)          { return a + (b-a)*percent                                                                                   }
    static easeIn(a,b,percent)               { return a + (b-a)*Math.pow(percent,2);                                                                      }
    static easeOut(a,b,percent)              { return a + (b-a)*(1-Math.pow(1-percent,2));                                                                }
    static easeInOut(a,b,percent)            { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);                                                   }
    static exponentialFog(distance, density) { return 1 / (Math.pow(Math.E, (distance * distance * density)));                                            }
    static increase(start, increment, max) { // with looping
      let result = start + increment;
      while (result >= max) result -= max;
      while (result < 0)    result += max;
      return result;
    }
    static project(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
      p.camera.x     = (p.world.x || 0) - cameraX;
      p.camera.y     = (p.world.y || 0) - cameraY;
      p.camera.z     = (p.world.z || 0) - cameraZ;
      p.screen.scale = cameraDepth/p.camera.z;
      p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
      p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
      p.screen.w     = Math.round(             (p.screen.scale * roadWidth   * width/2));
    }
    static overlap(x1, w1, x2, w2, percent) {
      const half = (percent || 1)/2;
      const min1 = x1 - (w1*half);
      const max1 = x1 + (w1*half);
      const min2 = x2 - (w2*half);
      const max2 = x2 + (w2*half);
      return ! ((max1 < min2) || (min1 > max2));
    }
   }