<?php
class subasta
{
    public function index()
    {
        try {
            $response = new Response();
            $subasta = new SubastaModel();
            $result = $subasta->all();
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }
    public function getSubastasbyEstado($id)
    {
        try {
            $response = new Response();
            $subasta = new SubastaModel();
            $result = $subasta->getSubastasbyEstado($id);
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
            $subasta = new SubastaModel();
            $result = $subasta->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}