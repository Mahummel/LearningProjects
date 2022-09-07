#lang racket

; #:super, inherits from a previous structure, and adds on
(struct document (author title content))
(struct book document (publisher))
(struct paper (journal) #:super struct:document)

;(document "Dani" "Works Hard" "Phd ready")

; #:inspector #f === #:transparent, displays value given directly with type
(define-struct point (x y [z #:auto])
  #:auto-value -1
  #:transparent
)

;(define a (make-point 3 5))
;(point-x a)

; Guard, protect aganinst certain values going into your data type
(struct celsius (temp)
  #:guard (λ (temp name)
            (unless (and (real? temp) (>= temp -273.15))
              (error "not a valid temperature"))
            temp))


;(celsius-temp (celsius -272))


;-------- HW 4 Material --------;

;Data structure based representation of material

; Ex, a List: <list-of-T> ::= () | (<T> . <list-of-T>) (either empty or a list with empty end)
;
; Constructor for list:
;   (empty-list) -> list-of-T
;   (cons-list T list-of-T) ->  list-of-T
;
; Empty-list is required as the final part of a list-of-T is a `(),
; cons-list implies use of cons operator to add T data type to the list that exists (empty or otherwise)

(define (empty-list) `())
(define (cons-list T list-of-T)
  (if (and (T? T)(or (empty-list? list-of-T)(cons-list? list-of-T)))
      (cons T list-of-T)
      (raise "Some error occured"))
)

; Predicates for list: Procedures that are required for constructor to function:
;
;   (empty-list?) -> Boolean
;   (cons-list?) -> Boolean
;   (T?) -> Boolean
;
; These were functions used above in the constructor to create our data type of list
; empty-list? checks if list is (), cons-list? checks if list is of valid type, T? checks if element is valid

(define (empty-list? x) (null? x))
(define (cons-list? x) (andmap T? x))
(define (T? x) (number? x))

; Extractors for list: Returning actual values from our data type
;
;   (empty-list) -> `()
;   (cons-list->first list-of-T) -> T
;   (cons-list->list list-of-T) -> list-of-T
;
; first, is first element, list is the remainder, empty list was defined in the constructor

(define (cons-list->first x) (car x))
(define (cons-list->list x) (cdr x))

; Interpreter, using predicates and extractors, get full value of data type

(define (val-of ast)
  (cond
    [(empty-list? ast) `()]
    [(cons-list? ast) (cons (cons-list->first ast) (val-of (cons-list->list ast)))]
    [else (raise "Unknown Type")]
))

(define a (cons-list 8 (cons-list 7 (cons-list 6 (empty-list)))))
(define b (cons-list 12 a))
(val-of b)

; Created from scratch, a data type of list-of-T! (where T is an int)