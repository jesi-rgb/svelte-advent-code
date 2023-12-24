// place files you want to import through the `$lib` alias in this folder.
//
export type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

export interface Task {
	elf: string;
	task: TaskType;
	minutesTaken: number;
	date: string;
}

export interface DisplayData {
	elf: string;
	total_creation: Array<number>;
	total_wrapping: Array<number>;
	creation_rate: string;
	wrapping_rate: string;
}

export interface CardType {
	url: string;
	index: number;
}

export interface NamesList {
	firstNames: string[];
	lastNames: string[];
}

export interface Present {
	name: string;
	weight: number;
}

export type ResponseData = Present[];

export interface GroupBalance {
	weight: number;
	avgWeight: number;
	children: Present[];
	name: string;
}

export interface Particle {
	x: number;
	y: number;
	dx: number;
	dy: number;
	size: number;
}

export interface Present3D {
	name: string;
	x: number; // 1-20
	y: number; // 1-20
	z: number;
}

export interface ElfPost {
	id: string;
	author: string;
	timestamp: string;
	content: string;
	likes: number;
	comments: PostComment[];
}

export interface PostComment {
	id: string;
	author: string;
	timestamp: string;
	content: string;
	likes: number;
}

export interface Destination {
	id: string;
	arrival: number; // arrival unix timestamp (UTC)
	departure: number | null; // only null for the final landing
	population: number;
	presentsDelivered: number;
	numberPresents: number;
	city: string;
	region: string;
	location: {
		lat: number;
		lng: number;
	};
}

export interface DestinationResponse {
	/**
	 * Current Location
	 */
	current: Destination;

	/**
	 * Next Location
	 */
	next: Destination;

	/**
	 * History of locations (excluding current)
	 */
	history: Destination[];
}
