import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {

  const initialCart = () => {
    const localStorageItems = localStorage.getItem('cart');
    return localStorageItems ? JSON.parse(localStorageItems) : [];
  }

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const MAX_ITEMS = 5;

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id);

    if(itemExists != -1) { //Si ya está el item en el carrito:
      const updatedCart = [...cart]; //Hacemos una copia del carrito actual
      if (updatedCart[itemExists].amount < MAX_ITEMS) {
        updatedCart[itemExists].amount++; //Aumentamos la cantidad del item elegido
        setCart(updatedCart); //Actualizamos el carrito
      }
    } else { //Si no está el item en el carrito
      item.amount = 1;  //Ponemos la cantidad en 1
      setCart((prevCart) => [...prevCart, item]); //Añadimos el item a continuación de lo que ya había
    }
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if(item.id === id && item.amount < MAX_ITEMS) {
        return {
          ...item,
          amount: item.amount + 1
        }
      }
      return item;
    });
    setCart(updatedCart);
  }

  function removeFromCart(id) {
    setCart( (prevCart) => prevCart.filter(guitar => guitar.id !== id));
  }

  function removeOneFromCart(id) {
    const updatedCart = cart.map((item) => {
      if(item.id === id) {
        if(item.amount > 1) {
          return {
            ...item,
            amount: item.amount - 1
          }
        } else {
          return null;
        }
      }
      return item;
    }).filter(item => item !== null);
    setCart(updatedCart);
  }

  /* El código anterior hace lo mismo que este pero es más óptimo
  function removeOneFromCart(id) {
    const index = cart.findIndex(guitar => guitar.id === id);
    const updatedCart = [...cart];
    if (updatedCart[index].amount > 1) {
      updatedCart[index].amount--;
      setCart(updatedCart);
    } else {
      removeFromCart(id);
    }
  }
  */

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <>
      <Header 
        cart={cart}
        increaseQuantity={increaseQuantity}
        removeFromCart={removeFromCart}
        removeOneFromCart={removeOneFromCart}
        setCart={setCart}
      />

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
