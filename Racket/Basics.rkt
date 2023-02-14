#lang racket

; Basic definitions
(define (test x y z)
  (-
   (+ y x)
   z)
)

; Conditionals

; switch statement
(define (abs x)
  (cond
    ((> x 0) x)
    ((= x 0) x)
    ((< x 0) (- x)))
 )

; switch with break
(define (abs2 x)
  (cond
    ((< x 0) (- x))
    (else x)))

; if else
(define (abs3 x)
  (if
   (< x 0)
   (- x)
   x))

; and/or/not statements
(define (>= x y)
  (or
   (> x y)
   (= x y)))

(define (<= x y)
  (not
   (> x y)))

; --------------------------- Start Practice problems ---------------------------

; Practice prefix notation
; translate (4 + 5 + (2 - (3 - (6 + (4 / 5))))) / (3 * (6 - 2) * (2 - 7))
; answer: (/ (+ 5 4 (- 2 (- 3 (+ 6 (/ 4 5)))))(* 3 (- 6 2) (- 2 7)))

; Define a procedure that takes three numbers as arguments and returns the sum of the squares of the two larger numbers.
(define (square x)
  (* x x))
(define (sum-of-squares x y)
  (+ (square x)(square y)))
(define (sum-of-squares-highest x y z)
 (if
  (< x y)
  (if
   (< x z)
   (sum-of-squares y z)
   (sum-of-squares y x))
  (if
   (< y z)
   (sum-of-squares x z)
   (sum-of-squares x y))))

; create a function a + abs(b)
(define (a-plus-abs-b a b)
  ((if (< b 0) - +) a b))

; --------------------------- End Practice problems ---------------------------

; Newtons successive approximations, finding the square root of a number
; note average ((x/y) + y) / 2;
(define (sqrt-iter guess x)
  (if (good-enough? guess x)
      guess
      (sqrt-iter (improve guess x) x)))
(define (improve guess x)
  (average guess (/ x guess)))
(define (average x y)
  (/ (+ x y) 2))
(define (good-enough? guess x)
  (< (abs (- (square guess) x)) .001))
(define (sqrt2 x)
  (sqrt-iter 1 x))


; Exercise, create the function for Newtons cube root given:
; ((x / (y * y)) + 2y) / 3 : as the approximation
(define (cube-iter guess x)
  (if (good-enough-cube? guess x)
      guess
      (cube-iter (improve-cube guess x) x)))
(define (improve-cube guess x)
  (/ (+ (/ x (square guess)) (* guess 2)) 3))
(define (good-enough-cube? guess x)
  (< (abs (- (* guess guess guess) x)) .001))
(define (cbrt2 x)
  (cube-iter 6 x))

; Refactor sqrt to be in lexical scoping
(define (sqrt x)
  (define (sqrt-iter guess)
    (if (good-enough? guess)
        guess
        (sqrt-iter (improve guess))))
  (define (good-enough? guess)
    (< (abs (- (square guess) x)) .001))
  (define (abs a)
    (if (< a 0)
        (- a)
        a))
  (define (square a)
    (* a a))
  (define (improve guess)
    (average guess (/ x guess)))
  (define (average a b)
    (/ (+ a b) 2))
  (sqrt-iter 1))

; Refactor cube-rute in lexical scoping
(define (cbrt x)
  (define (cbrt-iter guess)
    (if (good-enough? guess)
        guess
        (cbrt-iter (improve guess))))
  (define (good-enough? guess)
    (< (abs (- (cube guess) x)) .001))
  (define (abs a)
    (if (< a 0)
        (- a)
        a))
  (define (cube a)
    (* a a a))
  (define (improve guess)
    (/ (+ (/ x (square guess)) (* guess 2)) 3))
  (cbrt-iter 1))

; write by recursion and iteration: fn = n < 3 ? n : f(n-1) + 2f(n-2) + 3f(n-3)

; Recurive:
(define (f-r n)
  (if
   (< n 3)
   n
   (+
    (f-r(- n 1))
    (*
     (f-r(- n 2))
     2)
    (*
     (f-r(- n 3))
     3))))

; Iteration Revisit, oddly enough dont understand this concept right now
; Notes on iteration, keep an accumulator and add to its value, much like a map-reduction algorithm,
; This particular problem was much simplier in recursion though

; recursive practice

; recursive checking less than 2 other than for error evasion
(define (fact-r n)
  (if
   (< n 2)
   1
   (* n (fact-r (- n 1)))))

