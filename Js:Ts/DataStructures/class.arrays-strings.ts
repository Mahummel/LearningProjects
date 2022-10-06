/**
 * 1.) [x] algorith to determine a string has all uniques
 * 2.) [x] given 2 strings write if one is permuation of other []
 * 3.) [x] write method to replace all spaces with %20, implement with array structure
 * 4.) [x] check if permutation of string is palindrome (same fowards as backwards)
 * 5.) [x] given 2 strings, check if theyre 1 operation away from each other (insert, replace, remove)
 * 6.) [x] given string compress to count of repeated letters, only return if new string is shorter than old
 */

export class ArraysAndStrings {
	private string1: string;
	private string2: string;

	constructor(string1: string, string2?: string) {
		this.string1 = string1;
		this.string2 = string2;
	}

	private ToString = (prompt: any) => {
		console.log(prompt)
	}

	/**
	 * Space complexity O(k) - maintaining an array of unique letters
	 * Time complexity O(kN) - Full list of letters compared against string
	 */
	AllUniques = () => {
		const currentLetters: string[] = [];
		for (const letter of this.string1) {
			for (const compare of currentLetters) {
				if (letter === compare) return this.ToString(false);
			}
			currentLetters.push(letter);
		}
		return this.ToString(true);
	}

	/**
	 * Space Complexity: 2 (2 hashmaps) O(1)
	 * Time Complexity: O(2n + k) where n = length of string, k = number of unique characters
	 */
	IsPermutation = () => {
		const stringOneKey = {};
		const stringTwoKey = {};
		if (this.string1.length !== this.string2.length) return this.ToString(false);
		for (const letter of this.string1) {
			if (!stringOneKey[letter]) stringOneKey[letter] = 1;
			else stringOneKey[letter] += 1;
		}
		for (const letter of this.string2) {
			if (!stringOneKey[letter]) return this.ToString(false);
			if (!stringTwoKey[letter]) stringTwoKey[letter] = 1;
			else {
				stringTwoKey[letter] += 1
				if (stringOneKey[letter] < stringTwoKey[letter]) return this.ToString(false);
			};
		}
		for (const key in stringOneKey) {
			if (stringOneKey[key] !== stringTwoKey[key]) return this.ToString(false);
		}
		return this.ToString(true);
	}
	/**
	 * Space Complexity: O(n) Normally, as size is given, but with js, we need to restructure so O(2n);
	 * Time Complexity: O(n + k) 1 run through required to replace the space with 3 characters, k = number of spaces
	 */
	ReplaceSpace = () => {
		// Required to turn string into array for problem;
		let stringArray: string[] = [];
		let tempArray: string[] = []

		for (const letter of this.string1) stringArray.push(letter);

		let i = 0;
		while (i < stringArray.length) {
			if (stringArray[i] === ' ') {
				tempArray = stringArray.slice(0, i);
				tempArray.push('%');
				tempArray.push('2');
				tempArray.push('0');
				stringArray = tempArray.concat(stringArray.slice(i + 1, stringArray.length));
				i += 2
			}
			i++
		}
		return this.ToString(stringArray);
	}

	/**
	 * Space Complexity: O(1) - storing single dictonary
	 * Time Complexity: O(n + k) where k = size of dictionary
	 */
	IsPalindrone = () => {
		const dict = {};
		for (const letter of this.string1) {
			if (!dict[letter]) dict[letter] = 1
			else dict[letter]++;
		}
		let oddNumber = 0;
		for (const key in dict) {
			if (dict[key] % 2 !== 0) oddNumber++;
		}
		if (oddNumber > 1) return this.ToString(false);
		return this.ToString(true)
	}

	/**
	 * Space Complexity: O(1)
	 * Time Complextity: O(n) where n is larger of two strings
	 */
	OneOperationAway = () => {
		if (
			!this.string1 ||
			!this.string2 ||
			Math.abs(this.string1.length - this.string2.length) > 1
		) return this.ToString(false);

		const longer = this.string1.length > this.string2.length ? this.string1 : this.string2;
		const shorter = this.string1.length < this.string2.length ? this.string1 : this.string2;

		let differences = 0;

		if (this.string1.length === this.string2.length) {
			for (let i = 0; i < this.string1.length; i++) {
				if (this.string1[i] !== this.string2[i]) {
					differences++;
				}
			}
		} else {
			differences++;
			for (let i = 0; i < longer.length - 1; i++) {
				if (longer[i + 1]) {
					if (longer[i + 1] !== shorter[i] && longer[i] !== shorter[i]) {
						differences++;
					}
				} 
			}
		}
		return this.ToString(differences <= 1);
	}
	/**
	 * Space Complexity: O(n) where n = length of new string creation 
	 * Time Complexity: O(n) (must iterate through full string)
	 */
	Compression = () => {
		let newString: string = "";

		let previousLetter: string;
		let count: number;
		for (const letter of this.string1.toLowerCase()) {
			if (letter !== previousLetter) {
				if (previousLetter) newString += `${previousLetter}${count}`;
				previousLetter = letter;
				count = 1;
			} else {
				count++;
			}
		}
		newString += `${previousLetter}${count}`;
		return this.ToString(newString.length < this.string1.length ? newString : this.string1);
	}
}