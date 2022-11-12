//graph definition: Collection of nodes with edges connecting them
class GraphNode<T> {
  private value: T;
  private id: number;
  private edges: GraphNode<T>[] = [];

  constructor(value: T, id: number) {
    this.value = value;
    this.id = id
  }

  addEdge = (node: GraphNode<T>, isDirectional?: boolean) => {
    this.edges.push(node);
    if (isDirectional) node.edges.push(this);
  }
  getId = (): number => {
    return this.id;
  }
  getEdges = () => {
    return this.edges;
  }
  getValue = () => {
    return this.value;
  }
}

class Graph<T> {
  private directional: boolean = false;
  private size: number = 0;

  private nodes: GraphNode<T>[] = [];

  constructor(isDirectional?: boolean) {
    if (isDirectional) this.directional = true;
  }

  private processNodes = (node: GraphNode<T>, matrix: number[][]): number[][] => {
    const id = node.getId();
    for (const child of node.getEdges()) {
      if (matrix[id][child.getId()] === 1) break;
      matrix[id][child.getId()] = 1;
      matrix = this.processNodes(child, matrix);
    }
    return matrix;
  }

  private traverseTo = (index: number) => {
    let visited = []
      for (const base of this.nodes) {
        if (visited.indexOf(base.getId()) !== -1) break;
        visited.push(base.getId());
        const target = this.traverseToNode(index, base, visited);
        if (target) return target;
      }
  }

  private traverseToNode = (index: number, node?: GraphNode<T>, visited?: number[]) => {
    if (node.getId() === index) {
      return node;
    }
    for (const child of node.getEdges()) {
      if (visited.indexOf(child.getId()) !== -1) continue;
      visited.push(child.getId());
      return this.traverseToNode(index, child, visited);
    }
  }

  addBase = (value: T) => {
    this.nodes.push(new GraphNode<T>(value, this.size));
    this.size++;
  }
  addAt = (index: number, value: T) => {
    if (index > this.nodes.length) return;
    this.nodes[index].addEdge(new GraphNode<T>(value, this.size), this.directional);
    this.size++;
  }
  addNext = (value: T) => {
    const node = this.traverseTo(this.size - 1);
    node.addEdge(new GraphNode<T>(value, this.size), this.directional);
    this.size++;
  }
  getValueAt = (index: number) => {
    if (index > this.size) return 'Out of bounds';
    const node = this.traverseTo(index);
    return node.getValue();
  }
  displayAdjacenyMatrix = () => {
    let display = Array.from(
      { length: this.size }, () => Array.from(
        { length: this.size }, () => 0));
    for (const node of this.nodes) {
      display = this.processNodes(node, display);
    }
    console.log(`Size of graph: ${this.size} x ${this.size}`);
    console.log(display);
  }
}

const graph = new Graph<number>();
