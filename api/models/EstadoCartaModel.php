<?php
class EstadoCartaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
        //Consulta sql
        $vSql = "SELECT * FROM estado_carta;";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        //Consulta sql
        $vSql = "SELECT * FROM estado_carta where idEstadoCarta=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado[0];
    }
}
