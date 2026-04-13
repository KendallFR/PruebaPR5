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
        try {
            $cartaM         = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
            $usuarioM       = new UsuarioModel();

            // Cerrar subastas vencidas que siguen en estado activo
            $vencidas = $this->enlace->ExecuteSQL(
                "SELECT idSubasta FROM subasta WHERE idEstadoSubasta = 1 AND fechaCierre <= NOW()"
            );
            if (!empty($vencidas) && is_array($vencidas)) {
                foreach ($vencidas as $v) {
                    $this->verificarYCerrar($v->idSubasta);
                }
            }

            // Solo traer las que siguen activas (estado 1 Y fecha no vencida)
            $vSql = "SELECT
                        u.idSubasta,
                        u.fechaInicio,
                        u.fechaCierre,
                        u.precio,
                        u.incrementoMin,
                        u.idEstadoSubasta,
                        u.idUsuario,
                        u.idCarta,
                        (SELECT COUNT(*) FROM puja s WHERE s.idSubasta = u.idSubasta) AS cantidadPujas
                     FROM subasta u
                     WHERE u.idEstadoSubasta = 1
                       AND u.fechaCierre > NOW()
                     ORDER BY idSubasta DESC";

            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    $vResultado[$i]->carta         = $cartaM->get($vResultado[$i]->idCarta);
                    $vResultado[$i]->estadoSubasta = $estadoSubastaM->get($vResultado[$i]->idEstadoSubasta);
                    $vResultado[$i]->creador       = $usuarioM->get($vResultado[$i]->idUsuario);
                }
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function allSubastasFinalizadas()
    {
        try {
            $cartaM         = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
            $usuarioM       = new UsuarioModel();
            $vSql = "SELECT
                        u.idSubasta,
                        u.fechaInicio,
                        u.fechaCierre,
                        u.precio,
                        u.incrementoMin,
                        u.idEstadoSubasta,
                        u.idUsuario,
                        u.idCarta,
                        (SELECT COUNT(*) FROM puja s WHERE s.idSubasta = u.idSubasta) AS cantidadPujas
                     FROM subasta u
                     WHERE u.idEstadoSubasta = 2 OR u.idEstadoSubasta = 3
                     ORDER BY idSubasta DESC";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    $vResultado[$i]->carta         = $cartaM->get($vResultado[$i]->idCarta);
                    $vResultado[$i]->estadoSubasta = $estadoSubastaM->get($vResultado[$i]->idEstadoSubasta);
                    $vResultado[$i]->creador       = $usuarioM->get($vResultado[$i]->idUsuario);
                }
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $cartaM         = new CartaModel();
            $estadoSubastaM = new EstadoSubastaModel();
            $usuarioM       = new UsuarioModel();
            $vSql = "SELECT
                        u.idSubasta,
                        u.fechaInicio,
                        u.fechaCierre,
                        u.precio,
                        u.incrementoMin,
                        u.idEstadoSubasta,
                        u.idUsuario,
                        u.idCarta,
                        (SELECT COUNT(*) FROM puja s WHERE s.idSubasta = u.idSubasta) AS cantidadPujas
                     FROM subasta u
                     WHERE u.idSubasta = $id
                     ORDER BY idSubasta DESC";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) {
                $vResultado              = $vResultado[0];
                $vResultado->carta       = $cartaM->get($vResultado->idCarta);
                $vResultado->estadoSubasta = $estadoSubastaM->get($vResultado->idEstadoSubasta);
                $vResultado->creador     = $usuarioM->get($vResultado->idUsuario);
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getSubastaCarta($idCarta)
    {
        try {
            $vSql       = "SELECT * FROM subasta WHERE idCarta = $idCarta";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($objeto)
    {
        try {
            $sql = "INSERT INTO subasta
                        (fechaInicio, fechaCierre, precio, incrementoMin, idUsuario, idEstadoSubasta, idCarta)
                    VALUES
                        (
                            '$objeto->fechaInicio',
                            '$objeto->fechaCierre',
                            $objeto->precio,
                            $objeto->incrementoMin,
                            $objeto->idUsuario,
                            1,
                            $objeto->idCarta
                        )";
            $idSubasta = $this->enlace->executeSQL_DML_last($sql);
            return $this->get($idSubasta);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($objeto)
    {
        try {
            $sql = "UPDATE subasta SET
                        fechaInicio   = '$objeto->fechaInicio',
                        fechaCierre   = '$objeto->fechaCierre',
                        precio        = $objeto->precio,
                        incrementoMin = $objeto->incrementoMin
                    WHERE idSubasta = $objeto->idSubasta";
            $this->enlace->executeSQL_DML($sql);
            return $this->get($objeto->idSubasta);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function delete($objeto)
    {
        try {
            $sql = "UPDATE subasta
                    SET idEstadoSubasta = $objeto->idEstadoSubasta
                    WHERE idSubasta = $objeto->idSubasta";
            $this->enlace->executeSQL_DML($sql);
            return $this->get($objeto->idSubasta);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function cerrarSubasta($idSubasta)
    {
        try {
            $sql = "UPDATE subasta SET idEstadoSubasta = 2 WHERE idSubasta = $idSubasta";
            $this->enlace->executeSQL_DML($sql);
            return $this->get($idSubasta);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function verificarYCerrar($idSubasta)
    {
        try {
            $vSql       = "SELECT * FROM subasta WHERE idSubasta = $idSubasta";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (empty($vResultado)) return null;

            $subasta = $vResultado[0];

            // Si ya está finalizada o cancelada no hacer nada
            if ($subasta->idEstadoSubasta != 1) {
                return $this->get($idSubasta);
            }

            $ahora  = new DateTime();
            $cierre = new DateTime($subasta->fechaCierre);

            if ($ahora >= $cierre) {
                $this->cerrarSubasta($idSubasta);

                $pujaM      = new PujaModel();
                $pujaMaxima = $pujaM->getPujaMaxima($idSubasta);

                if ($pujaMaxima) {
                    $facturacionM = new FacturacionModel();
                    $facturacionM->crearDesdeSubasta($idSubasta, $pujaMaxima->idUsuario, $pujaMaxima->montoOfertado);
                }
            }

            return $this->get($idSubasta);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
