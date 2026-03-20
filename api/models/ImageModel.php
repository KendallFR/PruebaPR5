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
        $file = $object['file'];
        $idCarta = $object['idCarta'];
        //Obtener la información del archivo
        $fileName = $file['name'];
        $tempPath = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileError = $file['error'];

        if (!empty($fileName)) {
            //Crear un nombre único para el archivo
            $fileExt = explode('.', $fileName);
            $fileActExt = strtolower(end($fileExt));
            $fileName = "carta-" . uniqid() . "." . $fileActExt;
            //Validar el tipo de archivo
            if (in_array($fileActExt, $this->valid_extensions)) {
                //Validar que no exista
                if (!file_exists($this->upload_path . $fileName)) {
                    //Validar que no sobrepase el tamaño
                    if ($fileSize < 2000000 && $fileError == 0) {
                        //Moverlo a la carpeta del servidor del API
                        if (move_uploaded_file($tempPath, $this->upload_path . $fileName)) {
                            //Guardarlo en la BD
                            $sql = "INSERT INTO imagen_carta (idCarta,imagen) VALUES ($idCarta, '$fileName')";
                            $vResultado = $this->enlace->executeSQL_DML($sql);
                            if ($vResultado > 0) {
                                return 'Imagen creada';
                            }
                            return false;
                        }
                    }
                }
            }
        }
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

