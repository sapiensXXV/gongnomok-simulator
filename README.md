## 메이플 주문서 시뮬레이터

### 프로젝트 소개

메이플 스토리 아이템을 임의로 강화해볼 수 있는 서비스입니다. ([링크](https://gongnomok.site/))
<img src="./img/gongnomok.gif">

- **개발 기간** `2024.01` ~ 
- **플랫폼** `WEB`
- **개발인원** `1명`
- **언어** `JAVA 17`, `Javascript`
- **서버** `Apache Tomcat 10.1.8`, `Nginx 1.18.0`, `GCP VM Instance (Ubuntu)`
- **프레임워크** `Spring Boot 3.2.2`
- **DB** `MySQL 8.0.39`, `Redis 7.4.0`
- **모니터링** `Prometheus`, `Grafana`, `PINPOINT`
- **부하테스트** `nGrinder`

### 프로젝트 구조
![프로젝트 구조](https://github.com/user-attachments/assets/26d292e0-b4e8-4ceb-9941-ac58e850ee8e)

- 브라우저의 요청은 로드밸런서 역할을 하고 있는 nginx 서버로 전달된다. 
- nginx 서버는 들어오는 트래픽을 두개의 WAS로 분산시킨다. 
- 도착한 요청은 도커 컨테이너로 실행되고 있는 스프링 프레임워크 기반의 WAS 로 전달된다.
- WAS 에서는 필요에 따라 MySQL 서버나 Redis 서버에 접근해 필요한 데이터를 읽거나 쓴다.
- MySQL 서버는 하나의 소스 서버와 두개의 레플리카 서버로 이루어져있다.
	- 소스 서버는 쓰기 요청을 처리하고, 레플리카 서버에서 읽기 요청을 처리한다.
- WAS가 주기적으로 메트릭 정보를 프로메테우스 서버로 전달하고 그라파나가 정보를 가져와 시각화해 개발자에게 제공한다.

### 배포 흐름
![ci-cd 흐름](https://github.com/user-attachments/assets/b6a370df-a674-4f29-bcba-e74f295c3ed3)


### 관련 글
- [서비스 기획](https://sapiensxxv.github.io/posts/%EB%A9%94%EC%9D%B4%ED%94%8C-%EC%A3%BC%EB%AC%B8%EC%84%9C-%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0-%EA%B0%9C%EB%B0%9C%EA%B8%B0/)
- [사용자 접근 제한 기능 개발](https://sapiensxxv.github.io/posts/%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B6%8C%ED%95%9C-%EC%A0%9C%ED%95%9C%EA%B8%B0%EB%8A%A5-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0/)
- [검색 인덱스 제공하기](https://sapiensxxv.github.io/posts/%EC%95%84%EC%9D%B4%ED%85%9C-%EA%B2%80%EC%83%89-%EC%9D%B8%EB%8D%B1%EC%8A%A4-%EC%A0%9C%EA%B3%B5%ED%95%98%EA%B8%B0/)
- [No Offset으로 댓글 페이징 최적화하기](https://sapiensxxv.github.io/posts/No-Offset-%EC%BF%BC%EB%A6%AC%EB%A1%9C-%EB%8C%93%EA%B8%80-%ED%8E%98%EC%9D%B4%EC%A7%95-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%95%98%EA%B8%B0/)
- [애플리케이션 성능 테스트(1) - 테스트 목적, 목표](https://sapiensxxv.github.io/posts/%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EC%84%B1%EB%8A%A5-%ED%85%8C%EC%8A%A4%ED%8A%B8-(1)/)
- [애플리케이션 성능 테스트(2) - 테스트 결과, 튜닝](https://sapiensxxv.github.io/posts/%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EC%84%B1%EB%8A%A5-%ED%85%8C%EC%8A%A4%ED%8A%B8-(2)/)
- [댓글 신고, 신고댓글 관리기능 개발](https://sapiensxxv.github.io/posts/%EB%8C%93%EA%B8%80%EA%B4%80%EB%A6%AC-%EA%B8%B0%EB%8A%A5-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8/)
- [금칙어 필터링 기능 개발](https://sapiensxxv.github.io/posts/%EA%B8%88%EC%B9%99%EC%96%B4-%ED%95%84%ED%84%B0%EB%A7%81-%EA%B0%9C%EB%B0%9C/)
- [Redis 활용 댓글 도배방지 기능 개발](https://sapiensxxv.github.io/posts/Redis%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%84%B1%EB%8A%A5%EA%B0%9C%EC%84%A0/)
- [로그를 활용한 사용자 차단/관리 시스템 개발](https://sapiensxxv.github.io/posts/%EB%A1%9C%EA%B7%B8-%EA%B4%80%EB%A6%AC-%EC%8B%9C%EC%8A%A4%ED%85%9C%EA%B0%9C%EB%B0%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%A0%80%EC%9E%A5%EB%B6%80%ED%84%B0-%ED%99%94%EB%A9%B4-%EC%B6%9C%EB%A0%A5%EA%B9%8C%EC%A7%80/)
- [MySQL 레플리케이션 적용](https://sapiensxxv.github.io/posts/MySQL-%EB%A0%88%ED%94%8C%EB%A6%AC%EC%B9%B4-%EC%84%9C%EB%B2%84-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B3%A0-%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0/)