package tmax7.ranked_choice_voting_application.models;

import org.hibernate.annotations.SortNatural;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;

@Entity
@IdClass(RankedChoiceBallot.PrimaryKey.class)
public class RankedChoiceBallot implements Serializable {

    @Id
    @ManyToOne()
    private Office office;

    @OneToMany
    @SortNatural
    private SortedSet<RankedChoice> rankedChoiceSortedSet = new TreeSet<>();

    @Id
    @ManyToOne()
    private Voter voter;

    @Id
    @ManyToOne()
    private Election election;

    public RankedChoiceBallot() {}

    public RankedChoiceBallot(Long id, Office office, TreeSet<RankedChoice> rankedChoiceSortedSet, Voter voter, Election election) {
        this.office = office;
        this.rankedChoiceSortedSet = rankedChoiceSortedSet;
        this.voter = voter;
        this.election = election;
    }

    public Office getOffice() {
        return office;
    }

    public void setOffice(Office office) {
        this.office = office;
    }

    public SortedSet<RankedChoice> getRankedChoiceSortedSet() {
        return rankedChoiceSortedSet;
    }

    public void setRankedChoiceSortedSet(SortedSet<RankedChoice> rankedChoiceSortedSet) {
        this.rankedChoiceSortedSet = rankedChoiceSortedSet;
    }

    public Voter getVoter() {
        return voter;
    }

    public void setVoter(Voter voter) {
        this.voter = voter;
    }

    public Election getElection() {
        return election;
    }

    public void setElection(Election election) {
        this.election = election;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RankedChoiceBallot that = (RankedChoiceBallot) o;
        return Objects.equals(office, that.office) &&
                Objects.equals(rankedChoiceSortedSet, that.rankedChoiceSortedSet) &&
                Objects.equals(voter, that.voter) &&
                Objects.equals(election, that.election);
    }

    @Override
    public int hashCode() {
        return Objects.hash(office, rankedChoiceSortedSet, voter, election);
    }

    public static class PrimaryKey implements Serializable{
        private Office office;
        private Voter voter;
        private Election election;

        public PrimaryKey() {}

        public PrimaryKey(Office office, Voter voter, Election election) {
            this.office = office;
            this.voter = voter;
            this.election = election;
        }

        public Office getOffice() {
            return office;
        }

        public void setOffice(Office office) {
            this.office = office;
        }

        public Voter getVoter() {
            return voter;
        }

        public void setVoter(Voter voter) {
            this.voter = voter;
        }

        public Election getElection() {
            return election;
        }

        public void setElection(Election election) {
            this.election = election;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PrimaryKey that = (PrimaryKey) o;
            return Objects.equals(office, that.office) &&
                    Objects.equals(voter, that.voter) &&
                    Objects.equals(election, that.election);
        }

        @Override
        public int hashCode() {
            return Objects.hash(office, voter, election);
        }
    }
}

