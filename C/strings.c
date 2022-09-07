#include <stdio.h>
#include <strings.h>

/**
 * @brief 
 * strings.h includes the following functions:
 *  strchr: find location of character inside string (same function as index of)
 *  strcmp: compare two strings;
 *  strstr: find location of string inside another string (array comparison function)
 *  strcpy: Copy one string to another
 *  strlen: find length of string (same as array.length)
 *  strcar: concatenate two strings (js + operator)
 */

char *strchr_example(char string[], char character) {
  char *index = strchr(string, character);
  printf("%s\n", index);
  return index;
}

int main() {
  char test[] = "hello";
  char toFind = 'l';
  strchr_example(test, toFind);
  return 0;
}