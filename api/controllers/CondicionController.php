<?php
class condicion
{
    public function index()
    {
        try{
            $response = new Response();
            $condicion=new CondicionModel();
            $result=$condicion->all();
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
            $condicion=new CondicionModel();
            $result=$condicion->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }
}
