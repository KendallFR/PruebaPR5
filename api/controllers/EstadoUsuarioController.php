<?php
class estadoUsuario
{
    public function index()
    {
        try{
            $response = new Response();
            $estadoUsuario=new EstadoUsuarioModel();
            $result=$estadoUsuario->all();
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($id)
    {
        try{
            $response = new Response();
            $estadoUsuario=new EstadoUsuarioModel();
            $result=$estadoUsuario->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}