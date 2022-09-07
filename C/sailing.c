// Reminder: command to run: gcc {filename}.c -o {name of executable}
// This compiles the file to an exe. 
// which can then be run in terminal by just typing its name

#include <stdio.h>

void go_south_east(int* lat, int* lon) {
  *lat = *lat - 1;
  *lon = *lon + 1;
}

void pointer_practice() {
  int x = 4;
  printf("value of x: %i\n", x);
  int *address_of_x = &x;
  printf("address of x: %p\n", &x);
  int val_stored = *address_of_x;
  *address_of_x = 99;
  printf("value of x: %i\n", x);
}

int main () {
  pointer_practice();

  return 0;
}