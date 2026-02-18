<?php
//class Genre
class rol
{
    //Listar en el API
    public function index()
    {
        try{
        $response = new Response();
        //Obtener el listado del Modelo
        $rol=new RolModel();
        $result=$rol->all();
         //Dar respuesta
        $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($param)
    {
        try{
        $response = new Response();
        $rol=new RolModel();
        $result=$rol->get($param);
        //Dar respuesta
        $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}