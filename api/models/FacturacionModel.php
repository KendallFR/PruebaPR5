<?php
class FacturacionModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function getAll()
    {
        try {
            $usuarioM = new UsuarioModel();
            $subastaM = new SubastaModel();
            $vSql = "SELECT f.*, ef.descripcion as estadoDescripcion 
                     FROM facturacion f
                     JOIN estado_facturacion ef ON f.idEstadoFacturacion = ef.idEstadoFacturacion
                     ORDER BY f.idFacturacion DESC";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado) && is_array($vResultado)) {
                for ($i = 0; $i < count($vResultado); $i++) {
                    $vResultado[$i]->usuario = $usuarioM->get($vResultado[$i]->idUsuario);
                    $vResultado[$i]->subasta = $subastaM->get($vResultado[$i]->idSubasta);
                }
            }
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getBySubasta($idSubasta)
    {
        try {
            $vSql = "SELECT * FROM facturacion WHERE idSubasta = $idSubasta LIMIT 1";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) return $vResultado[0];
            return null;
        } catch (Exception $e) {
            handleException($e);
        }
    }
public function crearDesdeSubasta($idSubasta, $idUsuario, $monto)
{
    try {
        // Verificar que no exista ya un pago para esta subasta
        $existe = $this->getBySubasta($idSubasta);
        if ($existe) return $existe;

        $sql = "INSERT INTO facturacion (idEstadoFacturacion, idUsuario, fechaFactura, resultado, monto, idSubasta)
                VALUES (1, $idUsuario, NOW(), 'Pendiente', $monto, $idSubasta)";

        $id = $this->enlace->executeSQL_DML_last($sql);

        if (!$id) return null;

        $vSql      = "SELECT * FROM facturacion WHERE idFacturacion = $id";
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        if (!empty($vResultado)) return $vResultado[0];
        return null;
    } catch (Exception $e) {
        handleException($e);
        return null;
    }
}

    public function confirmarPago($idFacturacion)
    {
        try {
            $sql = "UPDATE facturacion SET idEstadoFacturacion = 2, resultado = 'Confirmado'
                    WHERE idFacturacion = $idFacturacion";
            $this->enlace->executeSQL_DML($sql);

            $vSql = "SELECT * FROM facturacion WHERE idFacturacion = $idFacturacion";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            if (!empty($vResultado)) return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }
}