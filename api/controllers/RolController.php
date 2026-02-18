<?php
//class Genre
class rol
{
    //Listar en el API
    public function index()
    {
        try{
            $response = new Response();
            $rol=new RolModel();
            $result=$rol->all();
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
    public function get($id)
    {
        try{
            $response = new Response();
            $rol=new RolModel();
            $result=$rol->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}