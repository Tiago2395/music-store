import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {

  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id);

    if(itemExists != -1) { //Si ya está el item en el carrito:
      const updatedCart = [...cart]; //Hacemos una copia del carrito actual
      updatedCart[itemExists].amount++; //Aumentamos la cantidad del item elegido
      setCart(updatedCart); //Actualizamos el carrito
    } else { //Si no está el item en el carrito
      item.amount = 1;  //Ponemos la cantidad en 1
      setCart((prevCart) => [...prevCart, item]); //Añadimos el item a continuación de lo que ya había
    }
  }

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => {
              return <Guitar
                key = {guitar.id} //key es obligatorio cuando iteramos una lista y debe ser único, usamos el de guitar porque sabemos que es único
                guitar = {guitar}
                addToCart = {addToCart} //Le pasamos la función addToCart a la guitarra
              />
            })}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
