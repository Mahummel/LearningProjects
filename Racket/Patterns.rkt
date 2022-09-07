#lang racket
(#%provide (all-defined))
;======================================01=======================================
(define (list-of-even-numbers? lst)
  (if (andmap number? lst)
    (if (= 0 (count odd? lst))
      #t
      #f
    )
    #f
  )  
)
;======================================02=======================================
;;for n > 0
;Sn = 1/1 + 1/4 + 1/9 + 1/16 + ...
(define (series-a n)
  (if (= n 1)
  1
  (+ (/ #i1 (* n n)) (series-a (- n 1)))
  )
)

;====
;;for n >= 0
;Sn = 1 - 1/2 + 1/6 - 1/24 + ...
(define (series-b n)
  (define (fact m)
    (if (= m 1)
    1
    (* m (fact(- m 1)))))
  (if (= n 0)
  1
  (+ (/ (expt #i-1 n) (fact (+ n 1))) (series-b(- n 1))))
)

;======================================03=======================================
(define (carpet n)
  (define (sym-to-use n)
    (if (even? n) `% `+))
  
  (define (construct lst sym n)
  (append (list (build-list (+ (* 2 n) 1)  (λ (x) sym))) (middle lst sym) (list (build-list  (+ (* 2 n) 1) (λ (x) sym)))))
  
  (define (middle lst sym)
    (cond
      ((null? lst) `())
      (else (cons (append (list sym) (first lst) (list sym)) (middle (rest lst) sym)))))
  
  (if (= n 0)
      (list (list (sym-to-use n)))
      (construct (carpet (- n 1)) (sym-to-use n) n)
  )
)


;======================================04=======================================
(define (pascal n)
  (define (construct lst n)
    (cond
      [(= n 2) (append  lst `((1 1)))]
      [else
       (append lst (list (append `(1) (middle (last lst)) `(1))))]
      )
   )
  (define (middle lst)
    (cond
      [(null? lst) `()]
      [(null? (cdr lst)) `()]
      [else
       (cons (append (+ (first lst) (second lst))) (middle (cdr lst)))
      ] 
     )
   )
 (if (= n 1)
     `((1))
     (construct (pascal (- n 1)) n)
 )
)

;======================================05=======================================
(define (balanced? in)
  (define fullList
    (string->list in))
  (define (count lst n)
    (cond
      [(null? lst) 0]
      [(char=? (first lst) #\( ) (+ (count (cdr lst) n) 1)]
      [(char=? (first lst) #\) ) (- (count (cdr lst) n) 1)]
      [else (count (cdr lst) n)]
      )
    )
  (if (= 0 (count fullList 0)) #t #f)
)

;======================================06=======================================
(define (list-of-all? predicate lst)
  (andmap predicate lst)
)

;======================================07=======================================
(define (create-mapping keys vals)
  (define (multiple-pairs lst1 lst2)
    (if (or (null? lst1) (null? lst2))
        `()
        (cons (cons (car lst1) (car lst2))
              (multiple-pairs (cdr lst1) (cdr lst2)))))
  
  (define mapped (multiple-pairs keys vals))
  
  (define (list-iteration lst key)
    (if (empty? lst)
        (raise (string-append "Could not find mapping for symbol " (symbol->string key)))
        (if (equal? key (car (first lst)))
            (cdr (first lst))
            (list-iteration (rest lst) key))
        ))
     
  (λ (x)
    (list-iteration mapped x))
)