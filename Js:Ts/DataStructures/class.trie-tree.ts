// A tree structure meant to represent language, * indicates termination
class TrieNode {
  private character: string;
  private terminating: boolean = false;
  constructor(character: string) {
    this.character = character;
    if (character === "*") this.terminating = true;
  }
  isTerminating() {
    return this.terminating;
  }
  value() {
    return this.character;
  }
}

class Tries {
  value: TrieNode | null;
  children: Tries[] = [];
  constructor(string: string, terminating: boolean, isRoot?: boolean) {
    if (!isRoot) {
      this.value = null;
      this.children.push(new Tries(string, terminating, true));
      return;
    }
    if (string.length === 1) {
      if (string === "*") {
        this.value = new TrieNode("*");
        return;
      }
      this.value = new TrieNode(string);
      if (terminating) this.children.push(new Tries("*", false, true));
    }
    else {
      this.value = new TrieNode(string[0]);
      this.children.push(new Tries(string.slice(1), terminating, true));
    }
  }
  toString = () => {
    console.log(this.value ? this.value : 'root')
    for (const child of this.children) {
      child.toString();
    }
  }
  addString = (string: string) => {
    let activeChild: Tries[] = this.children;
    for (let i = 0; i < string.length; i++) {
      let found: boolean = false;
      for (const child of activeChild) {
        if (child.value.value() === string[i]) {
          activeChild = child.children;
          found = true;
          break;
        }
      }
      if (!found) {
        activeChild.push(new Tries(string.slice(i), true, true));
        break;
      }
    }
  }
}

const tree = new Tries("man", true);
tree.addString("many")
tree.addString("something")
tree.addString("somethingelse")
tree.toString();