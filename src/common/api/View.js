export default class View {
    constructor(screen) {
      if(screen) {
        this.screen = {
          width: screen.width,
          height: screen.height,
        };
      }
    }
}
