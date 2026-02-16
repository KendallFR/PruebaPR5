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
            $sql = "SELECT idCondicion, descripcion FROM condicion ORDER BY idCondicion ASC";
            $resultado = $this->enlace->ExecuteSQL($sql);
            return $resultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* 
       OBTENER UNA CONDICION POR ID
      */
    public function get($idCondicion)
    {
        try {
            $sql = "SELECT idCondicion, descripcion FROM condicion WHERE idCondicion = $idCondicion";
            $resultado = $this->enlace->ExecuteSQL($sql);

            if (!empty($resultado)) {
                return $resultado[0]; // Devuelve solo el objeto
            }

            return null;

        } catch (Exception $e) {
            handleException($e);
        }
    }
}
