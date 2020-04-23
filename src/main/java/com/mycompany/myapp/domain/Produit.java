package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.Dispo;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "prix", nullable = false)
    private Float prix;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "disponibilite", nullable = false)
    private Dispo disponibilite;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("produits")
    private Restaurant restaurant;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "produit_panier",
               joinColumns = @JoinColumn(name = "produit_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "panier_id", referencedColumnName = "id"))
    private Set<Panier> paniers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Produit nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Float getPrix() {
        return prix;
    }

    public Produit prix(Float prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Float prix) {
        this.prix = prix;
    }

    public Dispo getDisponibilite() {
        return disponibilite;
    }

    public Produit disponibilite(Dispo disponibilite) {
        this.disponibilite = disponibilite;
        return this;
    }

    public void setDisponibilite(Dispo disponibilite) {
        this.disponibilite = disponibilite;
    }

    public String getDescription() {
        return description;
    }

    public Produit description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Produit restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Set<Panier> getPaniers() {
        return paniers;
    }

    public Produit paniers(Set<Panier> paniers) {
        this.paniers = paniers;
        return this;
    }

    public Produit addPanier(Panier panier) {
        this.paniers.add(panier);
        panier.getProduits().add(this);
        return this;
    }

    public Produit removePanier(Panier panier) {
        this.paniers.remove(panier);
        panier.getProduits().remove(this);
        return this;
    }

    public void setPaniers(Set<Panier> paniers) {
        this.paniers = paniers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prix=" + getPrix() +
            ", disponibilite='" + getDisponibilite() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
