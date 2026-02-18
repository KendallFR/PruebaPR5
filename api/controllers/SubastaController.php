<?php
class subasta
{
    //Listar en el API
    public function getSubastasActivas()
    {
        try {
        $response = new Response();
        //Obtener el listado del Modelo
        $subasta = new SubastaModel();
        $result = $subasta->getSubastasActivas();
        //Dar respuesta
        $response->toJSON($result);
    } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function getSubastasFinalizadas()
    {
        try {
        $response = new Response();
        //Obtener el listado del Modelo
        $subasta = new SubastaModel();
        $result = $subasta->getSubastasFinalizadas();
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
}