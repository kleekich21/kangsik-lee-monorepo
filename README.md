# Kangsik-Lee Monorepo

Turborepo를 활용한 개인 프로젝트용 모노레포입니다. 다양한 프로젝트를 모노레포로 관리하므로써, 코드 재사용율을 높이고, 프로젝트들의 의존성 및 버전을 효율적으로 관리하기 위해 만들었습니다. Turborepo의 강점을 최대한 살려, 로컬뿐만 아니라 [remote caching](https://turbo.build/repo/docs/core-concepts/remote-caching)을 활용하여 빌드 프로세스를 최적화하였습니다. 최대한 현업에서 비슷한 형태로 프로젝트를 관리하기 위한 공간입니다.

# 사용기술

![Turborepo](https://img.shields.io/badge/turborepo-%EF4444.svg?style=for-the-badge&logo=turborepo&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: `web` 및 `docs` 애플리케이션에서 공통으로 사용하는 스텁(Stub) React 컴포넌트 라이브러리
- `@repo/eslint-config`: `eslint` 설정 (`eslint-config-next`, `eslint-config-prettier` 포함)
- `@repo/typescript-config`: 모노레포 전반에서 사용되는 `tsconfig.json`
- `@kleekich21/utils`: 커스텀 유틸리티 함수들을 모아놓은 패키지입니다.

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd kangsik-lee-monorepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd kangsik-lee-monorepo
pnpm dev
```

### Remote Caching

Turborepo는 [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)이라는 기술을 사용하여, 머신 간에 캐시 아티팩트를 공유할 수 있습니다. 이를 통해 팀원들과 CI/CD 파이프라인에서 빌드 캐시를 공유할 수 있습니다.

기본적으로 Turborepo는 로컬에서 캐시를 저장합니다. 원격 캐싱을 활성화하려면 Vercel 계정이 필요합니다. 계정이 없으면 [여기](https://vercel.com/signup)에서 계정을 생성한 후 다음 명령어를 입력하세요:

```
cd kangsik-lee-monorepo
npx turbo login
```

이 명령어는 Turborepo CLI를 [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview)와 인증합니다.

그런 다음, Turborepo의 루트 디렉토리에서 다음 명령어를 실행하여 Turborepo를 원격 캐시에 연결할 수 있습니다:

```
npx turbo link
```
