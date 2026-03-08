<?php
class SubastaModel
{
	public $enlace;
	public function __construct()
	{
		$this->enlace = new MySqlConnect();
	}

	public function allSubastasActivas()
	{
        try{
            $cartaM = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
            $usuarioM = new UsuarioModel();
		    $vSql = "SELECT
                    u.idSubasta,
                    u.fechaInicio,
                    u.fechaCierre,
                    u.precio,
                    u.incrementoMin,
                    u.idEstadoSubasta,
                    u.idUsuario,
                    u.idCarta,

                    (SELECT COUNT(*) FROM puja s WHERE s.idSubasta = u.idSubasta) 
                    AS cantidadPujas

                    FROM subasta u where u.idEstadoSubasta = 1 order by idSubasta desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    //Carta
                    $vResultado[$i]->carta = $cartaM->get($vResultado[$i]->idCarta);
                    //Estado
                    $vResultado[$i]->estadoSubasta = $estadoSubastaM->get($vResultado[$i]->idEstadoSubasta);
                    //Usuario
                    $vResultado[$i]->creador = $usuarioM->get($vResultado[$i]->idUsuario);
                }
		    }
		    return $vResultado;
	    } catch (Exception $e) {
            handleException($e);
        }
    }
public function allSubastasFinalizadas()
	{
        try{
            $cartaM = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
            $usuarioM = new UsuarioModel();
		    $vSql = "SELECT
                    u.idSubasta,
                    u.fechaInicio,
                    u.fechaCierre,
                    u.precio,
                    u.incrementoMin,
                    u.idEstadoSubasta,
                    u.idUsuario,
                    u.idCarta,

                    (SELECT COUNT(*) FROM puja s WHERE s.idSubasta = u.idSubasta) 
                    AS cantidadPujas

                    FROM subasta u where u.idEstadoSubasta = 2 or u.idEstadoSubasta = 3 order by idSubasta desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    //Carta
                    $vResultado[$i]->carta = $cartaM->get($vResultado[$i]->idCarta);
                    //Estado
                    $vResultado[$i]->estadoSubasta = $estadoSubastaM->get($vResultado[$i]->idEstadoSubasta);
                    //Usuario
                    $vResultado[$i]->creador = $usuarioM->get($vResultado[$i]->idUsuario);
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
            $cartaM = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
            $usuarioM = new UsuarioModel();
            $vSql = "SELECT
                    u.idSubasta,
                    u.fechaInicio,
                    u.fechaCierre,
                    u.precio,
                    u.incrementoMin,
                    u.idEstadoSubasta,
                    u.idUsuario,
                    u.idCarta,

                    (SELECT COUNT(*) FROM puja s WHERE s.idSubasta = u.idSubasta) 
                    AS cantidadPujas

                    FROM subasta u where u.idSubasta = $id order by idSubasta desc;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) {
                $vResultado = $vResultado[0];
            //Carta
                $vResultado->carta = $cartaM->get($vResultado->idCarta);
            //Estado
                $vResultado->estadoSubasta = $estadoSubastaM->get($vResultado->idEstadoSubasta);
            //Usuario
                $vResultado->creador = $usuarioM->get($vResultado->idUsuario);    
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
	}
    public function getSubastaCarta($idCarta)
    {
        try{
            $vSql = "SELECT * FROM subasta where idCarta=$idCarta";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}