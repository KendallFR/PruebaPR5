<?php
class CartaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
        $imagenM = new ImageModel();
        $categoriaM = new CategoriaModel();
        //Consulta SQL
        $vSQL = "SELECT * FROM carta order by title desc;";
        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSQL);
        if(!empty($vResultado) && is_array($vResultado)){
            for($i=0; $i < count($vResultado); $i++){
                //Imagen
                $vResultado[$i]->imagen=$imagenM->getImageCarta($vResultado[$i]->id);
                //Categorias - categoria
                $vResultado[$i]->genres=$categoriaM->getCategoriaCarta($vResultado[$i]->id);
            }
        }
        //Retornar la respuesta
        return $vResultado;
    }
    public function get($id)
    {
        $usuarioM = new UsuarioModel();
        $estadoCartaM = new EstadoCartaModel();
        $categoriaM = new CategoriaModel();
        $actorM = new ActorModel();
        $imagenM = new ImageModel();
        $vSql = "SELECT * FROM carta
                    where id=$id;";

        //Ejecutar la consulta sql
        $vResultado = $this->enlace->executeSQL($vSql);
        if(!empty($vResultado)){
            $vResultado=$vResultado[0];
            //Imagen
            $vResultado->imagen=$imagenM->getImageMovie($vResultado->id);
            //Director
            $vResultado->director=$directorM->get($vResultado->director_id);
            //Generos - genres
            $vResultado->genres=$genreM->getGenreMovie($id);
            //Actores - actors
            $vResultado->actors=$actorM->getActorMovie($vResultado->id);
        }

        //Retornar la respuesta
        return $vResultado;
    }
}