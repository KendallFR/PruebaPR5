<?php
class carta
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $cartaM = new CartaModel();
            $result = $cartaM->all();
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($id)
    {
        try {
            $response = new Response();
            $carta = new CartaModel();
            $result = $carta->get($id);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }



public function subastas($id)
{
    try {
        $response = new Response();

        $subasta = new SubastaModel();

        $result = $subasta->getSubastasByCarta($id);

        $response->toJSON($result);

    } catch (Exception $e) {
        handleException($e);
    }
}

public function allCartasActivas()
    {
        try {
            $response = new Response();
            $carta = new CartaModel();
            $result = $carta->allCartasActivas();
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}