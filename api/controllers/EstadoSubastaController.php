<?php
class estadoSubasta
{
    public function index()
    {
        try {
            $response = new Response();
            $estadoSubasta = new EstadoSubastaModel();
            $result = $estadoSubasta->all();
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
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}