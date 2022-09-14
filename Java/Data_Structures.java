
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

  public static void main(String[] args) {

  }
}