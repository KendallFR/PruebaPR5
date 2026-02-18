<?php
class SubastaModel
{
	public $enlace;
	public function __construct()
	{
		$this->enlace = new MySqlConnect();
	}

    public function all()
	{
        try{
            $cartaM = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
		    $vSql = "SELECT idSubasta,idCarta,fechaInicio,fechaCierre,precio,incrementoMin FROM subasta order by idSubasta desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
		    if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    //Carta
                    $vResultado[$i]->carta = $cartaM->get($vResultado[$i]->idCarta);
                    //Estado
                    $vResultado[$i]->estadoSubasta = $estadoSubastaM->get($vResultado[$i]->idEstadoSubasta);
                }
		    }
		    return $vResultado;
	    } catch (Exception $e) {
            handleException($e);
        }
    }
	public function getSubastasbyEstado($id)
	{
        try{
            $cartaM = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
		    $vSql = "SELECT idSubasta,idEstadoSubasta,idCarta,fechaInicio,fechaCierre,precio,incrementoMin FROM subasta where idEstadoSubasta = $id order by idSubasta desc;";
		    $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    //Carta
                    $vResultado[$i]->carta = $cartaM->get($vResultado[$i]->idCarta);
                    //Estado
                    $vResultado[$i]->estadoSubasta = $estadoSubastaM->get($vResultado[$i]->idEstadoSubasta);
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
            $vSql = "SELECT * FROM subasta where idSubasta=$id;";
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