; iterative
(define (fact-i n)
  (define (iter product counter max)
    (if
     (> counter max)
     product
     (iter (* counter product)
                (+ counter 1)
                max)))
  (iter 1 1 n))

; recurive
(define (fib-r n)
  (cond
   ((= n 0) 0)
   ((= n 1) 1)
   (else
   (+
    (fib-r (- n 1))
    (fib-r (- n 2))))))

; iterative (O(n))
(define (fib-i n)
  (define (iter a b count)
    (if (= count 0)
        b
        (iter (+ a b) a (- count 1))))
  (iter 1 0 n))

; iterative (O(logn))
(define (fib-i-l n)
  (define (iter a b p q count)
    (cond
      ((= count 0) b)
      ((even? count)
       ; computer p q
       (iter a b p q (/ count 2)))
      (else
       (iter
        (+ (* b q) (* a q) (* a p))
        (+ (* b p) (* a q))
        p
        q
        (- count 1)))))
  (define (even? count)
    (= (remainder count 2) 0))
  (iter 1 0 0 1 n))

; recursion
(define (exp-r b n)
  (if
   (= 0 n)
   1
   (* b (exp-r b (- n 1)))))

; iterative
(define (exp-i b n)
  (define (iter b counter product)
    (if
     (= counter 0)
     product
     (iter b
           (- counter 1)
           (* b product))))
  (iter b n 1))

; fast exp
(define (fast-exp b n)
  (define (square x)
    (* x x))
  (define (even? x)
    (= (remainder x 2) 0))
  (cond
    ((= n 0) 1)
    ((even? n) (square (fast-exp b (/ n 2))))
    (else (* b (fast-exp b (- n 1))))))

; Exercise: using operations double and half, design a multiplcation procedure analogous to fast-exp O(logn)

; linear
(define (multi a b)
  (if
   (= b 0)
   0
   (+ a (multi a (- b 1)))))

; logn
(define (multi-l a b)
  (define (double x)
    (* x 2))
  (define (half x)
    (if
     (= (remainder x 2) 0)
     (/ x 2)
     x))
  (cond
    ((= b 0) 0)
    ((= (remainder b 2) 0) (multi-l (double a) (half b)))
    (else (+ a (multi-l a (- b 1))))))

; Euclid's Algorithm
(define (gcd a b)
  (if
   (= b 0)
   a
   (gcd b (remainder a b))))

; Smallest divisor to test for primality
(define (prime? n)
  ; Smallest Divisor
  (define (smallest-divisor n)
    (define (find-divisor n test-divisor)
      (cond
        ((> (square test-divisor) n) n)
        ((divides? test-divisor n) test-divisor)
        (else (find-divisor n (+ test-divisor 1)))))
    (define (divides? a b) (= (remainder b a) 0))
    (define (square a)
      (* a a))
    (find-divisor n 2))
  ; Use for prime testing
  (= n (smallest-divisor n)))

; The Fermat Test, if n is a prime number and a is any positive integer less than n
; then a raised to n is congruent to a mod n
; used to test primality: given n, pick a < n, and compute a^n mod n, if != a
; then n is not prime, if its a, pick another number try again, each time with
; more confidence of n's primality
(define (fast-prime? n times)
  (define (fermat-test n)
    (try-it (+ 1 (random (- n 1)))))
  (define (try-it a)
    (= (expmod a n n) a))
  (define (expmod base exp m)
    (cond
      ((= exp 0) 1)
      ((even? exp)
       (remainder
        (square (expmod base (/ exp 2) m)) m))
      (else
       (remainder
        (* base (expmod base (- exp 1) m)) m))))
  (define (even? x)
    (= (remainder x 2) 0))
  (define (square x)
    (* x x))
  (cond
    ((= times 0) true)
    ((fermat-test n) (fast-prime? n (- times 1)))
    (else false)))

(define (timed-prime-test n)
  (define (start-prime-test n start-time)
    (if (fast-prime? n (- n 1))
      (report-prime (- (current-milliseconds) start-time) n)
      false))
  (define (report-prime elapsed-time n)
    (display " *** ")
    (display elapsed-time)
    (newline)
    (display "Prime: ")
    (display (smallest-divisor n))
    true)
  (newline)
  (display n)
  (start-prime-test n (current-milliseconds)))

