package Hackerrank;
import java.util.List;

import Hackerrank.LinkedList.SinglyLinkedList;

// Separation of any and all helper functions created for hackerrank problems
public class Helpers {
    /**
   * Helper function created for climbing leaderboard
   * @param toSearch - an array to search, must be sorted with no duplicates
   * @param toFind - a number to find
   * @param currentIndex - index to track to send back
   * @return index of where number would be, or be between.
   */
  public static int binarySearch(List<Integer> toSearch, int toFind, int currentIndex) {
    int middle = (int) Math.floor(toSearch.size() / 2);

    if (toSearch.size() < 2) {
      if (toSearch.get(0) > toFind)
        return currentIndex + 2;
      if (toSearch.get(0) < toFind)
        return currentIndex;
      return currentIndex + 1;
    }

    int newIndex;
    if (toSearch.get(middle) > toFind) {
      newIndex = currentIndex == 0 ? middle : currentIndex + middle;
      return binarySearch(toSearch.subList(middle, toSearch.size()), toFind, newIndex);
    } else if (toSearch.get(middle) < toFind) {
      newIndex = currentIndex;
      return binarySearch(toSearch.subList(0, middle), toFind, newIndex);
    } else {
      return currentIndex + middle + 1;
    }
  };

  public static SinglyLinkedList mergeSort(SinglyLinkedList listOne, SinglyLinkedList listTwo) {
    SinglyLinkedList mergedList = new SinglyLinkedList();
    
    while (listOne.head != null && listTwo.head != null) {
      if(listOne.head.data < listTwo.head.data) {
        mergedList.insertNode(listOne.head.data);
        listOne.head = listOne.head.next;
      } else {
        mergedList.insertNode(listTwo.head.data);
        listTwo.head = listTwo.head.next;
      }
    }
    while(listOne.head != null) {
      mergedList.insertNode(listOne.head.data);
      listOne.head = listOne.head.next;
    }
    while(listTwo.head != null) {
      mergedList.insertNode(listTwo.head.data);
      listTwo.head = listTwo.head.next;
    }
    return mergedList;
  }
}
