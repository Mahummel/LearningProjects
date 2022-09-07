// To Compile please run: gcc {{name}}.c -o {{name}};
// What was learned:
/**
 * Arrays start at index 0 because thats where the pointer starts for memory,
 * the next n parts in the array are stored at the starting index plus n!
 * 
 * Note: *variables (pointers) have different types because they take up
 * different amounts of memory; so when doing int *something; *something + 1,
 * because an int takes up for bytes, the address wont increment by 1, but by 4.
 * if you have char *something; *something + 1, the address will increment by 1,
 * because a char takes up 1 byte.
 * 
 * Note: Size of function is different for pointers, and is the size 4/8 on 16/32 bit systems.
 * 
 * Note: Strings cannot be mutated if declared as a pointer. ex: char *cards = "jqk" is not mutable
 * Strings can be mutated if denoted as an array; ex: char cards[4] = "jqk"; 
 * (remember string + 1 for end character)
 * a string literal (*cards) is a constant and is loaded into a separate memory section that is read only
 * the variable, is then just a pointer to this constant.
 */

#include <stdio.h>

// void msg_size(char msg[]) {
//   printf("Message reads: %s\n", msg);
//   printf("msg sent occupies %i bytes\n", sizeof(msg));
//   char test[5] = "test";
//   printf("Test message of length 5: %s\n", test);
//   printf("Test message occupies %i bytes\n", sizeof(test));
// }

void testing() {
  int drinks[] = {4,2,3};
  printf("1st order: %i drinks\n", drinks[2]);
  printf("1st order: %i drinks\n", *(drinks + 2));
}

void skip(char *msg) {
  puts(msg + 5);
}

void scanning() {
  int age;
  printf("Enter your age: ");
  scanf("%i", &age);
  printf("Age entered: %i\n", age);
}

int main() {
  scanning();
  return 0;
}

