<?php
class estadoSubasta
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $estadoSubasta = new EstadoSubastaModel();
            $result = $estadoSubasta->all();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($param)
    {
        try {
            $response = new Response();
            $estadoSubasta = new EstadoSubastaModel();
            $result = $estadoSubasta->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}