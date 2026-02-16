<?php
//Cargar todos los paquetes
require_once "vendor/autoload.php";

use Firebase\JWT\JWT;

class usuario
{
    //Listar en el API
    public function index()
    {
        try {
        $response = new Response();
        //Obtener el listado del Modelo
        $usuario = new UsuarioModel();
        $result = $usuario->all();
        //Dar respuesta
        $response->toJSON($result);
    } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($param)
    {
        $response = new Response();
        $usuario = new UsuarioModel();
        $result = $usuario->get($param);
        //Dar respuesta
        $response->toJSON($result);
    }
    public function getUsuario($idUsuario)
    {
        try{
            $response = new Response();
            $usuario = new UsuarioModel();
            $result = $usuario->getUsuario($idUsuario);
            $response->toJSON($result);
        }catch(Exception $e){
            $response->toJSON($result);
            handleException($e);
        }
    }
    public function cantidadPujasSubastas($idUsuario)
    {
        try{
            $response = new Response();
            $usuario = new UsuarioModel();
            $result = $usuario->cantidadPujasSubastas($idUsuario);
            $response->toJSON($result);
        }catch(Exception $e){
            $response->toJSON($result);
            handleException($e);
        }
    }
    public function login()
    {
        $response = new Response();
        $request = new Request();
        //Obtener json enviado
        $inputJSON = $request->getJSON();
        $usuario = new UsuarioModel();
        $result = $usuario->login($inputJSON);
        if (isset($result) && !empty($result) && $result != false) {
            $response->toJSON($result);
        } else {
            $response->toJSON($response, "Usuario no valido");
        }
    }
    public function create()
    {
        $response = new Response();
        $request = new Request();
        //Obtener json enviado
        $inputJSON = $request->getJSON();
        $usuario = new UsuarioModel();
        $result = $usuario->create($inputJSON);
        //Dar respuesta
        $response->toJSON($result);
    }
}