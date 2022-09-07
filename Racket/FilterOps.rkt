#lang racket
(#%provide (all-defined))

#|
If there are any specific instructions for a problem, please read them carefully. Otherwise,
follow these general rules:

   - replace the 'UNIMPLEMENTED symbol with your solution
   - you are NOT allowed to change the name and the number of arguments of the pre-defined functions,
     because changing the number of arguments automatically changes the semantics of the 
     function. Changing the name of the arguments is permitted since that change only
     affects the readability of the function, not the semantics.
   - you may write any number of helper functions as you want.
|#
;======================================01=======================================
(define (foldl-local op default-el lst)
  (if (null? lst)
      default-el
      (op (last lst) (foldl-local op default-el (reverse(cdr (reverse lst))))))
)
;---

(define (foldr-local op default-el lst)
  (if (null? lst)
      default-el
      (op (car lst) (foldr-local op default-el (cdr lst))))
)

;======================================02=======================================
(define (andmap-local test-op lst)
  (foldl (λ (x y) (and (test-op x) y)) #t lst)
)

;======================================03=======================================
(define (filter-local test-op lst)
   (foldr (λ (x y) (if (test-op x) (cons x y) y)) `() lst)
)

;======================================04=======================================
(define (map-reduce m-op r-op default-el lst)
  (foldl r-op default-el (map m-op lst))
)

;======================================05=======================================
(define (series n)
   (foldl + 0 (map (λ (x) (/ (expt #i-1 x) (foldl * 1 (range 1 (+ x 2))))) (range n)))
)

;======================================06=======================================
(define (zip lst1 lst2)
  (if (null? lst1)
      `()
      (cons (list (car lst1) (car lst2)) (zip (cdr lst1) (cdr lst2))))
)

;======================================07=======================================
(define (matrix-to-vector op mat)
  (apply map op mat)
)



