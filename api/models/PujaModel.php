<?php
class PujaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function getPujasbySubasta($idSubasta)
    {
        try{
            $usuarioM = new UsuarioModel();
            $vSql = "SELECT * FROM puja where idSubasta=$idSubasta";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    //usuario
                    $vResultado[$i]->usuario = $usuarioM->get($vResultado[$i]->idUsuario);
                    //Subasta
                }
		    }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}