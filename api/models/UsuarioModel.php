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
        try{
		    $vSql = "SELECT * FROM usuario order by idUsuario desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
		    if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i <= count($vResultado) - 1; $i++) {
                    $vResultado[$i] = $this->get($vResultado[$i]->idUsuario);
                }
		    }
		    return $vResultado;
	    } catch (Exception $e) {
            handleException($e);
        }
    }

	public function get($id)
	{
        try{
		    $vResultado = null;
            $rolM = new RolModel();
            $estadoUsuarioM = new EstadoUsuarioModel();
            $vSql = "SELECT * FROM usuario where idUsuario=$id";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) {
                $vResultado = $vResultado[0];
            //Rol
                $vResultado->rol = $rolM->get($vResultado->idRol);
            //Estado
                $vResultado->estado = $estadoUsuarioM->get($vResultado->idEstadoUsuario);
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
	}

	public function getUsuario($idUsuario)
    {
        try{
            $vResultado = null;
            $rolM = new RolModel();
            $estadoUsuarioM = new EstadoUsuarioModel();

		    $vSql = "SELECT 
                        u.idUsuario,
                        u.nombre,
                        u.idRol,
                        u.idEstadoUsuario,
                        u.fechaRegistro,

                        (SELECT COUNT(*) 
                        FROM subasta s 
                        WHERE s.idUsuario = u.idUsuario) 
                        AS cantidadSubastas,

                        (SELECT COUNT(*) 
                        FROM puja p 
                        WHERE p.idUsuario = u.idUsuario) 
                        AS cantidadPujas

                        FROM usuario u
                        WHERE u.idusuario = $idUsuario;";

		    $vResultado = $this->enlace->ExecuteSQL($vSql);
		    if (!empty($vResultado)) {
                $vResultado = $vResultado[0];
            //Rol
                $vResultado->rol = $rolM->get($vResultado->idRol);
            //Estado
                $vResultado->estado = $estadoUsuarioM->get($vResultado->idEstadoUsuario);
            }
		    return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
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