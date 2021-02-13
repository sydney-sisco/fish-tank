class GoFish extends Fish {

  constructor(options) {
    super(options);
    // this.imageUri = '/images/yellow_fish.gif';
    this.surgeSecondsLeft = 0;
    this.maxSurge = 1.0;
    this.surgMult = 3.0;

    this.loney = .5
    this.isLoney = true;

    this.ttl = 10;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S * (1 + this.surgeSecondsLeft * this.surgMult));
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    this.surgeSecondsLeft = Math.max(0, this.surgeSecondsLeft - PHYSICS_TICK_SIZE_S);

    // look for mate
    this.loney -= PHYSICS_TICK_SIZE_S;
    if (this.loney <= 0) {
      this.loney = .5;
      const potentialMates = this.tank.getProximateDenizens(this.position, this.height / 2);
      for (const denizen of potentialMates) {
        if (denizen !== this && denizen.isLoney) {
          console.log("fun fun!");
          // this.position = denizen.position.clone();
          denizen.mate();
          break;
        }
      }
    }

    // grow old
    this.ttl -= PHYSICS_TICK_SIZE_S;
    if (this.ttl <= 0) {
      this.kill();
    }
  }

  mate() {
    this.loney = .5;

    var Type = this.type;
    var individual = new BabyFish({
      tank: this.tank,
      position: this.position,
    });
  }


  onClick(event) {
    this.surgeSecondsLeft = this.maxSurge;
  }
}
