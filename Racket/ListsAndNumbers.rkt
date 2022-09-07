#lang racket
(#%provide (all-defined))
;======================================01=======================================
;((3 + 3) * 9)
;equal to 54
(define (p1-1)
  (* (+ 3 3) 9)
)

;((6 * 9) / ((4 + 2) + (4 * 3)))
;equal to 3
(define (p1-2)
  (/ (* 6 9) (+ (* 4 3) (+ 4 2)))
)

;(2* ((20 - (91 / 7)) * (45 - 42)))
;equal to 42
(define (p1-3)
 (* 2 (* (- 20 (/ 91 7)) (- 45 42)))
)
;======================================02=======================================
;write your answer as a string; you do not need to write any special escape
;characters to distinguish new lines.
(define p2
  "Maintain any parenthesis from original equation, within each parathesis, move
  the operand to the left, and keep the rest of the numbers in order. In a case where
  there are no parenthesis (2+4*8+23) make parenthesis where you can, and follow above:
  (2 + (4 * 8) + 23) --> (++ 2 (* 4 8) 23) : order of numbers maintained, all operands
  moved left with each parenthesis."
)
;======================================03=======================================
;;Write the definitions of x,y,z here:
(define x 2)
(define y 3)
(define z 4)

; Note: (define-values (x y z) (values 2 3 4)) is another one line solution

;======================================04=======================================
;you will need to have solved problem 3. The values x,y,z are not parameters
;of this function!

(define (p4)
  (if (or (< x z) (< y z))
    (if (< x y)
      (+ y z)
      (+ x z)) 
    (if (and (= x y) (= y z)) 
      (0) 
      (+ x y))))
  
; Condensed: (if (or (< x z) (< y z)) (if (< x y) (+ y z) (+ x z)) (if (and (= x y) (= y z)) (0) (+ x y)))

;======================================05=======================================
(define (p5)
  (if (or (> x z) (> y z))
    (if (> x y)
      (+ y z)
      (+ x z))
    (if (and (= x y) (= y z))
      (0)
      (+ x y))))

;======================================06=======================================
(define (p6)
  (eqv? x y)  
)

;======================================07=======================================
;same instructions as problem 02.
(define p7
  "The first declaration creates an object with value 35
  the second is a function that returns 35"
)

;======================================08=======================================
;same instructions as problem 02.
(define p8
  "A quote simply converts whatever follows it into a symbol. This doesnt work
  when the quote is used on numericals and strings. A string can be conveted
  to a symbol, but this is outside the scope of a quote.
  
  Further note, a symbol is in essence, an immutable string."
)

;======================================09=======================================
;same instructions as problem 02.
(define p9
  "A list evaluates the given arguments, whereas quote just converts to a symbol
  for example (list (+ 1 2) 2 3) produces '(3 2 3) where as '((+ 1 2) 2 3)
  produces just that: '((+ 1 2) 2 3)"
)

;======================================10=======================================
;same instructions as problem 02.
(define p10
  "A Symbol is a object representation of a string. No two similar symbols are
  distinguishable. Symbol functions are generally fast comparisons for equivalency
  whereas strings can allow more functions such as length, substring, and more."
)

;======================================11=======================================
;(4 2 6 9)
(define (p11-1)
  (list 4 2 6 9) 
)

;(spaceship
;  (name(serenity))
;  (class(firefly)))
(define (p11-2)
  (list 'spaceship (list `name (list `serenity)) (list `class (list `firefly)))  
)

;(2 * ((20 - (91 / 7)) * (45 - 42)))
(define (p11-3)
  (list `2 `* (list (list `20 `- (list `91 `/ `7)) `* (list `45 `- `42)))  
)

;======================================12=======================================
(define example '(a b c))

;(d a b c)
(define (p12-1 lst)
  (list* `d lst)
)

;(a b d a b)
(define (p12-2 lst)
  (append (remove `c lst) (list `d) (remove `c lst))
)

;(b c d a)
(define (p12-3 lst)
  (append (remove `a lst) (list `d (first lst)))
)

;======================================13=======================================
(define p13
  "eq? work as a pointer comparison, if the objects in memory are the same object
  it will return true, as stated before the uniqueness of symbols is they will 
  evaluate #t for eq? as they are object representations.
  equal? is not eq? or eqv? it can be described as an equality comparison and 
  looks at values of list objects, strings and numericals."
)

;======================================14=======================================
(define (create-error-msg sym val)
  (raise(string-append "This is a custom error message. Symbol `" (symbol->string sym) " was not paired with value " (number->string val)))
)
;======================================15=======================================
(define (check-correctness pair)
    (if (and (equal? (car pair) 'answer-to-everything) (not (= (first(cdr pair)) 42)))
      (create-error-msg 'answer-to-everything 42) 
      (and (equal? (car pair) 'answer-to-everything) (= (first(cdr pair)) 42)))
)