(define (find-3-prime n)
  (define (iter i x)
    (when (< i 3)
        (if (timed-prime-test x)
              (incr (+ i 1) x)
              (incr i x))))
  (define (incr i x)
    (if (even? x)
        (iter i (+ x 1))
        (iter i (+ x 2))))
  (define (even? x)
    (= (remainder x 2) 0))
  (iter 0 n))

(define (smallest-divisor n)
  (define (find-divisor n test-divisor)
    (cond
      ((> (square test-divisor) n) n)
      ((divides? test-divisor n) test-divisor)
      (else (find-divisor n (next test-divisor)))))
  (define (divides? a b) (= (remainder b a) 0))
  (define (square a)
    (* a a))
  (define (next a)
    (if
     (= a 2)
     3
     (+ a 2)))
  (find-divisor n 2))

; abstracting functions as parameters

; Generic Constructor function, a function that produces a function
(define (sum term a next b)
  (if (> a b)
      0
      (+ (term a)
         (sum term (next a) next b))))

; use constructor to make a sum cube function
(define (sum-cubes a b)
  (define (cube n)
    (* n n n))
  (define (inc n) (+ n 1))
  (sum cube a inc b))

; sum integer function
(define (sum-integers a b)
  (define (identity x) x)
  (define (inc n) (+ n 1))
  (sum identity a inc b))

; pi sum
(define (pi-sum a b)
  (define (pi-term x)
    (/ 1.0 (* x (+ x 2))))
  (define (pi-next x)
    (+ x 4))
  (sum pi-term a pi-next b))

; integration base
(define (integral f a b dx)
  (define (add-dx x)
    (+ x dx))
    (* (sum f (+ a (/ dx 2.0)) add-dx b) dx))

; Simpson's rule
; approximation of integral by: h/3(y_0 + 4y_1 + 2y_2 + ... , + y_n) (4 odd, 2 even, 1 for n)
; h = (b - a) / n and y(k) = f(a + kh)

(define (s-integral f a b n)
  (define (h)
    (/ (- b a) n))
  (define (even? x)
    (= (remainder x 2) 0))
  (define (mult x)
    (cond
      ((= 0 x) (f (calc x)))
      ((= n x) (f (calc x)))
      ((even? x) (* 2 (f (calc x))))
      (else (* 4 (f (calc x))))))
  (define (calc x)
    (+ a (* x (h))))
  (define (inc x)
    (+ x 1))
  (* (/ (h) 3) (sum mult 0 inc n)))

; test integration from 0 to 2 of (4x^2 + 1) (2x - 3)
; should be -2
(define (test-integral x)
  (define (square x)
    (* x x))
  (* (+ (* 4 (square x)) 1) (- (* 2 x) 3)))

; displays -2, works!
; (s-integral test-integral 0 2 100)

; Implement an iterative version of the sum function
(define (sum-i term a next b)
  (define (iter a result)
    (if
     (> a b)
     result
     (iter (next a) (+ result (term a)))))
  (iter a 0))

; Test variables
(define testList `(1 2 3 4))
; End test variables


; Function notes 
(define (cubicList lst) (map (λ (x) (* x x x)) lst))

(define (mapFunctions pred)
  (λ (x y) (map pred x y)))

; example of mapFunctions
(define addMap (mapFunctions +))
(define multiMap (mapFunctions *))
(define tripleMultiMap (mapFunctions (λ (x y) (* (* x y) 3))))
;end of mapFunctions

;foldl applies from left to right, an operation with default value a, to list (range b = 0->b)
(define (foldTests op a b)
  (foldl op a (range b)))

; Revised Op-op-between, more versitle
(define (op-op-between op1 default op2)
  (λ (lower upper) (foldl op1 default (map op2 (range lower (+ upper 1))))))
(define cubicAdd (op-op-between + 0 (λ (x) (* x x x))))
(define cubicMulti (op-op-between * 1 (λ (x) (* x x x))))
; end op-op function

; Avoiding recursion
;(define (fact n)
  ;(foldl * 1 (range 1 (+ n 1))))

#|
Recall previously, factorial was as follows:

(define (fact n)
  (if (= n 0)
    1
    (* n (fact (- n 1)))))

Now we avoid taking up space with mutiple function calls, and save memory space
Every call to a recursive function, saves that value in some space. Fact n would take n space.
However, no values are saved in the foldl statement, mearly a multiplication and reduction of an array

Activation record -> where recursive calls store their return values
|#

; End function notes

; Function tests
; End function tests