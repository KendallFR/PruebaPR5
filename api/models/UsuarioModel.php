<?php
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
            $rolM = new RolModel();
            $estadoUsuarioM = new EstadoUsuarioModel();
		    $vSql = "SELECT * FROM usuario order by idUsuario desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
		    if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    //Rol
                    $vResultado[$i]->rol = $rolM->get($vResultado[$i]->idRol);
                    //Estado
                    $vResultado[$i]->estadoUsuario = $estadoUsuarioM->get($vResultado[$i]->idEstadoUsuario);
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
            $rolM = new RolModel();
            $estadoUsuarioM = new EstadoUsuarioModel();

		    $vSql = "SELECT 
                        u.idUsuario,
                        u.cedula,
                        u.nombre,
                        u.email,
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
                        WHERE u.idusuario = $id;";

		    $vResultado = $this->enlace->ExecuteSQL($vSql);
		    if (!empty($vResultado)) {
                $vResultado = $vResultado[0];
            //Rol
                $vResultado->rol = $rolM->get($vResultado->idRol);
            //Estado
                $vResultado->estadoUsuario = $estadoUsuarioM->get($vResultado->idEstadoUsuario);
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