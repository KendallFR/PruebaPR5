<?php
//class Genre
class estadoUsuario{
    //Listar en el API
    public function index(){
        try{
        $response = new Response();
        //Obtener el listado del Modelo
        $estadoUsuario=new EstadoUsuarioModel();
        $result=$estadoUsuario->all();
         //Dar respuesta
        $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($param){
        try{
        $response = new Response();
        $estadoUsuario=new EstadoUsuarioModel();
        $result=$estadoUsuario->get($param);
        //Dar respuesta
        $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}