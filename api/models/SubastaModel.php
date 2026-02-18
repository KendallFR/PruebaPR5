<?php
class SubastaModel
{
	public $enlace;
	public function __construct()
	{
		$this->enlace = new MySqlConnect();
	}

	public function getSubastasActivas()
	{
        try{
		    $vSql = "SELECT idSubasta,idCarta,fechaInicio,fechaCierre,precio,incrementoMin FROM subasta where idEstadoSubasta = 1 order by idSubasta desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
		    return $vResultado;
	    } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getSubastasFinalizadas()
	{
        try{
		    $vSql = "SELECT idSubasta,idCarta,fechaInicio,fechaCierre,precio,incrementoMin FROM subasta where idEstadoSubasta = 2 order by idSubasta desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
		    return $vResultado;
	    } catch (Exception $e) {
            handleException($e);
        }
    }

	public function get($id)
	{
        try{
		    $vResultado = null;
            $cartaM = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
            $vSql = "SELECT * FROM subasta where idSubasta=$id";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) {
                $vResultado = $vResultado[0];
            //Carta
                $vResultado->carta = $cartaM->get($vResultado->idCarta);
            //Estado
                $vResultado->estadoSubasta = $estadoSubastaM->get($vResultado->idEstadoSubasta);
            //enlace
                $vResultado->enlace = "<a href='subasta.php?id=" . $vResultado->idSubasta . "'>Ver detalles</a>";
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
	}
}