package JavaPackages;

// Imports used in hackerrank;
import java.util.*;
import java.util.stream.*;

public class LinkedList {
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

  public static class SinglyLinkedListNode {
    public int data;
    public SinglyLinkedListNode next;

    public SinglyLinkedListNode(int nodeData) {
      this.data = nodeData;
      this.next = null;
    }
  }

  public static class SinglyLinkedList {
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
     * Insert at head is much easier, as you link the remainder of the list to a
     * newly created node
     * 
     * @param llist - remainder of linked list to append
     * @param data  - data to create new node
     * @return - reference to head
     */
    static SinglyLinkedListNode insertNodeAtHead(SinglyLinkedListNode llist, int data) {
      SinglyLinkedListNode node = new SinglyLinkedListNode(data);
      node.next = llist;
      return node;
    }

    /**
     * Problem 4: Insert node at a position
     * 
     * @param llist    - given linked list
     * @param data     - new node to create with data
     * @param position - position to insert
     * @return base head reference with new list;
     */
    public static SinglyLinkedListNode insertNodeAtPosition(SinglyLinkedListNode llist, int data, int position) {
      // Write your code here
      SinglyLinkedListNode base = llist;
      SinglyLinkedListNode previous;
      SinglyLinkedListNode node = new SinglyLinkedListNode(data);
      for (int i = 0; i < position - 1; i++) {
        if (llist.next != null)
          llist = llist.next;
      }
      previous = llist;
      if (llist.next != null)
        llist = llist.next;
      previous.next = node;
      node.next = llist;
      return base;
    }

    /**
     * Problem 5: Delete a node at location
     * 
     * @param llist    - Given linked list
     * @param position - Position of node to delete
     * @return - linked list without node
     */
    public static SinglyLinkedListNode deleteNode(SinglyLinkedListNode llist, int position) {
      SinglyLinkedListNode base = llist;
      if (position == 0) {
        base = llist.next;
        return base;
      }
      for (int i = 0; i < position - 1; i++) {
        if (llist.next != null)
          llist = llist.next;
      }
      SinglyLinkedListNode previous = llist;
      if (llist.next != null)
        llist = llist.next;
      previous.next = llist.next;
      return base;
    }

    /**
     * Problem 6: Traverse List in reverse order;
     * 
     * @param llist - Linked list given
     */
    public static void reversePrint(SinglyLinkedListNode llist) {
      List<Integer> arr = new ArrayList<Integer>();
      while (llist != null) {
        arr.add(llist.data);
        llist = llist.next;
      }
      for (int i = arr.size() - 1; i >= 0; i--) {
        System.out.println(arr.get(i));
      }
    }

    /**
     * Reverse a singly linked list;
     * 
     * @param llist - original list
     * @return - reversed list;
     */
    public static SinglyLinkedListNode reverse(SinglyLinkedListNode llist) {
      // Write your code here
      List<Integer> arr = new ArrayList<Integer>();
      SinglyLinkedList reversed = new SinglyLinkedList();

      while (llist != null) {
        arr.add(llist.data);
        llist = llist.next;
      }
      for (int i = arr.size() - 1; i >= 0; i--) {
        reversed.insertNode(arr.get(i));
      }
      return reversed.head;
    }
  }

  /**
   * scan input string list to compare lists
   * line 1: number of test cases T, then format as follows;
   * line 2: size of list 1 = m;
   * line 3 -> 3+m: items in list 1;
   * line 3+m+1: size of list 2 = n;
   * line 3 + m + 2 -> 3 + m + 2 + n: items in list 2
   * repeat T times
   * 
   * output: print 1 if list 1 == list 2, or 0 if not, repeat T times
   */
  public static void fromScratch(String[] args) {
    Scanner scanner = new Scanner(System.in);
    boolean same = true;
    int counter = 0;
    int listOneLength = 0;
    int listTwoLength = 0;
    int[] listOne = new int[] {};

    while (scanner.hasNext()) {
      switch (counter) {
        case 0:
          counter++;
          scanner.nextInt();
          break;
        case 1:
          listOneLength = scanner.nextInt();
          counter++;
          break;
        case 2:
          listOne = new int[listOneLength];
          for (int i = 0; i < listOneLength; i++) {
            listOne[i] = scanner.nextInt();
          }
          counter++;
          break;
        case 3:
          listTwoLength = scanner.nextInt();
          counter++;
          break;
        case 4:
          for (int i = 0; i < listTwoLength; i++) {
            if (listOneLength == listTwoLength) {
              if (listOne[i] != scanner.nextInt())
                same = false;
            } else {
              scanner.nextInt();
            }
          }
          if (listOneLength != listTwoLength)
            same = false;
          counter = 1;
          System.out.println(same ? 1 : 0);
          same = true;
        default:
          break;
      }
    }
    scanner.close();
  }

  /**
   * Merge two lists together smallest to largest
   * 
   * format as follows:
   * T - first line, number of test cases
   * N - next line, length of first list
   * next N - the first list
   * M - next line, length of second list
   * next M - the second list
   * repeat t times
   * 
   * @param args - string array in above format all integers;
   */
  public static void mergeLists(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int stage = 0;
    int listOneLength = 0;
    int listTwoLength = 0;
    SinglyLinkedList listOne = new SinglyLinkedList();
    SinglyLinkedList listTwo = new SinglyLinkedList();
    SinglyLinkedListNode merged = null;
    while (scanner.hasNext()) {
      switch (stage) {
        case 0:
          scanner.nextInt();
          stage++;
          break;
        case 1:
          listOneLength = scanner.nextInt();
          stage++;
          break;
        case 2:
          for (int i = 0; i < listOneLength; i++) {
            listOne.insertNode(scanner.nextInt());
          }
          stage++;
          break;
        case 3:
          listTwoLength = scanner.nextInt();
          stage++;
          break;
        case 4:
          for (int i = 0; i < listTwoLength; i++) {
            listTwo.insertNode(scanner.nextInt());
          }
          merged = Helpers.mergeSort(listOne, listTwo).head;
          while (merged != null) {
            System.out.println(merged.data);
            merged = merged.next;
          }
          stage = 1;
          break;
        default:
          break;
      }
    }
    scanner.close();
  }

  public static void main(String[] args) {
  }
}