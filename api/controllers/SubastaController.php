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

    public function getSubastaCarta($id)
    {
        try {
            $response = new Response();
            $subasta = new SubastaModel();
            $result = $subasta->getSubastaCarta($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
public function create()
{
    try {
        session_start();

        $request = new Request();
        $response = new Response();
        $inputJSON = $request->getJSON();

        if (!isset($_SESSION['idUsuario'])) {
            $_SESSION['idUsuario'] = 1;
        }

        $inputJSON->idUsuario = $_SESSION['idUsuario'];

        $subasta = new SubastaModel();
        $result = $subasta->create($inputJSON);

        $response->toJSON($result);

    } catch (Exception $e) {
        $response->toJSON($result);
        handleException($e);
    }
}
}