package tmax7.ranked_choice_voting_application.models;

import tmax7.ranked_choice_voting_application.models.PersonalName;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Voter implements Serializable {
    private @Id @GeneratedValue Long id;
    private PersonalName name;

    public Voter() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PersonalName getName() {
        return name;
    }

    public void setName(PersonalName name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Voter voter = (Voter) o;
        return Objects.equals(id, voter.id) &&
                Objects.equals(name, voter.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
