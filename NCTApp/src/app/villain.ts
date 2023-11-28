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
	private id: string;

	constructor (
		public location: string, 
    public coordinates: {x:number, y:number},
		public name: string, 
		public time: Date, 
		private status: VillainStatus,
		public reporter: string,
    public image: string | null,
		public description: string,
		) {
		
		this.id = "id" + Math.random().toString(32).slice(2);
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