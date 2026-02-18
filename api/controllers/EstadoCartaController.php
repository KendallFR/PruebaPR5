<?php
class estadoCarta
{
    public function index()
    {
        try {
            $response = new Response();
            $estadoCarta = new EstadoCartaModel();
            $result = $estadoCarta->all();
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
            $estadoCarta = new EstadoCartaModel();
            $result = $estadoCarta->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}