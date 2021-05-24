

export class Rectangle {
  constructor(ctx, x, y, w, h, color) {
      this.CTX = ctx
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color;
  }
  draw() {
    this.CTX.beginPath()
    this.CTX.fillStyle = this.color
    this.CTX.fillRect(this.x, this.y, this.w, this.h)
  }
}





export class Stone {
    constructor(ctx, x, y, w, h, color, nr, pos, fColor = 'gold') {      
      this.CTX = ctx
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color;
      this.nr = nr;
      this.pos = pos;
      this.fontColor = fColor
      this.line = 2
      this.fontSize = Math.floor(this.w / 3)
    }
    draw() {
      this.CTX.fillStyle = this.color;
      this.CTX.strokeStyle = '#cccccc';
      this.CTX.lineWidth = this.line
      this.CTX.fillRect(this.x + this.line, this.y + this.line, this.w - this.line, this.h - this.line);
      this.CTX.strokeRect(this.x + this.line, this.y + this.line, this.w - this.line, this.h - this.line);
      this.CTX.beginPath();    
      this.CTX.font = `${this.fontSize}px Arial`;   
      this.CTX.fillStyle = this.fontColor;
      this.CTX.textAlign = 'center';
      this.CTX.fillText(this.nr, this.x + this.w / 2, this.y + this.h / 2 + (this.fontSize / 2));
    } 
  }
  