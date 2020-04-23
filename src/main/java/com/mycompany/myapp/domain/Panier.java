package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.EtatPanier;

/**
 * A Panier.
 */
@Entity
@Table(name = "panier")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Panier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat_panier", nullable = false)
    private EtatPanier etatPanier;

    @OneToOne
    @JoinColumn(unique = true)
    private Commande numCommande;

    @ManyToMany(mappedBy = "paniers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Produit> produits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EtatPanier getEtatPanier() {
        return etatPanier;
    }

    public Panier etatPanier(EtatPanier etatPanier) {
        this.etatPanier = etatPanier;
        return this;
    }

    public void setEtatPanier(EtatPanier etatPanier) {
        this.etatPanier = etatPanier;
    }

    public Commande getNumCommande() {
        return numCommande;
    }

    public Panier numCommande(Commande commande) {
        this.numCommande = commande;
        return this;
    }

    public void setNumCommande(Commande commande) {
        this.numCommande = commande;
    }

    public Set<Produit> getProduits() {
        return produits;
    }

    public Panier produits(Set<Produit> produits) {
        this.produits = produits;
        return this;
    }

    public Panier addProduit(Produit produit) {
        this.produits.add(produit);
        produit.getPaniers().add(this);
        return this;
    }

    public Panier removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.getPaniers().remove(this);
        return this;
    }

    public void setProduits(Set<Produit> produits) {
        this.produits = produits;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Panier)) {
            return false;
        }
        return id != null && id.equals(((Panier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Panier{" +
            "id=" + getId() +
            ", etatPanier='" + getEtatPanier() + "'" +
            "}";
    }
}
