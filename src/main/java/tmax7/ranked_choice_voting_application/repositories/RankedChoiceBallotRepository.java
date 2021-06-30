package tmax7.ranked_choice_voting_application.repositories;

import org.springframework.data.repository.CrudRepository;
import tmax7.ranked_choice_voting_application.models.RankedChoiceBallot;

public interface RankedChoiceBallotRepository extends CrudRepository<RankedChoiceBallot, Long> {

}