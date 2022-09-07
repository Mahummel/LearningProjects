#lang racket
(#%provide (all-defined))

#|
IMPORTANT:
Overall, you are allowed to change this file in any way that does *not* affect the
compilation of the file. If there are any specific instructions for a problem, please read them carefully. Otherwise,
follow these general rules:

   - replace the 'UNIMPLEMENTED symbol with your solution
   - you are NOT allowed to change the name of the function and the number of arguments of
     the pre-defined functions, because changing the number of arguments automatically changes
     the semantics of the function. Changing the name of the arguments is permitted since that
     change only affects the readability of the function, not the semantics.
   - you may write any number of helper functions

If you cannot come up with a correct solution then please make the answer-sheet
compile. If you have partial solutions that do not compile please comment them out,
if this is the case, the default definitions will have to be present since the tests
will be expecting functions with the names defined here.

Submission guidelines:
   - please rename the file to hw04-yourlastname-answer.rkt prior to submission
   - only the renamed file file needs to be uploaded
|#

;======================================01=======================================
#|
<step> ::=  <step>  <step>       "seq-step"
          | "up" number          "up-step"
          | "down" number        "down-step"
          | "left" number        "left-step"
          | "right" number       "right-step"
|#
;example of how to create the error message for the "up-step" constructor
;> (invalid-args-msg "up-step" "number?" '(1 2 3 4))
;where '(1 2 3 4) should be replaced by the actual violating value.

;;you can reorder the functions below if it better suits your needs
(define (up-step n)
  (list 0 n)  
)

(define (down-step n)
  (list 0 (- 0 n)) 
)

(define (left-step n)
  (list (- 0 n) 0) 
)

(define (right-step n)
  (list n 0)  
)

(define (seq-step st-1 st-2)
  (if (and (step? st-1) (step? st-2))
      (list st-1 st-2)
      (raise (string-append "Invalid Data Type: Expected Type <step>"))))  


;;====
(define (up-step? st)
  (and (equal? 0 (car st))(< 0 (cadr st))))

(define (down-step? st)
  (and (equal? 0 (car st))(> 0 (cadr st)))) 


(define (left-step? st)
  (and (> 0 (car st))(equal? 0 (cadr st))))  


(define (right-step? st)
  (and (< 0 (car st))(equal? 0 (cadr st))))   


(define (seq-step? st)
  (and (list? (car st))(andmap step? st)))


;This is a predicate that tells you whether or not something is a step,
;it should return true when given either up, down, left, right or seq steps.
(define (step? st)
  (cond
    [(list? (car st)) (seq-step? st)]
    [else (or(right-step? st)(left-step? st)(up-step? st)(down-step? st))]
  )
)

;; to avoid needless duplication we will only implement one extractor to handle all the
;; simple steps, rather than four of them. 
;; So this should take: up, down, left and right steps.
(define (single-step->n st)
  (if (and (step? st) (equal? 0 (car st)))
    (cadr st)
    (car st)
  )
)


;;two extractors, one for each piece of data representing a sequential step
(define (seq-step->st-1 st)
 (car st)
)
(define (seq-step->st-2 st)
  (cadr st)
)



;start-p is a pair containing coordinates
;;===================================
(define (value-of step start-p )
  (cond
    [(seq-step? step) (value-of (seq-step->st-2 step) (value-of (seq-step->st-1 step) start-p))]
    [(step? step) (map + step start-p)]
    [else (raise "Invalid type entered, require type <step>")]
  )
)

;(display (value-of  (seq-step (up-step 50)(seq-step (left-step 20) (right-step 40)))'(0 0)))

;======================================02=======================================

;we assume that the sets can contain only numbers between 0 and bound
(define bound 100)


;singleton-set take a number as input and returns a function that takes a number as an input and
;tells whether or not that number is in the set. This function creates a set with just one number x
(define (singleton-set x)
  'UNIMPLEMENTED)
 


;(define singleton1 (singleton-set 1))
;(define singleton2 (singleton-set 2))
;(display (singleton1 0))(display " ")
;(display (singleton1 1))(display " ")
;(display (singleton2 2))(display " ")
;(display (singleton2 1))(display " ")
;(newline)

;the set of all elements that are in either 's1' or 's2'
(define (union s1 s2)
  'UNIMPLEMENTED
  )

;(define u12 (union singleton1 singleton2))
;(display (u12 1))(display " ")
;(display (u12 2))(display " ")
;(display (u12 3))(display " ")
;(newline)

;the set of all elements that are in both  in 's1' and 's2'
(define (intersection s1 s2)
  'UNIMPLEMENTED
  )

;(define i1 (intersection u12 singleton1))
;(display (i1 1))(display " ")
;(display (i1 2))(display " ")
;(display (i1 3))(display " ")
;(newline)

;the set of all elements that are in 's1', but that are not in 's2'
(define (diff s1 s2)
  'UNIMPLEMENTED
  )

;(define d2 (diff u12 singleton1))
;(display (d2 1))(display " ")
;(display (d2 2))(display " ")
;(display (d2 3))(display " ")
;(newline)


;returns the subset of s, for which the predicate 'predicate' is true.
(define (filter predicate s)
    'UNIMPLEMENTED)

;(define u123 (union u12 (singleton-set 3)))
;(define g2 (filter (lambda (x)(>= x 2)) u123))
;(display (g2 1))(display " g2 ")
;(display (g2 2))(display " ")
;(display (g2 3))(display " ")
;(newline)

;returns whether or not the predicate is true for all the elements
;of the given set s
(define (all? predicate s)
  'UNIMPLEMENTED
  )


;(display (all? (lambda (x)(>= x 2)) u123))(newline)

;returns whether or not the set contains at least an element for which
;the predicate is true. s below is the parameter standing for a given set
(define (exists? predicate s)
  'UNIMPLEMENTED
  )

;(display (exists? (lambda (x)(>= x 2)) u123))(newline)

;returns a new set where "op" has been applied to all elements
; NOTE: just because a procedure/function has the word "map" in it, it 
;       doesn't mean you have to use map higher order function to implement it. 
;       Map is a functional operation with well defined behavior that 
;       is not tied to any implementation.
(define (map-set op s)
  'UNIMPLEMENTED
  )

;(define ms149 (map-set (lambda (x) (* x x)) u123))
;(display (ms149 1))(display " ms149 ")
;(display (ms149 2))(display " ")
;(display (ms149 3))(display " ")
;(display (ms149 4))(display " ")
;(display (ms149 5))(display " ")
;(display (ms149 9))(display " ")
;(newline)


;=====================================03====================================
; FYI:
;  to emphasize the procedural-based approach to implement "step" data type and to
;  contrast it with the data structure-based approach for "step" implementation 
;  used in 01, here we add "-proc" suffix to each corresponding function name.

;====p3-a================
(define (up-step-proc n)
  'UNIMPLEMENTED
)

(define (down-step-proc n)
  'UNIMPLEMENTED  
)

(define (left-step-proc n)
  'UNIMPLEMENTED  
)

(define (right-step-proc n)
  'UNIMPLEMENTED
)

(define (seq-step-proc st-1 st-2)
  'UNIMPLEMENTED)

;;====
(define (up-step-proc? st)
  'UNIMPLEMENTED)  


(define (down-step-proc? st)
  'UNIMPLEMENTED) 


(define (left-step-proc? st)
  'UNIMPLEMENTED) 


(define (right-step-proc? st)
 'UNIMPLEMENTED) 


(define (seq-step-proc? st)
  'UNIMPLEMENTED)  


;This is a predicate that tells you whether or not st is a step,
; it should return true when given either up, down, left, right or seq steps.
(define (step-proc? st)
  'UNIMPLEMENTED)


;;to avoid needless duplication we will only implement one extractor to handle all the
;; simple steps, rather than four of them. So this should take: up, down, left and right 
;; steps. 
(define (single-step-proc->n st)
  'UNIMPLEMENTED  
)

;;two extractors
(define (seq-step-proc->st-1 st)
  'UNIMPLEMENTED
)


(define (seq-step-proc->st-2 st)
  'UNIMPLEMENTED  
)
;;========p3-b
(define (value-of-proc step-proc start-p )
    'UNIMPLEMENTED
)

;(display (move-proc  (seq-step-proc (up-step-proc 50)(seq-step-proc (left-step-proc 20) (right-step-proc 40)))'(0 0)))