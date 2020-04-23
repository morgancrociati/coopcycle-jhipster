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

/**
 * A Compte.
 */
@Entity
@Table(name = "compte")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Compte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "pseudo", nullable = false, unique = true)
    private String pseudo;

    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Size(min = 8)
    @Column(name = "mot_de_passe", nullable = false)
    private String motDePasse;

    @ManyToMany(mappedBy = "adminsys")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Cooperative> adminsys = new HashSet<>();

    @ManyToMany(mappedBy = "admincoops")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Cooperative> admincoops = new HashSet<>();

    @ManyToMany(mappedBy = "numComptes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public Compte pseudo(String pseudo) {
        this.pseudo = pseudo;
        return this;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getEmail() {
        return email;
    }

    public Compte email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public Compte motDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
        return this;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public Set<Cooperative> getAdminsys() {
        return adminsys;
    }

    public Compte adminsys(Set<Cooperative> cooperatives) {
        this.adminsys = cooperatives;
        return this;
    }

    public Compte addAdminsys(Cooperative cooperative) {
        this.adminsys.add(cooperative);
        cooperative.getAdminsys().add(this);
        return this;
    }

    public Compte removeAdminsys(Cooperative cooperative) {
        this.adminsys.remove(cooperative);
        cooperative.getAdminsys().remove(this);
        return this;
    }

    public void setAdminsys(Set<Cooperative> cooperatives) {
        this.adminsys = cooperatives;
    }

    public Set<Cooperative> getAdmincoops() {
        return admincoops;
    }

    public Compte admincoops(Set<Cooperative> cooperatives) {
        this.admincoops = cooperatives;
        return this;
    }

    public Compte addAdmincoop(Cooperative cooperative) {
        this.admincoops.add(cooperative);
        cooperative.getAdmincoops().add(this);
        return this;
    }

    public Compte removeAdmincoop(Cooperative cooperative) {
        this.admincoops.remove(cooperative);
        cooperative.getAdmincoops().remove(this);
        return this;
    }

    public void setAdmincoops(Set<Cooperative> cooperatives) {
        this.admincoops = cooperatives;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Compte roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Compte addRole(Role role) {
        this.roles.add(role);
        role.getNumComptes().add(this);
        return this;
    }

    public Compte removeRole(Role role) {
        this.roles.remove(role);
        role.getNumComptes().remove(this);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Compte)) {
            return false;
        }
        return id != null && id.equals(((Compte) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Compte{" +
            "id=" + getId() +
            ", pseudo='" + getPseudo() + "'" +
            ", email='" + getEmail() + "'" +
            ", motDePasse='" + getMotDePasse() + "'" +
            "}";
    }
}
