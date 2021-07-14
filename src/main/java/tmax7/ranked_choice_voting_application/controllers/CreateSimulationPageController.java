package tmax7.ranked_choice_voting_application.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CreateSimulationPageController {
    
    @RequestMapping(value = "/create_simulation_page") 
    public String createSimulationPage() {
        return "create_simulation_page";
    } 
}