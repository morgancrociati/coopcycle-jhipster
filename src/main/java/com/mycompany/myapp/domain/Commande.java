package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.Preparation;

import com.mycompany.myapp.domain.enumeration.Livraison;

import com.mycompany.myapp.domain.enumeration.MoyenDePayement;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat_prep", nullable = false)
    private Preparation etatPrep;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat_liv", nullable = false)
    private Livraison etatLiv;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "paiement", nullable = false)
    private MoyenDePayement paiement;

    @ManyToOne
    @JsonIgnoreProperties("commandes")
    private Restaurant restaurant;

    @ManyToOne
    @JsonIgnoreProperties("commandes")
    private Compte livreur;

    @ManyToOne
    @JsonIgnoreProperties("commandes")
    private Compte client;

    @OneToOne(mappedBy = "numCommande")
    @JsonIgnore
    private Panier numPanier;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Preparation getEtatPrep() {
        return etatPrep;
    }

    public Commande etatPrep(Preparation etatPrep) {
        this.etatPrep = etatPrep;
        return this;
    }

    public void setEtatPrep(Preparation etatPrep) {
        this.etatPrep = etatPrep;
    }

    public Livraison getEtatLiv() {
        return etatLiv;
    }

    public Commande etatLiv(Livraison etatLiv) {
        this.etatLiv = etatLiv;
        return this;
    }

    public void setEtatLiv(Livraison etatLiv) {
        this.etatLiv = etatLiv;
    }

    public MoyenDePayement getPaiement() {
        return paiement;
    }

    public Commande paiement(MoyenDePayement paiement) {
        this.paiement = paiement;
        return this;
    }

    public void setPaiement(MoyenDePayement paiement) {
        this.paiement = paiement;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Commande restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Compte getLivreur() {
        return livreur;
    }

    public Commande livreur(Compte compte) {
        this.livreur = compte;
        return this;
    }

    public void setLivreur(Compte compte) {
        this.livreur = compte;
    }

    public Compte getClient() {
        return client;
    }

    public Commande client(Compte compte) {
        this.client = compte;
        return this;
    }

    public void setClient(Compte compte) {
        this.client = compte;
    }

    public Panier getNumPanier() {
        return numPanier;
    }

    public Commande numPanier(Panier panier) {
        this.numPanier = panier;
        return this;
    }

    public void setNumPanier(Panier panier) {
        this.numPanier = panier;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", etatPrep='" + getEtatPrep() + "'" +
            ", etatLiv='" + getEtatLiv() + "'" +
            ", paiement='" + getPaiement() + "'" +
            "}";
    }
}
