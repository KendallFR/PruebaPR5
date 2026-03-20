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

        $result = $subasta->getSubastaCarta($id);

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


public function create()
{
    try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $carta = new CartaModel();
            //Acción del modelo a ejecutar
            $result = $carta->create($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
}

public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $carta = new CartaModel();
            //Acción del modelo a ejecutar
            $result = $carta->update($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

public function delete($id)
{
    try {
        $response = new Response();

        $cartaM = new CartaModel();
        $result = $cartaM->delete($id);

        $response->toJSON($result);

    } catch (Exception $e) {
        handleException($e);
    }
}



}