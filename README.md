### Version

- "react": "^18.2.0"
- "typescript": "^4.9.4"
- "react-router-dom": "^6.7.0"
- "react-query": "^3.39.3"

### 폴더구조

- components : atomic

### 기능

로그인 & 회원가입 (소셜 OAuth, 코그니토 OAuth)

1. [FE]/login(X_AUTH_URL 호출)

```　[Social](Redirect URL 호출, authCode 응답)
-> [FE]/oauth/:socialPlatform(authCode 전달)
-> [BE]/v1/session/social ->
-> [BE] authCode를 이용하여 Token 요청 ->
-> [Social] accessToken 발급 ->
-> [BE] accessToken을 이용하여 User 정보 요청 ->
-> [Social] User 정보 응답 ->
-> [BE] User정보 조회 ->
--> 회원가입
-> [BE] ??
-> [FE] User 정보 세팅
->
```

### import

#### Styling

- "styled-components": "^5.3.6",
- "@emotion/react": "^11.10.5"
- "@emotion/styled": "^11.10.5"

#### Mui

- "@emotion/react": "^11.10.5"
- "@emotion/styled": "^11.10.5"
- "@mui/material": "^5.11.7"
- @mui/icons-material

#### bootstrap (미사용, 참고용)

- "bootstrap": "^5.2.3"
- "react-bootstrap": "^2.7.0"

#### 다국어

- "i18next": "^23.6.0"
- "react-i18next": "^13.3.1"

#### Lint(dev)

- "eslint": "^8.36.0",
- "eslint-config-prettier": "^8.7.0",
- "eslint-plugin-prettier": "^4.2.1",
- "eslint-plugin-react": "^7.32.2",
- "prettier": "^2.8.4"
- @typescript-eslint/eslint-plugin@latest
- @typescript-eslint/parser@latest

## etc

- uuid
  - @types/uuid
