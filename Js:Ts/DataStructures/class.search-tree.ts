class TNode<T> {
  value: T;
  left: TNode<T>;
  right: TNode<T>;

  constructor(value: T) {
    this.value = value;
  }

  inOrderTraversal = (node: TNode<T>) => {
    if (node?.value) {
      this.inOrderTraversal(node.left);
      this.visit(node);
      this.inOrderTraversal(node.right);
    }
  }

  preOrderTraversal = (node: TNode<T>) => {
    if (node?.value) {
      this.visit(node);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  postOrderTraversal = (node: TNode<T>) => {
    if (node?.value) {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      this.visit(node);
    }
  }

  visit = (node: TNode<T>) => {
    console.log(node.value);
  }

  // add to least filled section, left to right
  add = (item: T) => {
    const node = new TNode<T>(item);
    let current: TNode<T> = this;
    while (current.left && current.right) {
      if (current.left.left && current.left.right) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    if (current.left) current.right = node;
    else current.left = node;
  }
}

class BinarySearchTree extends TNode<number> {
  add = (item: number) => {
    const node = new BinarySearchTree(item);
    let current: BinarySearchTree = this;

    while (current.value) {
      if (item >= current.value) {
        if (current.right) current = current.right;
        else { current.right = node; break; }
      } else {
        if (current.left) current = current.left;
        else { current.left = node; break; }
      }
    }
  }
}

class MinHeap extends TNode<number> {
  previous: MinHeap;

  add = (item: number) => {
    let current: MinHeap = this;
    const node = new MinHeap(item);
    while (current.left && current.right) {
      if (current.left.left && current.left.right) {
        current = current.right as MinHeap;
      } else {
        current = current.left as MinHeap;
      }
    }
    node.previous = current;
    if (current.left) current.right = node;
    else current.left = node;
    this.reorganize(node);
  }

  reorganize = (node: MinHeap) => {
    while (node.previous) {
      if (node.value < node.previous.value) {
        let temp = node.value;
        node.value = node.previous.value;
        node.previous.value = temp;
        node = node.previous
      } else {
        break;
      }
    }
  };
}

class MaxHeap extends MinHeap {
  reorganize = (node: MinHeap) => {
    while (node.previous) {
      if (node.value > node.previous.value) {
        let temp = node.value;
        node.value = node.previous.value;
        node.previous.value = temp;
        node = node.previous
      } else {
        break;
      }
    }
  };
}