export enum VillainStatus {
	Open,
	Resolved,
}

export interface Villain {
	location: string;
	name: string;
}

export enum SortMethod {
	Reporter,
  Villain,
  Time,
  Location,
}

export class VillainReport implements Villain {

	constructor (
    public name: string,
    public reporter: string, 
    public time: Date, 
		public location: string, 
    public coordinates: {x:number, y:number},
		private status: VillainStatus,
		public description: string,
    public imageurl:string | null = null,
    private id:string = "id" + Math.random().toString(32).slice(2),
		) {
		
	}
    
  getId () {
		return this.id;
	}

	getStatus() {
		return this.status;
	}

	updateStatus(s: VillainStatus) {
		this.status = s;
	}

  getImageAlt() {
    return `devious image of the villainous "${this.name}"`;
  }
}