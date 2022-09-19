package Hackerrank;

public class Tree<V> {
  class Node<V> {
    V value;
    Node<V> left = null;
    Node<V> right = null;
    Node(V value) {
      this.value = value;
    }
  }

  Node<V> base = null;
  public void insert(V value) {
    if (this.base == null) base = new Node<V>(value);
    else {
      Node<V> current = base;
      while (true) {
        if (value instanceof String && current.value instanceof String) {
          String val = (String) value;
          String currVal = (String) current.value;
          if (val.compareTo(currVal) > 0) {
            if (current.right != null) current = current.right;
            else {
              current.right = new Node<V>(value);
              break;
            }
          } else if (val.compareTo(currVal) < 0) {
            if (current.left != null) current = current.left;
            else {
              current.left = new Node<V>(value);
              break;
            }
          } else {
            break;
          }
        } else if (value instanceof Number && current.value instanceof Number) {
          double val = ((Number) value).doubleValue();
          double currVal = ((Number) current.value).doubleValue();
          if (val > currVal) {
            if (current.right != null) current = current.right;
            else {
              current.right = new Node<V>(value);
              break;
            }
          } else if (val < currVal) {
            if (current.left != null) current = current.left;
            else {
              current.left = new Node<V>(value);
              break;
            }
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }
  }
  public void inOrder(Node<V> base) {
    if (base == null) return;
    inOrder(base.left);
    System.out.print(base.value + " ");
    inOrder(base.right);
  }
  public static void main(String[] args) {
    Tree<String> test = new Tree<>();
    test.insert("a");
    test.insert("c");
    test.insert("b");
    test.insert("e");
    test.insert("d");
    test.inOrder(test.base);
  }
}
