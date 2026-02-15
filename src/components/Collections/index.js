import React, { useEffect, useState } from "react";
import Category from "../Category";
import { getCollections } from "../../services/getCollections";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCollections()
      .then(collections => {
        setCollections(collections);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return <Category name="Collections" options={collections} loading={loading} />;
}