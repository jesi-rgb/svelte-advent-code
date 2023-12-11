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
