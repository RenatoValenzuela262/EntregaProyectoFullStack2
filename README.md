Plataforma web Full Stack para la gestión y venta de dulces y confitería. El sistema permite la administración de usuarios, gestión de inventario de productos y autenticación segura.

Tecnologías
Backend: Java 17/21, Spring Boot 3, Spring Security (JWT + BCrypt), Hibernate/JPA.
Frontend: React.js, Vite.
Base de Datos: MySQL 8.0.
Herramientas: Maven, NPM, Git.

Instrucciones de Instalación
Sigue estos pasos para configurar el entorno de desarrollo local.
Prerrequisitos
Asegúrate de tener instalado:
Java Development Kit (JDK) 17 o 21.
Node.js y NPM.
MySQL Server (XAMPP o MySQL Workbench).
Git.
Paso 1
 Clonar Repositorio
https://github.com/RenatoValenzuela262/EntregaProyectoFullStack2.git

Paso 2
Abre MySQL Workbench o XAMPP.
Crea una base de datos vacía llamada exactamente igual a la definida en tu backend (ej: db_mundogolosin).
Paso 3
Instalar Dependencias Backend:
en el VSCode instalar las extenciones
Extension Pack for java
Spring Boot Extension Pack

Instrucciones de Ejecución
El sistema requiere que el Backend y el Frontend se ejecuten simultáneamente.

Iniciar Base de Datos
Abre XAMPP e inicia el módulo MySQL y Apache
Ejecuta la clase principal Springboot desde el VsCode
Iniciar Frontend (React)
En una terminal nueva, navega a la carpeta del frontend:

cd frontendreact
npm run dev

Abrir el Navegador en LocalHost

admin@duocuc.com
admin123

La API REST está protegida con seguridad JWT.
Base URL: http://localhost:8080
Auth: Tipo Bearer Token

USUARIOS			
POST	/api/usuarios	Registra un nuevo usuario
GET	/api/usuarios	Lista todos los usuarios	
PUT	/api/usuarios/{id}	Modifica datos de usuario	
DELETE	/api/usuarios/{id}	Elimina un usuario	

PRODUCTOS			
GET	/api/productos	Lista el catálogo	
POST	/api/productos	Crea un producto nuevo	
PUT	/api/productos/{id}	Actualiza stock/precio	
