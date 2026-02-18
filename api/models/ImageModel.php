<?php
class ImageModel
{
    private $upload_path = 'uploads/';
    private $valid_extensions = array('jpeg', 'jpg', 'png', 'gif');

    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    //Subir imagen de una pelicula registrada
    public function uploadFile($object)
    {
        return false;
    }
    //Obtener una imagen de una pelicula
    public function getImageCarta($idCarta)
    {
        try{
            $vSql = "SELECT * FROM imagen_carta where idCarta=$idCarta";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) {
                return $vResultado[0];
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
