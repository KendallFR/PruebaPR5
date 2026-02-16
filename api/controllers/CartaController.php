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
            $cartaM = new CartaModel();
            $result = $cartaM->get($id);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}