// Practice Problems:
/**
 * 1.) [x] how could you use a single array to implement 3 stacks?
 * 2.) [x] implement min, returns minimum element operate in O(1)
 * 3.) [x] Create a set of stacks, once a stack exceeds a size, generate new stack, new data structure
 * 4.) [] implement a queue of 2 stacks
 * 5.) [] sort stack, smallest on top
 */

/**
 * 1.)
 * a single array could me generated into multiple stacks by specifying a maximum stack size, 
 * and generating new stacks based on size exceeded, this would mean with a chosen stack size n,
 * the array would have to be 3n in length to produce 3 equal length stacks.
 */

class StackNode<T> {
	data: T;
	next: StackNode<T>;
	constructor(data: T) {
		this.data = data;
	}
}

export class Stack<T> {
	private top: StackNode<T> | undefined;
	private minimum: StackNode<T>;

	Size: number = 0;

	Pop = () => {
		const data = this.top?.data;
		this.top = this.top.next;
		if (this.Size > 0) this.Size--;
		return data;
	}

	Push = (item: T) => {
		const stackNode = new StackNode(item);
		if (!this.minimum) this.minimum = stackNode;
		if (stackNode.data < this.minimum.data) this.minimum = stackNode;
		stackNode.next = this.top;
		this.top = stackNode;
		this.Size++;
	}

	Peek = () => {
		return this.top?.data;
	}

	IsEmpty = () => {
		return this.top === undefined;
	}

	/**
	 * Size complexity: O(n) - size of stack
	 * Time complexity: O(1) - min is always saved and updated
	 */
	Minimum = () => {
		return this.minimum;
	}
}

export class SetOfStacks<T> {
	private maxSize: number;
	private stacks: Stack<T>[] = [];

	constructor(size: number) {
		this.maxSize = size;
	}

	private CreateNewStack = (item: T) => {
		const stack = new Stack<T>();
		stack.Push(item);
		return stack;
	}

	Push = (item: T) => {
		for (const stack of this.stacks) {
			if (stack.Size < this.maxSize) {
				stack.Push(item);
				return;
			}
		}
		const newStack = this.CreateNewStack(item);
		this.stacks.push(newStack);
	}

	Pop = () => {
		const stack = this.stacks[this.stacks.length - 1];
		const data = stack.Pop();
		if (stack.IsEmpty()) {
			this.stacks.pop();
		}
		return data;
	}

	PopAtIndex = (index: number) => {
		if (index >= this.stacks.length) return;
		this.stacks[index].Pop();
		if (this.stacks[index].IsEmpty()) {
			this.stacks.splice(index, 1);
		}
	}

}

export class Queue<T> {
	private top: StackNode<T>;
	private bottom: StackNode<T>;

	Add = (item: T) => {
		const stackNode = new StackNode<T>(item);
		if (this.bottom) this.bottom.next = stackNode;
		this.bottom = stackNode;
		if (!this.top) this.top = this.bottom;
	}

	Remove = () => {
		const data = this.top?.data;
		if (this.top.next) {
			this.top = this.top.next;
		}
		if (!this.top) this.bottom = null;
		return data;
	}

	Peek = () => {
		return this.top?.data;
	}

	IsEmpty = () => {
		return this.top === null;
	}
}