package tmax7.ranked_choice_voting_application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tmax7.ranked_choice_voting_application.repositories.RankedChoiceBallotRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final RankedChoiceBallotRepository repository;

    @Autowired
    public DatabaseLoader(RankedChoiceBallotRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        // this.repository.save(new RankedChoiceBallot());
    }
}
