package tmax7.ranked_choice_voting_application.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import tmax7.ranked_choice_voting_application.models.Candidate;

public interface CandidateRepository extends PagingAndSortingRepository<Candidate, Long> {
}
