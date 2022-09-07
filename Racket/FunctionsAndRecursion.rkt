#lang racket
(#%provide (all-defined))
(#%require (lib "eopl.ss" "eopl"))

;=======================================01======================================
(define (invalid-args-msg fun-name-as-string
                          expected-value-type-as-predicate-string
                          received)
  (string-append "Invalid arguments in: " fun-name-as-string " --- "
                 "expected: " expected-value-type-as-predicate-string " --- "
                 "received: " (~a received)
                 )
)

;You can compare the contents of this answer sheet with the answer sheet of the
;previous homework to infer what is generated automatically by define-datatype.
(define-datatype step step?
  (up-step (val number?))
  (down-step (val number?))
  (left-step (val number?))
  (right-step (val number?))
  (seq-step (stepOne step?) (stepTwo step?)))

;;===================================

;Check the interpreter in HW4 solution if you are having difficulties
(define (value-of stepin start-p)
  (if (step? stepin)
      (cases step stepin
        (up-step (v) (map + start-p (list 0 v)))
        (down-step (v) (map - start-p (list 0 v)))
        (left-step (v) (map - start-p (list v 0)))
        (right-step (v) (map + start-p (list v 0)))
        (seq-step (firstStep restStep) (map + (value-of firstStep start-p) (value-of restStep start-p))))
      (invalid-args-msg "value-of" "<step>" stepin)))

;(display (value-of  (left-step 10)  '(0 0)))(newline)
;(display (value-of  (right-step 10)  '(0 0)))(newline)
;(display (value-of  (up-step 10)  '(0 0)))(newline)
;(display (value-of  (down-step 10)  '(0 0)))(newline)
;(display (value-of (seq-step (left-step 10) (right-step 20)  ) '(0 0)))(newline)
;(display (value-of  (seq-step (up-step 50)(seq-step (left-step 20) (right-step 40))) '(0 0)))(newline)
;(display (value-of  '(123) '(0 0)))

;=======================================02======================================
;2.a
(define (exception-no-binding-msg sym)
  (string-append "No binding for '" (~a sym))
  )

;
(define-datatype environment environment?
  (empty-env)
  (extend-env (sym symbol?) (val number?) (env environment?))
  )


;2.b
;Helper function to check if sym is of final variant in env or not 
(define (is-var-final? sym env)
  'UNIMPLENTED)

;in the wrapper we first check to see if a variable is final or not,
;before adding it using one of the two constructors. This constructor
;wrapper will be used to create the AST while generating the correct errors.
(define (extend-env-constructor-wrapper sym val env final?)
  (if (not final?)
      (extend-env sym val env)
      (extend-env sym val env)
  ))


;2.c
(define (apply-env env search-sym)
  (cases environment env
    (empty-env () (exception-no-binding-msg search-sym))
    (extend-env (s v e)
                (if (eqv? search-sym s)
                    v
                    (apply-env e search-sym)))))


;(define s (empty-env))

;(define s-env (extend-env-constructor-wrapper 'x 99
;                             (extend-env-constructor-wrapper 'z 100
;                                               (extend-env-constructor-wrapper 'y 3
;                                                                               (extend-env-constructor-wrapper  'x 2
;                                                                                                                (empty-env) #f) #f )#f)#f))


;(display (apply-env s-env 'x))(newline)

#|
(define s-env1 (extend-env-constructor-wrapper 'x 99
                              (extend-env-constructor-wrapper 'z 100
                                               (extend-env-constructor-wrapper 'y 3
                                                                               (extend-env-constructor-wrapper  'x 2
                                                                                                                (empty-env)
                                                                                                                #f)
                                                                               #t )
                                               #f)
                              #f))

|#

;==========
