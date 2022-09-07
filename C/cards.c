/**
 * @file cards.c
 * @author Michael Hummel
 * @brief Program to evaluate face values of cards
 * @version 0.1
 * @date 2022-08-24
 * 
 * @copyright Copyright (c) 2022
 */

#include <stdio.h>
#include <stdlib.h>

int main() {
  char card_name[3];
  int count = 0;
  while (card_name[0] != 'X') {
    puts("Enter the card_name: ");
    scanf("%2s", card_name);
    int val = 0;
    switch (card_name[0]) {
      case 'K':
      case 'Q':
      case 'J':
        val = 10;
        break;
      case 'A':
        val = 11;
        break;
      case 'X':
        continue;
      default:
        val = atoi(card_name);
        if (val < 1 || val > 10) {
          puts("Invalid range");
          continue;
        }
        break;
    }
    if(val > 2 && val < 7) 
      count++;
    else if (val == 10 || val == 11)
      count--;
    printf("Current count: %i\n", count);
  }
  printf("count is stored at: %p\n", &count);
  return 0;
}