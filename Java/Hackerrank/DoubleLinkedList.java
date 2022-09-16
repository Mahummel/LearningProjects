package Hackerrank;

import java.io.BufferedWriter;
import java.io.IOException;

/**
 * Class provided by Hackkerank for problems
 */
public class DoubleLinkedList {
  static class DoublyLinkedListNode {
    public int data;
    public DoublyLinkedListNode next;
    public DoublyLinkedListNode prev;

    public DoublyLinkedListNode(int nodeData) {
      this.data = nodeData;
      this.next = null;
      this.prev = null;
    }
  }

  static class DoublyLinkedList {
    public DoublyLinkedListNode head;
    public DoublyLinkedListNode tail;

    public DoublyLinkedList() {
      this.head = null;
      this.tail = null;
    }

    public void insertNode(int nodeData) {
      DoublyLinkedListNode node = new DoublyLinkedListNode(nodeData);

      if (this.head == null) {
        this.head = node;
      } else {
        this.tail.next = node;
        node.prev = this.tail;
      }

      this.tail = node;
    }
  }

  public static void printDoublyLinkedList(DoublyLinkedListNode node, String sep, BufferedWriter bufferedWriter)
      throws IOException {
    while (node != null) {
      bufferedWriter.write(String.valueOf(node.data));

      node = node.next;

      if (node != null) {
        bufferedWriter.write(sep);
      }
    }
  }

  /**
   * Insert data at proper location between two points of doubly linked list.
   * SOLUTION TAKEN FROM DISCUSSION FORUMS No credit.
   * 
   * @param llist - linked list provided
   * @param data  - data to create new node with
   * @return - head of llist
   */
  public static DoublyLinkedListNode sortedInsert(DoublyLinkedListNode llist, int data) {
    DoublyLinkedListNode curr = llist;
    DoublyLinkedListNode newNode = new DoublyLinkedListNode(data);

    if (curr.data > data) {
      newNode.next = curr;
      return newNode;
    }

    while (curr.next != null && curr.data < data) {
      curr = curr.next;
    }

    if (curr.next == null && data > curr.data) {
      curr.next = newNode;
      newNode.prev = curr;
    } else {
      newNode.next = curr;
      newNode.prev = curr.prev;
      curr.prev.next = newNode;
      curr.prev = newNode;
    }

    return llist;
  }

  /**
   * Reverse the doubly linked list
   * 
   * @param llist - list to reverse
   * @return - head of newly reversed linked list
   */
  public static DoublyLinkedListNode reverse(DoublyLinkedListNode llist) {
    DoublyLinkedListNode curr = llist;
    DoublyLinkedListNode previous = null;
    while (curr != null) {
      DoublyLinkedListNode next = curr.next;
      curr.next = previous;
      previous = curr;
      curr = next;
    }
    return previous;
  }
}
