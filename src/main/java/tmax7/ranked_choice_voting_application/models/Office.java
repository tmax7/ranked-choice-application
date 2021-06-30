package tmax7.ranked_choice_voting_application.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Office implements Serializable {
    private @Id @GeneratedValue Long id;
    private String name;

    public Office() {}

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Office office = (Office) o;
        return Objects.equals(id, office.id) &&
                Objects.equals(name, office.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
