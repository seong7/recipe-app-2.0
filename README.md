# Recipe App 
ver 2.0

### Memo

#### Event target 으로 DOM 에 접근하는 method
 1. event.target.matches (".class *")   
   : 지정한 선택자와 일치하는지 확인

 2. event.target.closest (".class ")
   : target 에서 가장 가까운 선택자의 요소 지정

 3. event.target.classList.contains("class")
   : target 의 class 명으로 접근하는 법 ("." 사용하지 않음)