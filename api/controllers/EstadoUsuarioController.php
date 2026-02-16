<?php
//class Genre
class estadoUsuario{
    //Listar en el API
    public function index(){
        $response = new Response();
        //Obtener el listado del Modelo
        $estadoUsuario=new EstadoUsuarioModel();
        $result=$estadoUsuario->all();
         //Dar respuesta
        $response->toJSON($result);
    }
    public function get($param){
        $response = new Response();
        $estadoUsuario=new EstadoUsuarioModel();
        $result=$estadoUsuario->get($param);
        //Dar respuesta
        $response->toJSON($result);
    }
}