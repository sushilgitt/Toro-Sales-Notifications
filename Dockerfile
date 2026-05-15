FROM php:8.4-cli-alpine AS vendor
RUN apk add --no-cache git unzip libzip-dev libpng-dev libjpeg-turbo-dev freetype-dev libwebp-dev libavif-dev libxml2-dev oniguruma-dev icu-dev imagemagick-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-avif \
    && docker-php-ext-install bcmath exif gd intl mbstring pcntl pdo_mysql zip \
    && pecl install imagick \
    && docker-php-ext-enable imagick
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM webdevops/php-nginx:8.3-alpine
ENV WEB_DOCUMENT_ROOT=/app/public
ENV PHP_DATE_TIMEZONE=UTC
WORKDIR /app
USER root
RUN apk add --no-cache php8-exif php8-pdo_mysql php8-bcmath php8-intl php8-mbstring php8-gd php8-zip php8-opcache php8-fileinfo php8-tokenizer php8-xml php8-session php8-ctype php8-dom php8-simplexml php8-xmlwriter php8-xmlreader php8-curl php8-phar php8-iconv php8-openssl php8-imagick
COPY . .
COPY --from=vendor /app/vendor /app/vendor
COPY --from=frontend /app/public/build /app/public/build
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R application:application /app
USER application
EXPOSE 80
