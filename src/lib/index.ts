// place files you want to import through the `$lib` alias in this folder.
//
export type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

export interface Task {
	elf: string;
	task: TaskType;
	minutesTaken: number;
	date: string;
}
