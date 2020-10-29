// Make sure we can use 'requestAnimationFrame'
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
   }
   // Make sure we can use the best possible 'timer' for our gameloop
   if ('performance' in window == false) {
    window.performance = {};
   }
   Date.now =
    Date.now ||
    function () {
      return new Date().getTime();
    };
   if ('now' in window.performance == false) {
    var nowOffset = Date.now();
    if (performance.timing && performance.timing.navigationStart) nowOffset = performance.timing.navigationStart;
    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
   }
   // Add String-function to convert newer type KeyboardEvent strings into numbers
   String.prototype.toKeyCode = function () {
    switch (this.toString()) {
      case 'ArrowLeft':
        return 37;
        break;
      case 'ArrowRight':
        return 39;
        break;
      case 'ArrowUp':
        return 38;
        break;
      case 'ArrowDown':
        return 40;
        break;
      case 'a':
        return 65;
        break;
      case 'd':
        return 68;
        break;
      case 'w':
        return 87;
        break;
      case 's':
        return 83;
        break;
    }
   };