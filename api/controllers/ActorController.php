<?php
class actor
{
    public function index()
    {
        try {
            $response = new Response();
            //Obtener el listado del Modelo
            $actor = new actorModel();
            $result = $actor->all();
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
            $actor = new actorModel();
            $result = $actor->get($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function getactorMovie($id)
    {
        try {
            $response = new Response();
            $actor = new actorModel();
            $result = $actor->getactorMovie($id);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function getActorMoviesRol($param)
    {
        try {
            $response = new Response();
            $actor = new actorModel();
            $result = $actor->getActorMoviesRol($param);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}
