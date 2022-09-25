// Hackerrank Problem 1: n: number of seats m: distance of travel s: starting position
// Starting at position s, calculate the ending position with a looping structure of
// length n, and a distance traveled of m
fun saveThePrisoner(n: Int, m: Int, s: Int): Int {
  val position = ((s + m - 1) % n)
  return if (position == 0) n else position
}

// Hackerrank Problem 2: a: array to manipulate, k: number of rotations, queries: indicies to report
// position
// Find position of each index in the queries list after k rotations on array a.
fun circularArrayRotation(a: Array<Int>, k: Int, queries: Array<Int>): Array<Int> {
  val rev :Array<Int> = a.copyOfRange(k, a.size)
  rev.reverse();
  val arr = rev + a.copyOfRange(0, k)
  val ret = Array<Int>(queries.size) { _ -> 0 }
  for(i in 0..queries.size - 1) {
    val index = queries[i]
    ret[i] = arr.get(index);
  }
  return ret;
}

fun main() {}
