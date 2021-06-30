package tmax7.ranked_choice_voting_application.models;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

public class Administrator implements Serializable {
    private String name;

    public Administrator() {}

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
        Administrator that = (Administrator) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}

