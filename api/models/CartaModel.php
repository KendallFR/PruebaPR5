<?php
class CartaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* 
    LISTAR TODAS LAS CARTAS
       */
    public function all()
    {
        try {
            $imagenM = new ImageModel();
            $categoriaM = new CategoriaModel();
            $subastaM = new SubastaModel();
            $condicionM = new CondicionModel();
            $estadoCartaM = new EstadoCartaModel();
            $usuarioM = new UsuarioModel();
            $vSQL = "SELECT * FROM carta order by nombre desc;";
            $vResultado = $this->enlace->ExecuteSQL($vSQL);
            if(!empty($vResultado) && is_array($vResultado)){
                for($i=0; $i < count($vResultado); $i++){
                    //Imagenes
                    $vResultado[$i]->imagenes=$imagenM->getImageCarta($vResultado[$i]->idCarta);
                    //Categorias
                    $vResultado[$i]->categorias=$categoriaM->getCategoriaCarta($vResultado[$i]->idCarta);
                    //Condicion
                    $vResultado[$i]->condicion = $condicionM->get($vResultado[$i]->idCondicion);
                    // Usuario dueño
                    $vResultado[$i]->propietario = $usuarioM->get($vResultado[$i]->idUsuario);
                    // Estado carta
                    $vResultado[$i]->estadoCarta = $estadoCartaM->get($vResultado[$i]->idEstadoCarta);
                    // Subasta
                    $vResultado[$i]->subasta = $subastaM->getSubastaCarta($vResultado[$i]->idCarta);
                }
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function allCartasActivas()
	{
        try{
            $imagenM = new ImageModel();
            $categoriaM = new CategoriaModel();
            $subastaM = new SubastaModel();
            $condicionM = new CondicionModel();
            $estadoCartaM = new EstadoCartaModel();
            $usuarioM = new UsuarioModel();
		    $vSQL = "SELECT * FROM carta where idEstadoCarta = 1 order by nombre desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSQL);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    //Imagenes
                    $vResultado[$i]->imagenes=$imagenM->getImageCarta($vResultado[$i]->idCarta);
                    //Categorias
                    $vResultado[$i]->categorias=$categoriaM->getCategoriaCarta($vResultado[$i]->idCarta);
                    //Condicion
                    $vResultado[$i]->condicion = $condicionM->get($vResultado[$i]->idCondicion);
                    // Usuario dueño
                    $vResultado[$i]->propietario = $usuarioM->get($vResultado[$i]->idUsuario);
                    // Estado carta
                    $vResultado[$i]->estadoCarta = $estadoCartaM->get($vResultado[$i]->idEstadoCarta);
                    // Subasta
                    $vResultado[$i]->subasta = $subastaM->getSubastaCarta($vResultado[$i]->idCarta);
                }
		    }
		    return $vResultado;
	    } catch (Exception $e) {
            handleException($e);
        }
    }

    /* 
       OBTENER UNA CARTA
       */
    public function get($id)
    {
        try {
            $usuarioM = new UsuarioModel();
            $imagenM = new ImageModel();
            $subastaM = new SubastaModel();
            $estadoCartaM = new EstadoCartaModel();
            $categoriaM = new CategoriaModel();
            $condicionM = new CondicionModel();
            $vSql = "SELECT * FROM carta WHERE idCarta = $id;";
            $vResultado = $this->enlace->executeSQL($vSql);
            if (!empty($vResultado))
            {
                $vResultado = $vResultado[0];
                // Imagen
                $vResultado->imagenes = $imagenM->getImageCarta($vResultado->idCarta);
                // Categorias
                $vResultado->categorias = $categoriaM->getCategoriaCarta($id);
                // Usuario dueño
                $vResultado->propietario = $usuarioM->get($vResultado->idUsuario);
                // Estado carta
                $vResultado->estadoCarta = $estadoCartaM->get($vResultado->idEstadoCarta);
                // Condición
                $vResultado->condicion = $condicionM->get($vResultado->idCondicion);
                // Subasta
                $vResultado->subasta = $subastaM->getSubastaCarta($vResultado->idCarta);
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

 public function create($data)
{
    try {
        $sql = "INSERT INTO carta 
                (nombre, descripcion, idUsuario, idEstadoCarta, idCondicion, fechaRegistro)
                VALUES (
                    '$data->nombre',
                    '$data->descripcion',
                    $data->idUsuario,
                    $data->idEstadoCarta,
                    $data->idCondicion,
                    NOW()
                )";

        // ✅ executeSQL_DML_last retorna el insert_id directamente
        $idCarta = $this->enlace->executeSQL_DML_last($sql);

        return ["idCarta" => $idCarta];

    } catch (Exception $e) {
        handleException($e);
    }
}

public function update($id, $data)
{
    try {
        $sets = [];

        if (!empty($data->nombre))
            $sets[] = "nombre = '$data->nombre'";

        if (isset($data->descripcion))
            $sets[] = "descripcion = '$data->descripcion'";

        if (!empty($data->idEstadoCarta))
            $sets[] = "idEstadoCarta = " . intval($data->idEstadoCarta);

        if (!empty($data->idCondicion))
            $sets[] = "idCondicion = " . intval($data->idCondicion);

        if (empty($sets)) return ["updated" => 0];

        $sql = "UPDATE carta SET " . implode(', ', $sets) . " WHERE idCarta = $id";

        return $this->enlace->executeSQL_DML($sql);

    } catch (Exception $e) {
        handleException($e);
    }
}

public function delete($id)
{
    try {
        $sql = "DELETE FROM carta WHERE idCarta = $id";
        return $this->enlace->executeSQL_DML($sql);

    } catch (Exception $e) {
        handleException($e);
    }
}


}
