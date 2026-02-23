<?php
class subasta
{
    public function allSubastasActivas()
    {
        try {
            $response = new Response();
            $subasta = new SubastaModel();
            $result = $subasta->allSubastasActivas();
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function allSubastasFinalizadas()
    {
        try {
            $response = new Response();
            $subasta = new SubastaModel();
            $result = $subasta->allSubastasFinalizadas();
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