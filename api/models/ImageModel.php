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
    public function uploadFile($object)
    {
        return false;
    }

    public function getImageCarta($idCarta)
    {
        try{
            $vSql = "SELECT * FROM imagen_carta where idCarta=$idCarta order by id desc";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
