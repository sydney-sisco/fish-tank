class BiteFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUri = '/images/bite_fish.gif';
    this.height = options.height || 120;
    this.width = options.width || 120;

    this.sated = .5;
    this.hungry = 10;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }

    // look for food
    this.sated -= PHYSICS_TICK_SIZE_S;
    if (this.sated < 0) {
      this.sated = .5;
      const food = this.tank.getProximateDenizens(this.position, this.height / 2);
      for (const denizen of food) {
        if (denizen !== this && denizen.isTasty) {
          console.log("yum yum!", this.height);
          this.position = denizen.position.clone();
          denizen.kill();
          // this.height += 30;
          // this.width += 30;
          break;
        }
      }
    }

    // be hungry, maybe die
    this.hungry -= PHYSICS_TICK_SIZE_S;
    this.maxSwimSpeed = 20 * this.hungry; // slows down with hunger level
    if (this.hungry <= 0) {
      this.kill();
    }

    // accend
    if (this.height > 10000) {
      this.kill(5);
    }
  }
}
