// Bring in standard library functions
// Gives access to command line arguments
use std::env;
// FromStr parses values from string, type specified in format type::from_string
use std::str::FromStr;

// Omit -> as there is no return value; (void)
fn main() {
    // Vec is a growable vector type, much like an array or list
    // NOTE a vec must be mut to push and pop from vector
    let mut numbers = Vec::new();
    // Loops through command line arguments, first arg is name of program, so skip first.
    for arg in env::args().skip(1) {
        // Parse a string to u64, if argument is valid, expect returns argument, else the error
        numbers.push(u64::from_str(&arg).expect("Error Parsing Argument"));
    }
    // check for greater than empty set
    if numbers.len() == 0 {
        eprintln!("Usage: GCD Number ...");
        std::process::exit(1);
    }
    // &operator references Vector, *operator grabs value of reference
    // This is tied to memory management, chapters 4/5
    let mut d = numbers[0];
    for m in &numbers[1..] {
        d = gcd(d, *m);
    }

    println!("The greatest common divisor of {:?} is {}", numbers, d);
}

fn gcd(mut n: u64, mut m: u64) -> u64 {
    assert!(n != 0 && m != 0);
    while m != 0 {
        if m < n {
            let t: u64 = m;
            m = n;
            n = t;
        }
        m = m % n;
    }
    n
}

#[test]
fn test_gcd() {
    assert_eq!(gcd(14, 15), 1);
    assert_eq!(gcd(2 * 3 * 5 * 11 * 17, 3 * 7 * 11 * 13 * 19), 3 * 11);
}
