class Starter extends Denizen {

  constructor(options) {
    super(options);
    this.imageUri = '/images/pipe-clipart-pixel-art-3.png';
    this.position.y += this.height;
    this.height = options.height || 100;
    this.width = options.width || 100;
  }

  update(t) {
    // no physics for Starter
  }

  onClick(event) {
    var xVel = randRangeInt(-300, 300);
    var yVel = 400 - Math.abs(xVel);
    var s = new Seed({
      tank: this.tank,
      position: this.position,
      velocity: new Vector(xVel, yVel),
      type: this.tank.getRandomSpecies(),
    });
  }
}
