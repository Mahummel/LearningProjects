export class MergeSort {
	private array: number[];
	private startTime: number = 0;
	private endTime: number = 0;

	constructor(size: number) {
		this.array = this.createArray(size);
	}

	private createArray(size: number) {
		return Array.from({ length: size }, () => Math.floor(Math.random() * 100))
	};

	private merge(left: number[], right: number[]) {
		let arr: number[] = [];
		while (left.length && right.length) {
			if (left[0] < right[0]) {
				arr.push(left.shift());
			} else {
				arr.push(right.shift());
			}
		}
		return [...arr, ...left, ...right];
	}

	private mergeSort = (array) => {
		const middle = Math.floor(array.length / 2)

		// Base case or terminating case
		if (array.length < 2) {
			return array
		}

		const left = array.splice(0, middle)
		return this.merge(this.mergeSort(left), this.mergeSort(array))
	};

	StartMerge() {
		this.startTime = new Date().getTime();
		this.array = this.mergeSort(this.array);
		this.endTime = new Date().getTime();
		this.ToString();
	}

	minSet = () => {
		
	}

	ToString = () => {
		console.log(this.array);
		console.log(`Time Taken: ${this.endTime - this.startTime}ms`);
	};
}

const mergeTest = new MergeSort(200)