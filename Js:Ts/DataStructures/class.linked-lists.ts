// Created version of linked list:

/**
 * Exercises: 
 * 1.) [x] Remove duplicates from linked list
 * 2.) [x] Find kth to last element in linked list
 * 3.) [x] Delete node from somewhere in middle given only node
 * 4.) [x] Given a data, partition 2 linked lists above and below value
 * 5.) [x] Sum lists assume head is the 1's place, and tail is the top most
 * 6.) [x] Palindrone List : same fowards as backwards.
 * 7.) [x] Intersection, find if two lists intersect by reference (not by values)
 * 8.) [x] Looped list: Given a list, find beginning of loop if exists
 */

export class Node<T> {
	data: T;
	next: Node<T> = null;
	previous: Node<T> = null;
	constructor(data: T, next?: Node<T>) {
		this.data = data;
		if (next) {
			this.next = next;
			next.previous = this;
		};
	}
}

export class LinkedList<T> {
	head: Node<T>;

	constructor(node: Node<T>) {
		this.head = node
	}

	AppendToTail = (node: Node<T>) => {
		let current: Node<T> = this.head;
		while (current.next !== null) {
			current = current.next;
		}
		current.next = node;
		node.previous = current;
	}
	AppendToHead = (node: Node<T>) => {
		this.head.previous = node;
		node.next = this.head;
		this.head = node;
	}
	ToString = () => {
		let current: Node<T> = this.head;
		while (current !== null) {
			console.log('next node:')
			console.log(`${current.previous ? current.previous.data + ': Previous' : 'Current Head'}\n${current.data}: Current\n${current.next ? current.next.data + ': Next' : 'Current Tail'}`);
			current = current.next;
		}
	}
	/**
	 * Space Complexity: O(n + k) - k: size of buffer, n: size of linked list;  
	 * Time Complexity: O(nk);
	 */
	RemoveDuplicates = () => {
		const dataBuffer = [];
		let current: Node<T> = this.head;
		while (current !== null) {
			let found: boolean = false;
			// Time: nk (k size of databuffer, n length of list)
			for (const data of dataBuffer) {
				if (current.data === data) {
					found = true;
					current.previous.next = current.next;
					if (current.next) current.next.previous = current.previous;
				}
			}
			if (!found) dataBuffer.push(current.data);
			current = current.next;
		}
	}
	/**
	 * Space Complexity: O(n) - required to store linked list
	 * Time Complexity: O(n + k) - iterate through list, and then back k elements; (worst case 2n);
	 */
	FindKthLastElement = (number: number) => {
		let current: Node<T> = this.head;
		let count = 0;
		while (current.next !== null) {
			count++;
			current = current.next;
		}
		if (count < number) return null;

		for (let _ = 0; _ < number; _++) {
			current = current.previous;
		}
		return current;
	}

	/**
	 * Space Complexity: O(n) - required to store linked list
	 * Time Complexity: O(n) - iterate through list,;
	 */
	private FindKthElement = (number: number) => {
		let current: Node<T> = this.head;
		for (let _ = 0; _ < number; _++) {
			if (current.next) current = current.next;
			else return null;
		}
		return current;
	}
	/**
	 * Space Complexity: O(n)
	 * Time Complexity: O(n)
	 */
	DeleteNode = (node: Node<T>) => {
		if (node === this.head) return;
		let current: Node<T> = this.head;
		while (current.next !== null) {
			if (current === node) {
				if (current.next) {
					current.previous.next = current.next;
					current.next.previous = current.previous;
				}
				return;
			}
			current = current.next;
		}
	}
	/**
	 * Space Complexity: O(2n) - linked list split into two, each of equal size;
	 * Time Complexity: O(n) - iterative search for all items;
	 */
	SplitLists = (data: T) => {
		let listOne: LinkedList<T> = null;
		let listTwo: LinkedList<T> = null;
		let current: Node<T> = this.head;
		while (current !== null) {
			let node: Node<T> = new Node(current.data)
			if (current.data < data) {
				if (!listOne) {
					listOne = new LinkedList<T>(node);
				} else {
					listOne.AppendToTail(node);
				}
			} else {
				if (!listTwo) {
					listTwo = new LinkedList<T>(node);
				} else {
					listTwo.AppendToTail(node);
				}
			}
			current = current.next
		}
		this.head = listOne.head;
		return listTwo;
	}
	/**
	 * Space Complexity: O(3n) - 2 linked lists, plus the final returned list
	 * Time Complexxity O(2n + k) where n is longer list, k is shorter.
	 */
	SumLists = (ListTwo: LinkedList<number>) => {
		if (typeof this.head !== "number") return;
		let resultList: LinkedList<number> = null;
		let current: Node<number> = this.head;
		let countOne = 0;
		let countTwo = 0;
		while (current !== null) {
			countOne++;
			current = current.next
		}
		current = ListTwo.head;
		while (current !== null) {
			countTwo++;
			current = current.next
		}
		const count = countOne > countTwo ? countOne : countTwo;
		let data: number;
		let overflow = 0;
		for (let i = 0; i < count; i++) {
			let numberOne: number;
			let numberTwo: number;
			if (this.FindKthElement(i)) numberOne = this.FindKthElement(i).data as unknown as number;
			if (ListTwo.FindKthElement(i)) numberTwo = ListTwo.FindKthElement(i).data
			data = numberOne + numberTwo + overflow;
			overflow = 0;
			if (data > 9) {
				data = data - 10;
				overflow = 1;
			}
			if (!resultList) resultList = new LinkedList(new Node(data))
			else resultList.AppendToTail(new Node<number>(data));
		}
		if (overflow === 1) resultList.AppendToTail(new Node(1));
		return resultList;
	}
	/**
	 * Space Complexity: O(n) - only holds linked list
	 * Time Complexity: O(2n + (k/4)) find length of list, then take first and last index of list, calculated off time from called functions
	 */
	IsPalindrone = () => {
		let current: Node<T> = this.head;
		let isOdd: boolean = false;
		let count = 0;
		while (current !== null) {
			count++;
			current = current.next;
		}
		if (count % 2 === 1) {
			isOdd = true;
		}
		count = isOdd ? (count - 1) / 2 : count / 2;
		for (let i = 0; i < count; i++) {
			if (this.FindKthElement(i).data !== this.FindKthLastElement(i).data) return false;
		}
		return true;
	}
	/**
	 * Space Complexity: O(n + k) where n and k are size of both lists 2n worst case; 
	 * Time Complexity: O(n^2);
	 */
	Intersect = (ListTwo: LinkedList<T>) => {
		let current: Node<T> = this.head;
		let currentTwo: Node<T> = ListTwo.head;
		while (current !== null) {
			while (currentTwo !== null) {
				if (current === currentTwo) return true;
				currentTwo = currentTwo.next;
			}
			currentTwo = ListTwo.head;
			current = current.next;
		}
		return false;
	}
	/**
	 * Space Complexity: O(2n)
	 * Time Complexity: O(n^2)
	 */
	IsLoop = () => {
		let current: Node<T> = this.head;
		const references = [];
		while (current !== null) {
			for (const node of references) {
				if(node === current) return node;
			}
			references.push(current);
			current = current.next;
		}
		return null;
	}
}