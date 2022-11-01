package airdancer.server.airdancerserver.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
public class MasterController {
    
    @RequestMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    } 
}
