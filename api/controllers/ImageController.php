<?php
//class Genre
class image{
    //POST Crear
    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputFILE = $request->getBody();
            //Instancia del modelo
            $imagen = new ImageModel();
            //Acción del modelo a ejecutar
            $result = $imagen->uploadFile($inputFILE);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function getImageCarta($idCarta)
    {
        try{
            $response = new Response();
            $imagen = new ImageModel();
            $result = $imagen->getImageCarta($idCarta);
            $response->toJSON($result);
        }catch(Exception $e){
            $response->toJSON($result);
            handleException($e);
        }
    }

    public function delete($id)
{
    try {
        $response = new Response();
        $imagen   = new ImageModel();
        $result   = $imagen->deleteImage($id);
        $response->toJSON($result);
    } catch (Exception $e) {
        handleException($e);
    }
}

}