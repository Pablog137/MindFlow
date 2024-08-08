# Documentación Levante/Despliegue



## Para levantar el proyecto en local, se deben seguir estos pasos:

### Instalar dependencias:
-  Asegúrate de tener instalado PHP.
-  Asegúrate de tener instalado Composer.

### Configurar el archivo .env:

Para el uso de oAuth de github necesitamos proporcionar:

    GITHUB_CLIENT_ID=Ov23lidrhXsGpDFFL34F
    GITHUB_CLIENT_SECRET=360d31176054c260879c1e426a60fd0ec5949bba

Configuración del correo (opcional): Si deseas habilitar la funcionalidad para resetear contraseñas, también deberás configurar el correo y la contraseña de aplicación:

    MAIL_USERNAME=tu_correo@example.com
    MAIL_PASSWORD=tu_contraseña_de_aplicación

## Levantar el proyecto con Docker:

- Navega a la raíz del proyecto.
- Ejecuta el siguiente comando para levantar los contenedores:

      docker-compose up -d    La opción -d se utiliza si no deseas ver los logs en la consola.

Una vez que los contenedores estén cargados y creados, accede al contenedor de Laravel (backend) y ejecuta las migraciones:

     php artisan migrate

Después de completar las migraciones, el proyecto estará listo para usarse.
