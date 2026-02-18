<?php
class CondicionModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    public function all()
    {
        try {
            $vSql = "SELECT * FROM condicion;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM condicion WHERE idCondicion = $id";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0]; 
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
