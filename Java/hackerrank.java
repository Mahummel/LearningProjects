
// Imports used in hackerrank;
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

class Result {

  /*
   * Complete the 'breakingRecords' function below.
   *
   * The function is expected to return an INTEGER_ARRAY.
   * The function accepts INTEGER_ARRAY scores as parameter.
   * 
   * EXPLANATION: take an array of scores, and talley the number of record breaks
   * for minimum and maximums
   * arr[0] = max, arr[1] = min
   */

  public static List<Integer> breakingRecords(List<Integer> scores) {
    // Write your code here

    List<Integer> result = new ArrayList<>();
    if (scores.size() <= 1) {
      result.add(0);
      result.add(0);
      return result;
    }

    int max = scores.get(0);
    int min = scores.get(0);
    int maxCount = 0;
    int minCount = 0;

    for (int i = 1; i < scores.size(); i++) {
      if (scores.get(i) < min) {
        min = scores.get(i);
        minCount++;
      }
      if (scores.get(i) > max) {
        max = scores.get(i);
        maxCount++;
      }
    }

    result.add(maxCount);
    result.add(minCount);

    return result;
  }

  /*
   * Complete the 'birthday' function below.
   *
   * The function is expected to return an INTEGER.
   * The function accepts following parameters:
   * 1. INTEGER_ARRAY s
   * 2. INTEGER d
   * 3. INTEGER m
   * 
   * EXPLANATION:
   * s = [2,2,1,3,2]
   * d = 4,
   * m = 2
   * 
   * Lily wants to find segments summing to Ron's birth day, d = 4
   * with a length equalling his birth month m = 2,
   * In this case, there are two segments meeting her criteria: [2,2] and [1,3].
   */

  public static int birthday(List<Integer> s, int d, int m) {
    // Write your code here
    int result = 0;

    for (int i = 0; i <= s.size() - m; i++) {
      List<Integer> list = s.subList(i, m + i);
      int sum = list.stream().reduce(0, (a, b) -> a + b);
      if (sum == d)
        result++;
    }

    return result;

  }

  /*
   * Complete the 'divisibleSumPairs' function below.
   *
   * The function is expected to return an INTEGER.
   * The function accepts following parameters:
   * 1. INTEGER n
   * 2. INTEGER k
   * 3. INTEGER_ARRAY ar
   * 
   * Given an array of integers and a positive integer k,
   * determine the number of (i,j) pairs where i < j and ar[i] + ar[j] is
   * divisible by k.
   */

  public static int divisibleSumPairs(int n, int k, List<Integer> ar) {
    // Write your code here
    int result = 0;
    for (int i = 0; i < ar.size() - 1; i++) {
      int first = ar.get(i);
      for (int j = i + 1; j < ar.size(); j++) {
        int second = ar.get(j);
        if ((first + second) % k == 0)
          result++;
      }
    }
    return result;
  }

  /*
   * Complete the 'migratoryBirds' function below.
   *
   * The function is expected to return an INTEGER.
   * The function accepts INTEGER_ARRAY arr as parameter.
   * Given an array of bird sightings where every element represents
   * a bird type id, determine the id of the most frequently sighted type.
   * If more than 1 type has been spotted that maximum amount, return the smallest
   * of their ids.
   */

  public static int migratoryBirds(List<Integer> arr) {
    // Write your code here
    double id = Double.POSITIVE_INFINITY;
    int count = 0;

    int[] dict = new int[arr.size()];

    for (int i = 0; i < arr.size(); i++) {
      dict[arr.get(i)]++;
      if (dict[arr.get(i)] > count ||
          (dict[arr.get(i)] == count && arr.get(i) < id)) {
        id = arr.get(i);
        count = dict[arr.get(i)];
      }
    }

    return (int) id;
  }

  public static String dayOfProgrammer(int year) {
    // Write your code here
    String result = "";
    final int DOTP = 256;
    boolean isLeapYear = year < 1918 ? (year % 4 == 0) : (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0));
    int[] months = new int[] { 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
    if (year == 1918) {
      months[1] = 15;
    } else if (isLeapYear) {
      months[1] = 29;
    } else {
      months[1] = 28;
    }
    int sum = 0;
    int month = 0;
    for (int i = 0; i < months.length; i++) {
      if (sum + months[i] > 256) {
        month = i + 1;
        break;
      } else {
        sum = sum + months[i];
      }
    }
    int day = DOTP - sum;
    result = ((day < 10 ? "0" + day : day) + "." + (month < 10 ? "0" + month : month) + "." + year);
    return result;
  }

