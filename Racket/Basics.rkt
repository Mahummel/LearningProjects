#lang racket
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
(define (fact n)
  (foldl * 1 (range 1 (+ n 1))))

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