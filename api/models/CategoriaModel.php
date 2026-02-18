<?php
class CategoriaModel
{
    public $enlace;
    public function __construct()
    {

        $this->enlace = new MySqlConnect();
    }
    public function all()
    {
        try{
            $vSql = "SELECT * FROM categoria;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try{
            $vSql = "SELECT * FROM categoria where idCategoria=$id";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getCategoriaCarta($idCarta)
    {
        try{
            $vSql = "SELECT g.idCategoria,g.descripcion 
            FROM categoria g,carta_categoria mg 
            where mg.idCategoria=g.idCategoria and mg.idCarta=$idCarta";

            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getCartasbyCategoria($param)
    {
        try{
            $vResultado = null;
            if (!empty($param)) {
                $vSql = "SELECT m.idCarta, m.nombre, m.descripcion, m.idUsuario, m.idEstadoCarta, m.idCondicion, m.fechaRegistro
				FROM carta_categoria mg, carta m
				where mg.idCarta=m.idCarta and mg.idCategoria=$param";
                $vResultado = $this->enlace->ExecuteSQL($vSql);
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
