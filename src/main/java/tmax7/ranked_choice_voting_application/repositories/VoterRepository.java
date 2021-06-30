package tmax7.ranked_choice_voting_application.repositories;

import org.springframework.data.repository.CrudRepository;
import tmax7.ranked_choice_voting_application.models.Voter;

public interface VoterRepository extends CrudRepository<Voter, Long> {
}
