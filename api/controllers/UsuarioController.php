<?php
class usuario
{
    public function index()
    {
        try {
            $response = new Response();
            $usuario = new UsuarioModel();
            $result = $usuario->all();
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
            $usuario = new UsuarioModel();
            $result = $usuario->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }
    public function login()
    {
        $response = new Response();
        $request = new Request();
        //Obtener json enviado
        $inputJSON = $request->getJSON();
        $usuario = new UsuarioModel();
        $result = $usuario->login($inputJSON);
        if (isset($result) && !empty($result) && $result != false) {
            $response->toJSON($result);
        } else {
            $response->toJSON($response, "Usuario no valido");
        }
    }
    public function create()
{
    try {

        $request = new Request();
        $response = new Response();

        // Obtener JSON enviado
        $inputJSON = $request->getJSON();

        // Instancia modelo
        $usuario = new UsuarioModel();

        // Ejecutar create
        $result = $usuario->create($inputJSON);

        // Respuesta
        $response->toJSON($result);

    } catch (Exception $e) {

        handleException($e);

    }
}
}