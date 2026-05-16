FROM php:8.4-cli-alpine AS vendor
RUN apk add --no-cache $PHPIZE_DEPS git unzip libzip-dev libpng-dev libjpeg-turbo-dev freetype-dev libwebp-dev libavif-dev libxml2-dev oniguruma-dev icu-dev imagemagick-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-avif \
    && docker-php-ext-install bcmath exif gd intl mbstring pcntl pdo_mysql zip \
    && pecl install imagick \
    && docker-php-ext-enable imagick
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY . .
RUN mkdir -p bootstrap/cache storage/framework/cache storage/framework/sessions storage/framework/views storage/logs \
    && chmod -R 777 bootstrap/cache storage storage/framework storage/logs \
    && composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM vendor AS runtime
ENV PHP_DATE_TIMEZONE=UTC
WORKDIR /app
COPY --from=frontend /app/public/build /app/public/build
RUN rm -f storage/framework/views/*.php bootstrap/cache/*.php public/hot \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache
EXPOSE 80
CMD ["sh", "-lc", "php artisan serve --host=0.0.0.0 --port=80"]
