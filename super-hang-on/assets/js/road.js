class Road {
    constructor() {
      throw new Error("Class 'Road' should be used as a static Class. Do not instantiate!");
    }

    static add(enter, hold, leave, curve, y) {
      let startY = Segment.lastY();
      let endY = startY + Util.toInt(y, 0) * segmentLength;
      let total = enter + hold + leave;
      let n;
      for (n = 0; n < enter; n++) Segment.add(Util.easeIn(0, curve, n / enter), Util.easeInOut(startY, endY, n / total));
      for (n = 0; n < hold; n++) Segment.add(curve, Util.easeInOut(startY, endY, (enter + n) / total));
      for (n = 0; n < leave; n++) Segment.add(Util.easeInOut(curve, 0, n / leave), Util.easeInOut(startY, endY, (enter + hold + n) / total));
    }
   static reset() {
      segments = [];
      Road.addStraight(ROAD. LENGTH. LONG);
      Road.addCurve(ROAD. LENGTH. LONG, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
      Road.addStraight();
      Road.addSCurves();
      Road.addStraight();
      Road.addHill(ROAD.LENGTH.LONG, ROAD.HILL.MEDIUM);
      Road.addLowRollingHills();
      Road.addBumps();
      Road.addDownhillToEnd();


      segments[Segment.find(playerZ).index + 2].color = COLORS.START;
      segments[Segment.find(playerZ).index + 3].color = COLORS.START;
      for (var n = 0; n < rumbleLength; n++) segments[segments.length - 1 - n].color = COLORS.FINISH;
      trackLength = segments.length * segmentLength;
    }
   static addStraight(num) {
      num = num || ROAD.LENGTH.MEDIUM;
      Road.add(num, num, num, 0, 0);
    }

    static addCurve(num, curve, height) {
      num = num || ROAD.LENGTH.MEDIUM;
      curve = curve || ROAD.CURVE.MEDIUM;
      height = height || ROAD.HILL.NONE;
      Road.add(num, num, num, curve, height);
    }

    static addSCurves() {
      Road.add(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY);
      Road.add(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM);
      Road.add(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY);
      Road.add(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY);
      Road.add(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM);
    }

    static addHill(num, height) {
      num = num || ROAD.LENGTH.MEDIUM;
      height = height || ROAD.HILL.MEDIUM;
      Road.add(num, num, num, 0, height);
    }

    static addLowRollingHills(num, height) {
      num = num || ROAD.LENGTH.SHORT;
      height = height || ROAD.HILL.LOW;
      Road.add(num, num, num, 0, height / 2);
      Road.add(num, num, num, 0, -height);
      Road.add(num, num, num, 0, height);
      Road.add(num, num, num, 0, 0);
      Road.add(num, num, num, 0, height / 2);
      Road.add(num, num, num, 0, 0);
    }

    static addBumps() {
      Road.add(10, 10, 10, 0, 5);
      Road.add(10, 10, 10, 0, -2);
      Road.add(10, 10, 10, 0, -5);
      Road.add(10, 10, 10, 0, 8);
      Road.add(10, 10, 10, 0, 5);
      Road.add(10, 10, 10, 0, -7);
      Road.add(10, 10, 10, 0, 5);
      Road.add(10, 10, 10, 0, -2);
    }

    static addDownhillToEnd(num) {
      num = num || 200;
      Road.add(num, num, num, -ROAD.CURVE.EASY, -Segment.lastY() / segmentLength);
    }

   }