  /**
   * Aassume the bill has the following prices: bill = [2,4,6].
   * Anna declines to eat item k = bill[2] which costs 6.
   * If Brian calculates the bill correctly, Anna will pay (2+4)/2 = 3. (return
   * "Bon Appetit")
   * If he includes the cost of bill[2],
   * he will calculate (2+4+6)/2 = 6.
   * In the second case, he should refund 3 to Anna (return 3)
   * 
   * Print Bon Appetit if bill is fairly split, or money owed.
   * 
   * @param bill array of ints, cost of each item
   * @param k    integer on 0 based index of item anna doesnt eat
   * @param b    amount of money ANNA contributed to bill
   */
  public static void bonAppetit(List<Integer> bill, int k, int b) {
    bill.remove(k);
    int cost = bill.stream().reduce(0, (a1, a2) -> a1 + a2) / 2;
    System.out.println(b - cost == 0 ? "Bon Appetit" : Math.abs(b - cost));
  }

  /**
   * Given an array of numbers, find the number of pairs in the array, and return
   * 
   * @param n  - size of array
   * @param ar - an array of sock colors
   * @return - number of pairs of socks
   */
  public static int sockMerchant(int n, List<Integer> ar) {
    int sum = 0;
    Map<Integer, Integer> map = new HashMap<Integer, Integer>();
    for (int sock : ar) {
      map.merge(sock, 1, Integer::sum);
    }
    for (int item : map.keySet()) {
      sum += Math.floor(map.get(item) / 2);
    }
    return sum;
  }

  /**
   * first and last page are on their own, all others will have 2 per page.
   * 
   * @param n length of book
   * @param p page to turn to
   * @return minumum number of pages turned
   */
  public static int pageCount(int n, int p) {
    boolean start = n - p >= p;
    int pagesToTurn = 0;
    if (start) {
      pagesToTurn = p / 2;
    } else {
      if (n % 2 == 0 && n != p) {
        pagesToTurn = (((n - 1) - p) / 2) + 1;
      } else {
        pagesToTurn = ((n - p) / 2);
      }
    }
    return pagesToTurn;
  }

  /**
   * 
   * @param steps number of steps in path
   * @param path  path of UD characters that indicate direction
   * @return number of valleys entered (level < 0);
   */
  public static int countingValleys(int steps, String path) {
    int level = 0;
    int valleys = 0;
    boolean inValley = false;
    for (int i = 0; i < path.length(); i++) {
      if (path.charAt(i) == 'U')
        level++;
      else
        level--;
      if (!inValley && level < 0) {
        valleys++;
        inValley = true;
      } else if (level >= 0) {
        inValley = false;
      }
    }

    return valleys;
  }

  /**
   * Given a list of keyboards and drives, find a price that maximizes budget (b)
   * use.
   * return -1 if no combo is within budget
   * 
   * @param keyboards list of keyboard prices
   * @param drives    list of drive prices
   * @param b         - budget
   * @return
   */
  static int getMoneySpent(int[] keyboards, int[] drives, int b) {
    int total = 0;
    for (int price : keyboards) {
      for (int price2 : drives) {
        if (price + price2 < b && price + price2 > total)
          total = price + price2;
      }
    }
    return total != 0 ? -1 : total;
  }

  /**
   * Movement is 1 at a time.
   * 
   * @param x - cat a position
   * @param y - cat b position
   * @param z - mouse position
   * @return "Cat A" | "Cat B" | "Mouse C"
   */
  static String catAndMouse(int x, int y, int z) {
    int movesA = Math.abs(x - z);
    int movesB = Math.abs(y - z);
    if (movesA == movesB)
      return "Mouse C";
    else if (movesA > movesB)
      return "Cat B";
    return "Cat A";
  }


  /**
   * Definition of magic square: 
   *  n x n matrix of distinct positive integers from 1 to n^2, where the sum of 
   *  any row, column, or diagonal of length n is always equal to the same number;
   * 
   *  Solution combinations solved by hand, (all are rotation/symmetric transformation of first combination)
   * 
   * @param s 3x3 matrix of DISTINCT numbers [1-9];
   * @return
   */
  public static int formingMagicSquare(List<List<Integer>> s) {
    int[][] solutionCombinations = {
      {2,7,6,9,5,1,4,3,8}, 
      {4,9,2,3,5,7,8,1,6}, 
      {8,3,4,1,5,9,6,7,2}, 
      {6,1,8,7,5,3,2,9,4}, 
      {6,7,2,1,5,9,8,3,4}, 
      {2,9,4,7,5,3,6,1,8}, 
      {4,3,8,9,5,1,2,7,6}, 
      {8,1,6,3,5,7,4,9,2}
    };

    Integer minError = null;
    for(int[] solution: solutionCombinations) {
      int sum = 0;
      for (int i = 0; i < s.size(); i++) {
        for (int j = 0; j < s.size(); j++) {
          System.out.println(solution[((i * 3) + j)]);
          sum += Math.abs(solution[((i * 3) + j)] - s.get(i).get(j));
        }
      }
      if (minError == null) minError = sum;
      if (sum < minError) minError = sum;
    }
    
    return minError;
  }

}
