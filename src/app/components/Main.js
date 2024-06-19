"use client";
import Image from "next/image";
import style from "../page.module.css";
import { useEffect, useState } from "react";

export default function Main() {
  const [listProduct, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const resposta = await fetch("https://fakestoreapi.com/products/");
      const data = await resposta.json();
      setProduct(data);
    };
    getProduct();
  }, []);

  const orderAz = () => {
    const listAux = [...listProduct].sort((a, b) => a.title.localeCompare(b.title));
    setProduct(listAux);
  };

  const orderZa = () => {
    const listAux = [...listProduct].sort((a, b) => b.title.localeCompare(a.title));
    setProduct(listAux);
  };

  const orderPrecoMenor = () => {
    const listAux = [...listProduct].sort((a, b) => a.price - b.price);
    setProduct(listAux);
  };

  const orderPrecoMaior = () => {
    const listAux = [...listProduct].sort((a, b) => b.price - a.price);
    setProduct(listAux);
  };

  return (
    <>
      <div className={style.filters}>
        <button onClick={orderAz}>A - Z</button>
        <button onClick={orderZa}>Z - A</button>
        <button onClick={orderPrecoMenor}>Menor preço</button>
        <button onClick={orderPrecoMaior}>Maior preço</button>
      </div>
      <main className={style.corpo}>
        {listProduct.map((product) => (
          <div className={style.card} key={product.id}>
            <h1>{product.title.slice(0, 16) + "..."}</h1>
            <Image
              width={300}
              height={300}
              src={product.image}
              alt={product.title}
              className={style.image}
            />
            <h3 className={style.preco}>R$: {product.price}</h3>
            <p>{product.description.slice(0, 100) + "..."}</p>
            <p>{product.category}</p>
          </div>
        ))}
      </main>
    </>
  );
}
