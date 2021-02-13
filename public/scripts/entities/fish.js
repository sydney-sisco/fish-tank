class Fish extends Denizen {

  constructor(options) {
    super(options);
    this.imageUriLeft = '/images/yellow_fish_l.gif';
    this.imageUriRight = '/images/yellow_fish_r.gif';
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
    let facing;
    if (this.swimVelocity.x > 0) {
      // facingLeft = false;
      facing = 'r';
    } else {
      // facingLeft = true;
      facing = 'l';
    }

    const rules = {
      imageUri: facing === 'l' ? this.imageUriLeft : this.imageUriRight,
      css: {
        width: this.width,
        height: this.height,
      },
      x: this.position.x - Math.floor(this.width/2),
      y: this.position.y - Math.floor(this.height/2),
    };

    // if (facingLeft) {
    //   rules.css['-webkit-transform'] = 'scaleX(-1)';
    //   rules.css['transform'] = 'scaleX(-1)'
    // }

    return rules;
  }

}

