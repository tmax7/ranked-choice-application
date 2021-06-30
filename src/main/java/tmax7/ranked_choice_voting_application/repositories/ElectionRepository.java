package tmax7.ranked_choice_voting_application.repositories;

import org.springframework.data.repository.CrudRepository;
import tmax7.ranked_choice_voting_application.models.Election;

public interface ElectionRepository extends CrudRepository<Election, Long> {
}
