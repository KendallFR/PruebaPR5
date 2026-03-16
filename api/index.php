<?php
// Composer autoloader
require_once 'vendor/autoload.php';
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

/*--- Requerimientos Clases o librerías*/
require_once "controllers/core/Config.php";
require_once "controllers/core/HandleException.php";
require_once "controllers/core/Logger.php";
require_once "controllers/core/MySqlConnect.php";
require_once "controllers/core/Request.php";
require_once "controllers/core/Response.php";
//Middleware
require_once "middleware/AuthMiddleware.php";

/***--- Agregar todos los modelos*/
require_once "models/RolModel.php";
require_once "models/EstadoUsuarioModel.php";
require_once "models/UsuarioModel.php";
require_once "models/ImageModel.php";
require_once "models/CartaModel.php";
require_once "models/CategoriaModel.php";
require_once "models/EstadoCartaModel.php";
require_once "models/CondicionModel.php";
require_once "models/SubastaModel.php";
require_once "models/EstadoSubastaModel.php";
require_once "models/PujaModel.php";


/***--- Agregar todos los controladores*/
require_once "controllers/RolController.php";
require_once "controllers/EstadoUsuarioController.php";
require_once "controllers/UsuarioController.php";
require_once "controllers/ImageController.php";
require_once "controllers/CartaController.php";
require_once "controllers/CategoriaController.php";
require_once "controllers/EstadoCartaController.php";
require_once "controllers/CondicionController.php";
require_once "controllers/SubastaController.php";
require_once "controllers/EstadoSubastaController.php";
require_once "controllers/PujaController.php";

//Enrutador
require_once "routes/RoutesController.php";
$index = new RoutesController();
$index->index();



