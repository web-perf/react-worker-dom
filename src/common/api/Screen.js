export default class Screen {
    constructor(screen) {
      this.availHeight = screen.availHeight;
      this.availLeft = screen.availLeft;
      this.availTop = screen.availTop;
      this.availWidth = screen.availWidth;
      this.colorDepth = screen.colorDepth;
      this.height = screen.height;
      this.orientation = {
        angle: screen.orientation.angle,
        onchange: screen.orientation.onchange,
        type: screen.orientation.type,
      };
      this.width = screen.width;
    }
}
