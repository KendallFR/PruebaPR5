<?php
class estadoCarta
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo

            $estadoCarta = new EstadoCartaModel();
            $result = $estadoCarta->all();
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
            $genero = new DirectorModel();
            $result = $genero->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}