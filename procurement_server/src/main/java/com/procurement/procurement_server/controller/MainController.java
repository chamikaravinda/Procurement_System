package com.procurement.procurement_server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.procurement.procurement_server.service.DataServer;
import com.procurement.procurement_server.service.ServiceHandler;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")

@Controller
public class MainController {

    @Autowired
    ServiceHandler serviceHandler;

    @Autowired
    DataServer dataServer;

    @GetMapping("/construction")
    public ResponseEntity allData(
            @RequestParam(value = "RT") String reqTyp) {
        return serviceHandler.handleServiceRequest(reqTyp);
    }

}