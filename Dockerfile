# Usa la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instala las extensiones necesarias de PHP
RUN docker-php-ext-install pdo pdo_mysql

# Configura el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos de la aplicación al contenedor
COPY . /var/www/html

# Configura el propietario de los archivos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libzip-dev \
    git
RUN docker-php-ext-install zip

# Instalar las dependencias de Laravel
RUN composer update

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["apache2-foreground"]

# Aumentar la memoria y límite de tiempo de Composer
RUN php -d memory_limit=-1 /usr/local/bin/composer config -g repo.packagist composer https://packagist.org

# Cambiar permisos de directorios
RUN chmod -R 775 /var/www/html/storage
RUN chmod -R 775 /var/www/html/bootstrap/cache

# Configurar el archivo apache
RUN a2dissite 000-default.conf
COPY virtualHost.conf /etc/apache2/sites-available
RUN a2ensite virtualHost.conf

# Habilitar el módulo rewrite de Apache
RUN a2enmod rewrite

# Migramos las tablas de la base de datos
#RUN echo "sleep 30 && php artisan migrate && php artisan db:seed" >> /tmp/init.sh && \
#   chmod +x /tmp/init.sh

# Para mentenerlo encendido
##CMD ["/bin/sh", "-c", "/tmp/init.sh && apache2-foreground"]
