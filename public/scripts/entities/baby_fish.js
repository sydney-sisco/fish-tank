class BabyFish extends Fish {

  constructor(options) {
    super(options);
    // this.imageUri = '/images/yellow_fish.gif';
    this.height = options.height || 30;
    this.width = options.width || 30;
    this.surgeSecondsLeft = 0;
    this.maxSurge = 1.0;
    this.surgMult = 3.0;

    this.ttl = 3;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S * (1 + this.surgeSecondsLeft * this.surgMult));
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    this.surgeSecondsLeft = Math.max(0, this.surgeSecondsLeft - PHYSICS_TICK_SIZE_S);

    // grow up
    this.ttl -= PHYSICS_TICK_SIZE_S;
    if (this.ttl <= 0) {
      var individual = new GoFish({
        tank: this.tank,
        position: this.position,
      });
      this.kill();
    }
  }
}
