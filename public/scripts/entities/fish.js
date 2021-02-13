class Fish extends Denizen {

  constructor(options) {
    super(options);
    this.imageUri = '/images/yellow_fish.gif';
    // this.imageUriLeft = '/images/yellow_fish_l.gif';
    // this.imageUriRight = '/images/yellow_fish_r.gif';
    this.maxSwimSpeed = 100;
    this.makeNewVelocity();
    this.isTasty = true;
  }

  generateSwimVelocity(max, min) {
    if (min && min > max) {
      min = 0;
    }
    var newSpeed = new Vector(randRangeInt(-max, max), randRangeInt(-max / 2, max / 2));
    while (min && newSpeed.magnitude() < min) {
      newSpeed = new Vector(randRangeInt(-max, max), randRangeInt(-max / 2, max / 2));
    }
    return newSpeed;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
  }

  makeNewVelocity(minMag) {
    this.swimVelocity = this.generateSwimVelocity(this.maxSwimSpeed, minMag || 0);
    this.timeUntilSpeedChange = randRangeInt(5);
  }

  renderRules() {
    let facingRight = true;
    if (this.swimVelocity.x < 0) {
      facingRight = false;
    }

    const rules = {
      imageUri: this.imageUri,
      css: {
        width: this.width,
        height: this.height,
        // transform: `rotate(${randRangeInt(0, 360)}deg)`
        transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)'
      },
      x: this.position.x - Math.floor(this.width/2),
      y: this.position.y - Math.floor(this.height/2),
    };

    return rules;
  }

}

