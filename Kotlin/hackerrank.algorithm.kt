// Hackerrank Problem 1: n: number of seats m: distance of travel s: starting position
// Starting at position s, calculate the ending position with a looping structure of
// length n, and a distance traveled of m
fun saveThePrisoner(n: Int, m: Int, s: Int): Int {
  val position = ((s + m - 1) % n)
  return if (position == 0) n else position
}

fun main() {}
