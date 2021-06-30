package tmax7.ranked_choice_voting_application.repositories;

import org.springframework.data.repository.CrudRepository;
import tmax7.ranked_choice_voting_application.models.Candidate;

public interface CandidateRepository extends CrudRepository<Candidate, Long> {
}
