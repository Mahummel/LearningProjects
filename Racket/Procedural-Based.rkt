#lang racket

; Procedural based  Representation
; Still contains constructors, predicates, extractors, just like data-structure-based

; Example: <list-of-T> implementation
; What's required:
;  Constructors: (empty-list), (cons-list)
;  Predicates: (empty-list?), (cons-list?), (T?)
;  Extractors: (empty-list), (cons-list->first), (cons-list->list)
;  Interpreter: (value-of)
; Implementation is done via λ this time

(define (empty-list)
  (λ (x)
    (cond
      [(equal? x 'empty-list) #t]
      [(equal? x 'value) `()]
      [else #f]
      )
))

(define (cons-list T list-of-T)
  (if (and (T? T) (or (empty-list? list-of-T)(cons-list? list-of-T)))
      (λ (x)
        (cond
          [(equal? x `cons-list) #t]
          [(equal? x `T) T]
          [(equal? x `list-of-T) list-of-T]
          [else #f]
          ))
      (raise "Some Error Occurred")
))

(define (empty-list? x) (x `empty-list))
(define (cons-list? x) (x `cons-list))
(define (T? x) (number? x))
(define (cons-list->first x) (x `T))
(define (cons-list->list x) (x `list-of-T))

(define (value-of ast)
  (cond
    [(empty-list? ast) `()]
    [(cons-list? ast) (cons(cons-list->first ast) (value-of (cons-list->list ast)))]
    [else (raise "Unknown Type")]
))

(define a (cons-list 8 (cons-list 7 (cons-list 6(empty-list)))))
(value-of a)

; Procedural based uses the approach of heavy lifting in the constructor section of creation