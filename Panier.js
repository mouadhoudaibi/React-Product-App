import React from 'react';

function Panier({ panier, supprimerDuPanier }) {
  return (
    <div>
      <h2>Panier</h2>
      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        panier.map((produit) => (
          <div key={produit.id}>
            <h3>{produit.nom}</h3>
            <p>Prix: ${produit.prix}</p>
            <button onClick={() => supprimerDuPanier(produit.id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Panier;

