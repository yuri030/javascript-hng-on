class Loader {
    constructor() {
      throw new Error("Class 'Loader' should be used as a static Class. Do not instantiate!");
    }
    static loadImage(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.addEventListener('load',  (e) => { resolve(img) });
        img.addEventListener('error', (e) => { reject(new Error(`Failed to load image: ${src}`)) });
        img.src = src;
      }).then((img) => {
        console.log(`Successfully loaded image: ${src}`);
        return img;
      }).catch(error => {
        console.error(error);
      });
    }
    
    static loadSound(src) {
      return new Promise((resolve, reject) => {
        let snd = new Sound();
        snd.addEventListener('load',  (e) => { resolve(snd) });
        snd.addEventListener('error', (e) => { reject(new Error(`Failed to load image: ${src}`)) });
        snd.src = src;
      }).then((snd) => {
        console.log(`Successfully loaded sound: ${src}`);
        return snd;
      }).catch(error => {
        console.error(error);
      });
    }
   }