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

; iterative
(define (fib-i n)
  (define (iter a b count)
    (if (= count 0)
        b
        (iter (+ a b) a (- count 1))))
  (iter 1 0 n))



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