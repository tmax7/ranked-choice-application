package tmax7.ranked_choice_voting_application.models;

import tmax7.ranked_choice_voting_application.models.Administrator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Election implements Serializable {
    private @Id @GeneratedValue Long id;
    private String name;
    private LocalDate date;
    private Administrator administrator;

    public Election() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Administrator getAdministrator() {
        return administrator;
    }

    public void setAdministrator(Administrator administrator) {
        this.administrator = administrator;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Election election = (Election) o;
        return Objects.equals(id, election.id) &&
                Objects.equals(name, election.name) &&
                Objects.equals(date, election.date) &&
                Objects.equals(administrator, election.administrator);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, date, administrator);
    }
}
