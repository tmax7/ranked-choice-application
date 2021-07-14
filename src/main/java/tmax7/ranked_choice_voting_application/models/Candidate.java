package tmax7.ranked_choice_voting_application.models;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Candidate implements Serializable {
    private @Id @GeneratedValue Long id;
    private PersonalName name;
    @ManyToOne
    private Party party;

    public Candidate() {}

    public Candidate(PersonalName name, Party party) {
        this.name = name;
        this.party = party;
    }

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

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Candidate candidate = (Candidate) o;
        return Objects.equals(id, candidate.id) &&
                Objects.equals(name, candidate.name) &&
                Objects.equals(party, candidate.party);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, party);
    }
}
