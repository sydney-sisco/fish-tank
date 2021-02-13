class Starter extends Denizen {

  constructor(options) {
    super(options);
    this.imageUri = '/images/pipe-clipart-pixel-art-3.png';
    this.position.y += this.height;
    this.height = options.height || 100;
    this.width = options.width || 100;
    this.spawnTimer = options.spawnTimer || randRange(.3, 1);
  }

  updateOneTick() {
    // have the starter spawn eggs automatically if SCREEN_SAVER_MODE is True
    if (SCREEN_SAVER_MODE) {
      this.spawnTimer -= PHYSICS_TICK_SIZE_S;
      if (this.spawnTimer < 0) {
        // spawn 1 - 3 eggs
        this._spawnEgg(randRangeInt(1, 3));
        // reset the spawn timer
        this.spawnTimer = randRange(.3, 1);
      }
    }
  }

  onClick(event) {
    this._spawnEgg(1);
    this.spawnTimer = randRange(.3, 1);
  }

  // spawns a given number of eggs
  _spawnEgg(count) {
    for (let i = 0; i < count; i++) {
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
}
