class Segment {
    constructor() {
      throw new Error("Class 'Segment' should be used as a static Class. Do not instantiate!");
    }

    static add(curve, y) {
        var n = segments.length;
        segments.push({ index: n, p1: { world: { y: Segment.lastY(), z: n * segmentLength }, camera: {}, screen: {} }, p2: { world: { y: y, z: (n + 1) * segmentLength }, camera: {}, screen: {} }, curve: curve, sprites: [], cars: [], color: Math.floor(n / rumbleLength) % 2 ? COLORS.DARK : COLORS.LIGHT });
      }
      static find(z) {
        return segments[Math.floor(z / segmentLength) % segments.length];
      }
      static lastY() {
        return segments.length === 0 ? 0 : segments[segments.length - 1].p2.world.y;
      }

   }


