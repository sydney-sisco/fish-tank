class BiteFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUri = '/images/bite_fish.gif';
    this.sated = .5
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
      const food = this.tank.getProximateDenizens(this.position, this.height);
      for (const denizen of food) {
        if (denizen !== this && denizen.isTasty) {
          console.log("yum yum!");
          this.position = denizen.position.clone();
          denizen.kill();
          this.height = this.width *= 1.5
          // break;
        }
      }
    }

    // accend
    if (this.height > 10000) {
      this.kill(5);
    }
  }
}
