<?php
class EstadoSubastaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    public function all()
    {
        try{
            $vSql = "SELECT * FROM estado_subasta;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
    public function get($id)
    {
        try{
            $vSql = "SELECT * FROM estado_subasta where idEstadoSubasta=$id";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }
}