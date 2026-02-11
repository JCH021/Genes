import React, { useEffect, useState } from "react";
import Category from "../Category";
import { getCollections } from "../../services/getCollections";

export default function Collections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  return <Category name="Collections" options={collections} />;
}