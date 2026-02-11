import React from "react";
import { Link } from "wouter";


export default function Category({ name, options = [] }) {
  return (
    <div className="Collection">
      <h3 className="Collection-title">{name}</h3>
      <ul className="Category-list">
        {options.map((singleOption) => (
          <li key={singleOption.id}>
            <Link to={`/collections/${singleOption.id}`}>
              {singleOption.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
