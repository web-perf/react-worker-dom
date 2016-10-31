export default class Touch {
    constructor(touch) {
      if(touch) {
        this.clientX = touch.clientX;
        this.clientY = touch.clientY;
        this.identifier = touch.identifier;
        this.pageX = touch.pageX;
        this.pageY = touch.pageY;
        this.screenX = touch.screenX;
        this.screenY = touch.screenY;
      }
    }
}
