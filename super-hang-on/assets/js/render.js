class Render {
    constructor() {
      throw new Error("Class 'Render' should be used as a static Class. Do not instantiate!");
    }

    static polygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.fill();
      }
      static segment(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {
        const r1 = Render.rumbleWidth(w1, lanes);
        const r2 = Render.rumbleWidth(w2, lanes);
        const l1 = Render.laneMarkerWidth(w1, lanes);
        const l2 = Render.laneMarkerWidth(w2, lanes);
        ctx.fillStyle = color.grass;
        ctx.fillRect(0, y2, width, y1 - y2);
        Render.polygon(ctx, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, color.rumble);
        Render.polygon(ctx, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, color.rumble);
        Render.polygon(ctx, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, color.road);
        if (color.lane) {
          const lanew1 = (w1 * 2) / lanes;
          const lanew2 = (w2 * 2) / lanes;
          let lanex1 = x1 - w1 + lanew1;
          let lanex2 = x2 - w2 + lanew2;
          for (let lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, lane++) {
            Render.polygon(ctx, lanex1 - l1 / 2, y1, lanex1 + l1 / 2, y1, lanex2 + l2 / 2, y2, lanex2 - l2 / 2, y2, color.lane);
          }
        }
      }

      static background(ctx, background, width, height, layer, rotation, offset) {
        rotation = rotation || 0;
        offset = offset || 0;
        let imageW = layer.w / 2;
        let imageH = layer.h;
        let sourceX = layer.x + Math.floor(layer.w * rotation);
        let sourceY = layer.y;
        let sourceW = Math.min(imageW, layer.x + layer.w - sourceX);
        let sourceH = imageH;
        let destX = 0;
        let destY = offset;
        let destW = Math.floor(width * (sourceW / imageW));
        let destH = height;
        ctx.drawImage(background, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
        if (sourceW < imageW) ctx.drawImage(background, layer.x, sourceY, imageW - sourceW, sourceH, destW - 1, destY, width - destW, destH);
      }


      static sprite(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY) {
        //  scale for projection AND relative to roadWidth (for tweakUI)
        let destW = ((sprite.w * scale * width) / 2) * (SPRITES.SCALE * roadWidth);
        let destH = ((sprite.h * scale * width) / 2) * (SPRITES.SCALE * roadWidth);
        destX = destX + destW * (offsetX || 0);
        destY = destY + destH * (offsetY || 0);
        let clipH = clipY ? Math.max(0, destY + destH - clipY) : 0;
        if (clipH < destH) ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h * clipH) / destH, destX, destY, destW, destH - clipH);
      }

     static fog(ctx, x, y, width, height, fog) {
        if (fog < 1) {
          ctx.globalAlpha = 1 - fog;
          ctx.fillStyle = COLORS.FOG;
          ctx.fillRect(x, y, width, height);
          ctx.globalAlpha = 1;
        }
      }

      static rumbleWidth(projectedRoadWidth, lanes) {
        return projectedRoadWidth / Math.max(6, 2 * lanes);
      }
      
      static laneMarkerWidth(projectedRoadWidth, lanes) {
        return projectedRoadWidth / Math.max(32, 8 * lanes);
      }

      static player(ctx, width, height, resolution, roadWidth, sprites, speedPercent, scale, destX, destY) {
        // steer, updown
        let sprite = SPRITES.BIKE[bikeSpriteSelector];
        Render.sprite(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, -0.5, -1.04);
      }

   }