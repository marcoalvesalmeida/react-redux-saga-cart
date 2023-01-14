import React, { useEffect, useState } from "react";

import api from "../../services/api";
import { IProduct } from "../../store/modules/cart/types";
import CatalogItem from "../CatalogItem";

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await api.get("products");
      setCatalog(data);
    }

    getProducts();
  }, []);

  return (
    <main>
      <h1>Catálogo</h1>
      {catalog.map((product) => (
        <CatalogItem product={product} key={product.id} />
      ))}
    </main>
  );
};

export default Catalog;
