# MindFlow

MindFlow es una aplicación que busca gestionar las tareas y proyectos del día a día, manteniendo un seguimiento de las actividades e incrementando la productividad del usuario. 

![image](https://github.com/user-attachments/assets/d7f5cc6c-f148-4531-a90a-f6b83068ea8a)

MindFlow cuenta con distintas funcionalidades para lograr gestionar las tareas y proyectos. Entre ellas están :
- TodoList
- Calendar
- Github Manager
- Stadistics
- Notebook


La siguiente imagen muestra el todolist, permitiendonos crear diferentes tareas con etiquetas de dificultad y de fecha de vencimiento.
Además nos asegura una gran experiencia de usuario permitiendonos hacer drag and drop, editar, eliminar y crear nuevas tareas.

![image](https://github.com/user-attachments/assets/9d726733-2ac7-4e97-a3f7-6407d0b4f3f7)
<p>&nbsp;</p>

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
