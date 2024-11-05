import React from 'react';

function Catalogue({ produits, ajouterAuPanier }) {
  return (
    <div>
      <h2>Catalogue de Produits</h2>
      {produits.map((produit) => (
        <div key={produit.id}>
          <h3>{produit.nom}</h3>
          <p>Prix: ${produit.price}</p>
          <button onClick={() => ajouterAuPanier(produit)}>Acheter</button>
        </div>
      ))}
    </div>
  );
}

export default Catalogue;
