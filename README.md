## 기능 요구 사항

### 일반 계정 및 어드민 계정 시나리오

1. 헤더
   1. -[x] 왼쪽에는 로고가 있는데 클릭하면 홈으로 이동시킨다.
   2. 오른쪽에는 products, 장바구니, 로그인 버튼
      1. -[x] products를 클릭하면 /products라는 곳으로 이동시킨다.
      2. -[] 로그인하지 않은 사용자라면, 장바구니를 클릭했을 때 홈으로 리다이렉트된다.
      3. -[] 로그인 한 사용자라면, 장바구니에 몇개의 아이템이 담겼는지 표시해줘야한다.
      4. -[] 사용자가 로그인을 하면 로그인 버튼은 로그아웃으로 바뀌어야 한다.
2. 홈페이지 컨텐트:/
   1. -[] 배너 보여주기
   2. -[] 프로덕트들 보여주기
3. 프로덕트:/products
   1. -[] 등록된 상품들을 모두 보여줘야한다.
4. 프로덕트 상세정보:/products/:productId
   1. -[] 로그인 하지 않은 사용자라도 제품 카드를 클릭하면 상세 정보 확인가능하다.
   2. -[] 제품에 대한 상세정보와 장바구니에 추가 버튼이 있어야한다.
   3. -[] 장바구니에 추가는 로그인하지 않은 사용자라면 할 수 없다.
   4. -[] 로그인 한 사용자라면 장바구니에 추가를 눌렀을 때 장바구니에 해당 아이템을 추가할 수 있으며 장바구니에 추가되었다는 메시지가 뜬다.
5. 장바구니:/carts
   1. -[] 어떤 아이템이 담겼는지 아이템들에 대한 정보 및 옵션 정보를 리스트로 보여줘야한다.
   2. -[] 담은 제품의 가격 총액과 배송비를 계산해서 총 가격을 보여줘야한다.
   3. -[] 주문하기 버튼이 있어야한다.
   4. -[] 수량 조정이 가능해야한다.
   5. -[] 제품 삭제가 가능해야한다.

### 어드민 계정 시나리오

1. 헤더
   1. -[] 장바구니 옆에 연필 표시가 있는 아이콘이 있어야한다.
2. 새로운 제품 등록(연필 아이콘)
   1. -[] 원하는 제품의 이미지를 등록할 수 있어야한다.
   2. -[] 제품명, 가격, 카테고리, 제품설명을 작성할 수 있어야한다.
   3. -[] 옵션을 콤마로 구분해서 작성할 수 있어야한다.
   4. -[] 제품 등록 버튼을 누르면 로딩페이지가 떠야한다.
   5. -[] 성공적으로 제품 등록이 되면 제품 등록이 완료되었다는 메시지가 떠야한다.
