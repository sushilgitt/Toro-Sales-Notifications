FROM node:20-bookworm-slim AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM debian:bookworm-slim AS runtime
ENV DEBIAN_FRONTEND=noninteractive
ENV PHP_DATE_TIMEZONE=UTC
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        git \
        unzip \
        php-cli \
        php-bcmath \
        php-curl \
        php-gd \
        php-imagick \
        php-intl \
        php-mbstring \
        php-mysql \
        php-xml \
        php-zip \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
COPY . .
COPY --from=frontend /app/public/build /app/public/build
RUN mkdir -p bootstrap/cache storage/framework/cache storage/framework/sessions storage/framework/views storage/logs \
    && chmod -R 777 bootstrap/cache storage storage/framework storage/logs \
    && composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader \
    && rm -f storage/framework/views/*.php bootstrap/cache/*.php public/hot
EXPOSE 80
CMD ["sh", "-lc", "php artisan serve --host=0.0.0.0 --port=80"]
