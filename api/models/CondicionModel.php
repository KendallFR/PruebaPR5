<?php

class CondicionModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* 
    OBTENER TODAS LAS CONDICIONES
      */
    public function all()
    {
        try {
            $sql = "SELECT * FROM condicion;";
            $resultado = $this->enlace->ExecuteSQL($sql);
            return $resultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* 
    OBTENER UNA CONDICION POR ID
      */
    public function get($id)
    {
        try {
            $sql = "SELECT * FROM condicion WHERE idCondicion = $id";
            $resultado = $this->enlace->ExecuteSQL($sql);
            if (!empty($resultado)) {
                return $resultado[0]; 
            }
            return null;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
