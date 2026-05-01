# 아이템 일괄 등록 도구

해적 무기·방어구 등을 maplestory.io 에서 추출 → 검토 → 백엔드 admin API 로 일괄 등록하는 흐름입니다.

## 스크립트 구성

| 파일 | 역할 |
| --- | --- |
| `fetch-items.mjs` | 무기 (KNUCKLE, GUN) 일괄 추출 |
| `fetch-pirate-armor.mjs` | 해적 방어구 (PIRATE_OVERALL / PIRATE_TOP / PIRATE_BOTTOM) 일괄 추출 |
| `bulk-register.mjs` | JSON 파일 읽어 백엔드 `/api/item/new` 로 POST |
| `items.example.json` | 수기 작성 시 참고용 예시 |

## 사전 조건

1. 백엔드 `ItemController` 의 `@AdminOnly` 가 임시 주석되어 있음
2. 로컬 Spring Boot 가 8080 으로 떠있음 (`./gradlew :gongnomok-api:bootRun --args='--spring.profiles.active=local'`)
3. `backend/gongnomok-api/.env` 에 DB 접속 정보가 채워져 있음

## 표준 흐름 — 무기 (너클·총)

```bash
# 1) 추출
node frontend/scripts/admin/fetch-items.mjs --category KNUCKLE,GUN --out items.json

# 2) (선택) JSON 검토 — 이름·공격속도·넉백 % 등이 어색하면 수기 보정

# 3) 등록
node frontend/scripts/admin/bulk-register.mjs --input items.json
```

## 표준 흐름 — 해적 방어구

```bash
# 1) 추출 (3부위 한꺼번에)
node frontend/scripts/admin/fetch-pirate-armor.mjs --out armor.json

# 부위별로 따로 받고 싶으면:
node frontend/scripts/admin/fetch-pirate-armor.mjs --part PIRATE_TOP --out top.json
node frontend/scripts/admin/fetch-pirate-armor.mjs --part PIRATE_BOTTOM --out bottom.json

# 2) 등록
node frontend/scripts/admin/bulk-register.mjs --input armor.json
```

## 공통 옵션

| 옵션 | 설명 |
| --- | --- |
| `--out <file>` | 결과 JSON 파일 경로. 없으면 stdout. |
| `--limit N` | 처음 N개만 (테스트용) |
| `--no-dedupe` | 같은 이름 변종 ID 까지 모두 포함 (기본은 dedupe ON) |
| `--include-english` | 한글명 못 찾은 아이템도 포함 (기본은 skip) |

추가로 `fetch-items.mjs` 만:

| 옵션 | 설명 |
| --- | --- |
| `--category KNUCKLE,GUN` | 추출할 우리 카테고리 (필수). 콤마 구분. |

`fetch-pirate-armor.mjs` 만:

| 옵션 | 설명 |
| --- | --- |
| `--part PIRATE_OVERALL,PIRATE_TOP,PIRATE_BOTTOM` | 추출할 부위. 미지정 시 3부위 모두. |

## 입력 JSON 포맷 (수기 작성 시)

추출 스크립트가 생성하는 JSON 과 동일한 형태입니다. `bulk-register.mjs` 가 받는 항목 1개의 구조:

```jsonc
{
  "id": 1482000,                  // 필수. maplestory.io 아이템 ID 그대로 사용 권장
  "name": "스틸 너클",            // 필수
  "level": 10,                    // 요구 레벨
  "category": "KNUCKLE",          // 필수. 백엔드 Category enum 값
  "jobs": ["pirate"],             // common/warrior/bowman/magician/thief/pirate 중 선택
  "attackSpeed": "FAST",          // VERY_SLOW/SLOW/NORMAL/FAST/VERY_FAST/NONE
  "upgradableCount": 7,           // 업그레이드 가능 횟수
  "knockBackPercent": 60,
  "stats": {
    // 0 인 능력치는 생략 가능. 변동치 표기는 3가지:
    "phyAtk": 17,                 // 단일 숫자 → {normal:17, lower:0, upper:0} (변동 없음)
    "str":    [4, 1],             // [정옵, ±델타] → {normal:4, lower:1, upper:1}
    "dex":    [4, 1, 2],          // [정옵, 떨어질양, 오를양] → {normal:4, lower:1, upper:2}
    "phyDef": { "normal": 3, "lower": 1, "upper": 1 }  // 명시
  },
  "required": {                   // 0 인 키는 생략 가능
    "dex": 25
  }
}
```

### `lower` / `upper` 의 의미

`lower` 는 정옵 대비 **떨어질 수 있는 양**, `upper` 는 **오를 수 있는 양** (절대값 X, 델타 O):

```
정옵 17, 16~18 변동 → normal=17, lower=1, upper=1
정옵 4, 3~5 변동      → normal=4,  lower=1, upper=1
변동 없음             → normal=N,  lower=0, upper=0
```

## 카테고리 / enum 값 참고

지원 카테고리 (백엔드 `Category` enum 과 동일):

```
ONE_HANDED_SWORD  TWO_HANDED_SWORD
ONE_HANDED_AXE    TWO_HANDED_AXE
ONE_HANDED_BLUNT  TWO_HANDED_BLUNT
SPEAR  POLEARM  BOW  CROSSBOW
WAND   STAFF
DAGGER  CLAW  KNUCKLE  GUN
HAT  GLOVES  SHOES
OVERALL  TOP  BOTTOM
PIRATE_OVERALL  PIRATE_TOP  PIRATE_BOTTOM
SHIELD  EARRING  CAPE  PENDANT
```

지원 직업: `common`, `warrior`, `bowman`, `magician`, `thief`, `pirate`
- `common` = 모든 직업 착용 가능
- 그 외는 해당 직업만 착용 가능 (배열에 여러 개 가능)

지원 공격속도: `VERY_SLOW`, `SLOW`, `NORMAL`, `FAST`, `VERY_FAST`, `NONE`

## DB 정리 (재등록 전)

같은 ID 가 이미 있으면 INSERT 실패 — 재등록 전 정리:

```sql
-- 너클·총 ID 범위
DELETE FROM item WHERE item_id BETWEEN 1482000 AND 1499999;

-- 해적 방어구 ID 범위 (참고: 한벌옷 1052xxx, 상의 1042xxx, 하의 1062xxx 중 해적 전용)
-- 실제 ID 범위는 추출된 JSON 의 id 보고 결정
DELETE FROM item WHERE item_id IN (1052xxx, 1042xxx, ...);
```

FK constraint 에러가 나면 `enhanced_item` 등 참조 테이블 먼저 정리:
```sql
DELETE FROM enhanced_item WHERE item_id BETWEEN 1482000 AND 1499999;
DELETE FROM item          WHERE item_id BETWEEN 1482000 AND 1499999;
```

## 검증

등록 후 단건 조회:
```bash
curl -s http://localhost:8080/api/item/1482000 | jq
```

프론트엔드 (`http://localhost:5173/item/1482000`) 에서도 확인:
- 직업 표시줄 색
- 능력치 / 공격속도 / 넉백
- 카테고리 한글명

## 작업 끝나면 되돌릴 것

| 항목 | 조치 |
| --- | --- |
| `ItemController.java` 의 `// @AdminOnly` 주석 | `@AdminOnly` 로 복원 후 커밋 |
| `backend/gongnomok-api/.env` | gitignored 라 안전. 보안상 신경 쓰이면 `rm` |
