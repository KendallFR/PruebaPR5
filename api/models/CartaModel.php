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

            $sql = "SELECT 
                        c.idCarta,
                        c.nombre,
                        c.descripcion,
                        c.idUsuario,
                        c.idEstadoCarta,
                        c.idCondicion,
                        c.fechaRegistro,

                        (SELECT COUNT(*) 
                        FROM subasta s 
                        WHERE s.idCarta = c.idCarta)
                        AS cantidadSubastas

                    FROM carta c
                    ORDER BY c.idCarta DESC";

            $resultado = $this->enlace->ExecuteSQL($sql);

            if (!empty($resultado) && is_array($resultado))
            {
                $imagenM = new ImageModel();
                $categoriaM = new CategoriaModel();

                $usuarioM = new UsuarioModel();
                $estadoCartaM = new EstadoCartaModel();
                $condicionM = new CondicionModel(); 

                foreach ($resultado as $item)
                {
                    $idCarta = $item->idCarta;

                    // Imagen
                    $item->imagen = $imagenM->getImageCarta($idCarta);

                    // Categorias
                    $item->categorias = $categoriaM->getCategoriaCarta($idCarta);

                    // Usuario dueño
                    $item->usuario = $usuarioM->get($item->idUsuario);

                    // Estado carta renombrado
                    $item->estadoCarta = $estadoCartaM->get($item->idEstadoCarta);

                    // Condición
                    $item->condicion = $condicionM->get($item->idCondicion);

                    // quita el antiguo idEstadoCarta para que no se vea duplicado
                    unset($item->idEstadoCarta);
                }
            }

            return $resultado;

        } catch (Exception $e) {

            handleException($e);
        }
    }


    /* 
       OBTENER UNA CARTA
       */
    public function get($idCarta)
    {
        try {

            $sql = "SELECT 
                        c.idCarta,
                        c.nombre,
                        c.descripcion,
                        c.idUsuario,
                        c.idEstadoCarta,
                        c.idCondicion,
                        c.fechaRegistro,

                        (SELECT COUNT(*) 
                        FROM subasta s 
                        WHERE s.idCarta = c.idCarta)
                        AS cantidadSubastas

                    FROM carta c
                    WHERE c.idCarta = $idCarta";

            $resultado = $this->enlace->ExecuteSQL($sql);

            if (!empty($resultado))
            {
                $resultado = $resultado[0];

                $imagenM = new ImageModel();
                $categoriaM = new CategoriaModel();
                $usuarioM = new UsuarioModel();
                $estadoCartaM = new EstadoCartaModel();
                $condicionM = new CondicionModel(); 

                // Imagen
                $resultado->imagen = $imagenM->getImageCarta($idCarta);

                // Categorias
                $resultado->categorias = $categoriaM->getCategoriaCarta($idCarta);

                // Usuario dueño
                $resultado->usuario = $usuarioM->get($resultado->idUsuario);

                // Estado carta renombrado
                $resultado->estadoCarta = $estadoCartaM->get($resultado->idEstadoCarta);

                // Condición
                $resultado->condicion = $condicionM->get($resultado->idCondicion);

                // quita el antiguo idEstadoCarta
                unset($resultado->idEstadoCarta);
            }

            return $resultado;

        } catch (Exception $e) {

            handleException($e);
        }
    }
}
