
// Imports used in hackerrank, Unused are there so i'm restricted to only what website allows;
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

public class Data_Structures {
  public static List<Integer> reverseArray(List<Integer> a) {
    int middle = a.size() / 2;
    int[] temp = new int[a.size()];
    for (int i = 0; i < middle; i++) {
      temp[i] = a.get(a.size() - (i + 1));
      temp[a.size() - (i + 1)] = a.get(i);
    }
    if (a.size() % 2 != 0) {
      temp[middle] = a.get(middle);
    }
    a = Arrays.stream(temp).boxed().collect(Collectors.toList());
    temp = null;
    return a;
  }

  /**
   * Using foward finite difference
   * NOTE: Used Forums to help with answer
   * 
   * @param n       - size of queries
   * @param queries - 3 parts start, end, value
   * @return - largest value
   */
  public static long arrayManipulation(int n, List<List<Integer>> queries) {
    long[] temp = new long[n];
    for (List<Integer> query : queries) {
      int low = query.get(0) - 1;
      int high = query.get(1) - 1;
      long value = query.get(2);
      temp[low] += value;
      if (high < n - 1)
        temp[high + 1] -= value;
    }
    long maximum = temp[0];
    long sum = temp[0];
    for (int i = 1; i < n; i++) {
      sum += temp[i];
      maximum = Math.max(maximum, sum);
    }
    return maximum;

  }

  /** Singly linked list section **/
  /** Class Given by hackkerank *s */

  static class SinglyLinkedListNode {
    public int data;
    public SinglyLinkedListNode next;

    public SinglyLinkedListNode(int nodeData) {
      this.data = nodeData;
      this.next = null;
    }
  }

  static class SinglyLinkedList {
    public SinglyLinkedListNode head;
    public SinglyLinkedListNode tail;

    public SinglyLinkedList() {
      this.head = null;
      this.tail = null;
    }

    public void insertNode(int nodeData) {
      SinglyLinkedListNode node = new SinglyLinkedListNode(nodeData);

      if (this.head == null) {
        this.head = node;
      } else {
        this.tail.next = node;
      }

      this.tail = node;
    }

    /**
     * Problem 1: print linked list
     * 
     * @param head - head node of linked list
     */
    static void printLinkedList(SinglyLinkedListNode head) {
      while (head != null) {
        System.out.println(head.data);
        head = head.next;
      }
    }

    /**
     * Problem 2: append to tail of linked list
     * 
     * @param head - start of linked list
     * @param data - data to create new node at tail
     */
    static SinglyLinkedListNode insertNodeAtTail(SinglyLinkedListNode head, int data) {
      SinglyLinkedListNode node = new SinglyLinkedListNode(data);
      if (head == null) {
        head = node;
        return head;
      } else {
        SinglyLinkedListNode base = head;
        while (head.next != null) {
          head = head.next;
        }
        head.next = node;
        return base;
      }
    }

    /**
     * Problem 3: Insert node at head
     * 
     * Insert at head is much easier, as you link the remainder of the list to a newly created node
     * @param llist - remainder of linked list to append
     * @param data - data to create new node
     * @return - reference to head
     */
    static SinglyLinkedListNode insertNodeAtHead(SinglyLinkedListNode llist, int data) {
      SinglyLinkedListNode node = new SinglyLinkedListNode(data);
      node.next = llist;
      return node;
    }
  }

  public static void main(String[] args) {

  }
}