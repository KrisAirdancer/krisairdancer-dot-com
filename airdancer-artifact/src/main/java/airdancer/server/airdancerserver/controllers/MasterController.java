package airdancer.server.airdancerserver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MasterController {

    @RequestMapping("/airdancer-player")
    public String airdancerPlayerTwo() {
        return "airdancer-player.html";
    }

    @RequestMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    } 
}
