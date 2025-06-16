import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {

  const [data, setData] = useState([]);

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
