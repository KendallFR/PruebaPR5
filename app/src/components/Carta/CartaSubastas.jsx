import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartaService from "../../services/CartaService";

export function CartaSubastas(){

  const { id } = useParams();

  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  const [subastas, setSubastas] = useState([]);
  const [carta, setCarta] = useState(null);

  useEffect(()=>{

    CartaService.getCartaById(id)
      .then(response=>{

        const data = response.data.data;

        setCarta(data);
        setSubastas(data.subasta || []);

      })
      .catch(error=>{
        console.log(error);
      });

  },[id]);

  if(!carta){
    return(
      <div style={{
        textAlign:"center",
        padding:"60px",
        color:"#fff"
      }}>
        <h2>Cargando historial...</h2>
      </div>
    )
  }

  const imagen = carta.imagenes?.[0]?.imagen;

  return(

    <div style={{
      maxWidth:"1000px",
      margin:"40px auto",
      padding:"35px",
      background:"rgba(10,18,40,0.9)",
      borderRadius:"14px",
      border:"1px solid rgba(255,255,255,0.08)",
      boxShadow:"0 10px 40px rgba(0,0,0,0.6)",
      color:"#fff"
    }}>

      <h1 style={{
        textAlign:"center",
        color:"#ffcb05",
        marginBottom:"35px"
      }}>
        Historial de Subastas Pokémon
      </h1>

      <div style={{
        display:"flex",
        gap:"30px",
        alignItems:"center",
        marginBottom:"30px",
        flexWrap:"wrap"
      }}>

        <img
          src={
            imagen
            ? `${BASE_URL}/${imagen}`
            : "/img/no-image.png"
          }
          alt={carta.nombre}
          style={{
            width:"150px",
            height:"200px",
            objectFit:"cover",
            borderRadius:"10px",
            border:"3px solid #ffcb05",
            boxShadow:"0 6px 18px rgba(0,0,0,0.5)"
          }}
        />

        <div>

          <h2 style={{
            color:"#6ea8ff",
            marginBottom:"10px"
          }}>
            {carta.nombre}
          </h2>

          <p style={{marginBottom:"8px"}}>
            Esta carta ha participado en
            <span style={{
              color:"#ffcb05",
              fontWeight:"bold",
              fontSize:"18px",
              margin:"0 6px"
            }}>
              {subastas.length}
            </span>
            subastas
          </p>

          <p style={{
            color:"#aaa",
            maxWidth:"500px"
          }}>
            {carta.descripcion}
          </p>

        </div>

      </div>

      <table style={{
        width:"100%",
        borderCollapse:"collapse",
        color:"#fff"
      }}>

        <thead>

          <tr style={{
            background:"#1f3c73"
          }}>
            <th style={{padding:"14px"}}>ID</th>
            <th style={{padding:"14px"}}>Precio Inicial</th>
            <th style={{padding:"14px"}}>Fecha Inicio</th>
            <th style={{padding:"14px"}}>Fecha Cierre</th>
          </tr>

        </thead>

        <tbody>

          {subastas.length > 0 ? (

            subastas.map((item)=>(

              <tr
                key={item.idSubasta}
                style={{
                  textAlign:"center",
                  borderBottom:"1px solid rgba(255,255,255,0.05)",
                  transition:"0.2s"
                }}
                onMouseEnter={(e)=> e.currentTarget.style.background="#162447"}
                onMouseLeave={(e)=> e.currentTarget.style.background="transparent"}
              >

                <td style={{padding:"12px"}}>
                  {item.idSubasta}
                </td>

                <td style={{
                  padding:"12px",
                  color:"#ffcb05",
                  fontWeight:"bold"
                }}>
                  ₡ {item.precio}
                </td>

                <td style={{padding:"12px"}}>
                  {item.fechaInicio}
                </td>

                <td style={{padding:"12px"}}>
                  {item.fechaCierre}
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="4" style={{
                padding:"20px",
                textAlign:"center",
                color:"#aaa"
              }}>
                Esta carta no ha participado en subastas
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

  )
}