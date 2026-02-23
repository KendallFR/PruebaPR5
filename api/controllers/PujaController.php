<?php
class puja
{
    public function getPujasbySubasta($idSubasta)
    {
        try {
            $response = new Response();
            $puja = new PujaModel();
            $result = $puja->getPujasbySubasta($idSubasta);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}