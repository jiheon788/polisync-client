# 기본 이미지 선택
FROM node:18.17.1-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json ./
RUN npm install

# 앱 소스 복사
COPY . ./

# 앱 빌드
RUN npm run build

# Nginx를 사용하여 빌드된 앱 서빙
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
