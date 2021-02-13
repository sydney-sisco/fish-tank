class SwitchFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUri = `/images/orange_fish.gif`;
  }

  onClick(event) {
    this.makeNewVelocity(50);
  }
}
