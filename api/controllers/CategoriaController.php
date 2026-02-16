<?php
class categoria
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $categoria = new CategoriaModel();
            $result = $categoria->all();
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
            $categoria = new CategoriaModel();
            $result = $categoria->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function getCategoriaCarta($id)
    {
        try {
            $response = new Response();
            $categoria = new CategoriaModel();
            $result = $categoria->getCategoriaCarta($id);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function getCartasbyCategoria($param)
    {
        try {
            $response = new Response();
            $categoria = new CategoriaModel();
            $result = $categoria->getCartasbyCategoria($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}
