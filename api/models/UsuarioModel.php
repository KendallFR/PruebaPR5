<?php

use Firebase\JWT\JWT;

class UsuarioModel
{
	public $enlace;
	public function __construct()
	{

		$this->enlace = new MySqlConnect();
	}
	public function all()
	{
		//Consulta sql
		$vSql = "SELECT * FROM usuario order by idUsuario asc;";

		//Ejecutar la consulta
		$vResultado = $this->enlace->ExecuteSQL($vSql);
		if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i <= count($vResultado) - 1; $i++) {
                $vResultado[$i] = $this->get($vResultado[$i]->idUsuario);
            }
		}
		// Retornar el objeto
		return $vResultado;
	}

	public function get($id)
	{
		$vResultado = null;
        $rolM = new RolModel();
        $estadoUsuarioM = new EstadoUsuarioModel();
        //Consulta sql
        $vSql = "SELECT * FROM usuario where idUsuario=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        if (!empty($vResultado)) {
            $vResultado = $vResultado[0];
            //Rol
            $vResultado->rol = $rolM->get($vResultado->idRol);
            //Estado
            $vResultado->estado = $estadoUsuarioM->get($vResultado->idEstadoUsuario);
        }
        // Retornar el objeto
        return $vResultado;
	}

	public function getUsuario($idUsuario){
		$vSql = "SELECT * FROM usuario where idUsuario=$idUsuario";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        if (!empty($vResultado)) {
            // Retornar el objeto
            return $vResultado[0];
        }
        return $vResultado;
	}

	public function cantidadPujasSubastas($idUsuario){
        $vResultado = null;
        $rolM = new RolModel();
        $estadoUsuarioM = new EstadoUsuarioModel();

		$vSql = "SELECT 
                        u.idUsuario,
                        u.nombre,
                        u.idRol,
                        u.idEstadoUsuario,
                        u.fechaRegistro,

    -- Cantidad de subastas creadas
                        (SELECT COUNT(*) 
                        FROM subasta s 
                        WHERE s.idUsuario = u.idUsuario) 
                        AS cantidadSubastas,

    -- Cantidad de pujas realizadas
                        (SELECT COUNT(*) 
                        FROM puja p 
                        WHERE p.idUsuario = u.idUsuario) 
                        AS cantidadPujas

                        FROM usuario u
                        WHERE u.idusuario = $idUsuario;";

		//Ejecutar la consulta
		$vResultado = $this->enlace->ExecuteSQL($vSql);
		if (!empty($vResultado)) {
            $vResultado = $vResultado[0];
            //Rol
            $vResultado->rol = $rolM->get($vResultado->idRol);
            //Estado
            $vResultado->estado = $estadoUsuarioM->get($vResultado->idEstadoUsuario);
        }
		return $vResultado;
	}
	public function login($objeto)
	{
		
		return false;
		
	}
	public function create($objeto)
	{

		return false;
	}
}