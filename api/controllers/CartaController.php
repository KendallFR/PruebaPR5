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
        $response   = new Response();
        $cartaM     = new CartaModel();
        $imagenM    = new ImageModel();
        $categoriaM = new CategoriaModel();

        $data = (object) $_POST;

        // Validar campos obligatorios
        if (empty($data->nombre) || empty($data->idCondicion) || empty($data->idEstadoCarta)) {
            $response->toJSON(["error" => "Faltan campos obligatorios"]);
            return;
        }

        // 1. Crear carta
        $result  = $cartaM->create($data);
        $idCarta = $result['idCarta'];

        // 2. Categorías — vienen como categorias[] del FormData
        if (!empty($_POST['categorias']) && is_array($_POST['categorias'])) {
            foreach ($_POST['categorias'] as $idCategoria) {
                $categoriaM->insertCategoriaCarta($idCarta, intval($idCategoria));
            }
        }

        // 3. Imágenes
        if (!empty($_FILES['imagenes']['name'][0])) {
            foreach ($_FILES['imagenes']['tmp_name'] as $key => $tmp_name) {
                if ($_FILES['imagenes']['error'][$key] === UPLOAD_ERR_OK) {
                    $file = [
                        'name'     => $_FILES['imagenes']['name'][$key],
                        'tmp_name' => $tmp_name,
                    ];
                    $imagenM->insertImageCarta($idCarta, $file);
                }
            }
        }

        $response->toJSON(["success" => true, "idCarta" => $idCarta]);

    } catch (Exception $e) {
        handleException($e);
    }
}

public function update($id)
{
    try {
        $response = new Response();

        $data = (object) $_POST;

        $cartaM = new CartaModel();
        $result = $cartaM->update($id, $data);

        $response->toJSON($result);

    } catch (Exception $e) {
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