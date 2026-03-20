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


public function insertImageCarta($idCarta, $file)
{
    // ✅ Nombre original sin time()
    $nombre = $file['name'];
    $ruta   = "uploads/" . $nombre;

    move_uploaded_file($file['tmp_name'], $ruta);

    // ✅ Tabla imagen_carta, columna imagen (igual que getImageCarta)
    $sql = "INSERT INTO imagen_carta (idCarta, imagen)
            VALUES ($idCarta, '$nombre')";

    return $this->enlace->executeSQL_DML($sql);
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

