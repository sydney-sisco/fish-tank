class SwitchFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUriLeft = `/images/orange_fish_l.gif`;
    this.imageUriRight = `/images/orange_fish_r.gif`;
  }

  onClick(event) {
    this.makeNewVelocity(50);
  }
}
