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
        //Consulta sql
        $vSql = "SELECT * FROM categoria;";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado;
    }

    public function get($id)
    {
        //Consulta sql
        $vSql = "SELECT * FROM categoria where idCategoria=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado[0];
    }
    public function getCategoriaCarta($id)
    {
        //Consulta sql
        $vSql = "SELECT g.idCategoria,g.descripcion 
            FROM categoria g,carta_categoria mg 
            where mg.idCategoria=g.idCategoria and mg.idCarta=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado;
    }
    public function getCartasbyCategoria($param)
    {
        $vResultado = null;
        if (!empty($param)) {
            $vSql = "SELECT m.idCarta, m.nombre, m.descripcion, m.idUsuario, m.idEstadoCarta, m.idCondicion, m.fechaRegistro
				FROM carta_categoria mg, carta m
				where mg.idCarta=m.idCarta and mg.idCategoria=$param";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
        }
        // Retornar el objeto
        return $vResultado;
    }
}
