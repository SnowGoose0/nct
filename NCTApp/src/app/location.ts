export class VillainLocation {
  constructor(private location:string, private x:number, private y:number) {}

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  getLocation() {
    return this.location;
  }

  updateLocationName(location:string) {
    this.location = location;
  }

  updateCoordinates(x:number, y:number) {
    this.x = x; this.y = y
  }
}