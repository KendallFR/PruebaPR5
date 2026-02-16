<?php

class CondicionController
{
    private $condicionM;

    public function __construct()
    {
        $this->condicionM = new CondicionModel();
    }

    /* 
       LISTAR TODAS LAS CONDICIONES
        */
    public function all()
    {
        $condiciones = $this->condicionM->all();

        return [
            "success" => true,
            "status" => 200,
            "message" => "Condiciones obtenidas correctamente",
            "data" => $condiciones
        ];
    }

    /* 
       OBTENER UNA CONDICION
        */
    public function get($idCondicion)
    {
        $condicion = $this->condicionM->get($idCondicion);

        if ($condicion) {
            return [
                "success" => true,
                "status" => 200,
                "message" => "Condición obtenida correctamente",
                "data" => $condicion
            ];
        }

        return [
            "success" => false,
            "status" => 404,
            "message" => "Condición no encontrada",
            "data" => null
        ];
    }
}
