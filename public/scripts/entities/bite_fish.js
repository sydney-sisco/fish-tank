class BiteFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUriLeft = '/images/bite_fish_l.gif';
    this.imageUriRight = '/images/bite_fish_r.gif';
    this.sated = 1
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
      this.sated = 1;
      const food = this.tank.getProximateDenizens(this.position, this.height);
      for (const denizen of food) {
        if (denizen !== this && denizen.isTasty) {
          console.log("yum yum!");
          denizen.kill();
          this.height = this.width *= 1.5
        }
      }
    }

    // accend
    if (this.height > 10000) {
      this.kill(5);
    }
  }
}
