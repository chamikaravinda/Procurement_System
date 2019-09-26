package com.procurement.procurement_server.controller;


import com.procurement.procurement_server.model.User;
import com.procurement.procurement_server.model.user_level.Staff;
import com.procurement.procurement_server.model.user_level.UserAdaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.procurement.procurement_server.service.DataServer;
import com.procurement.procurement_server.service.ServiceHandler;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/construction")

@Controller
public class MainController {

	
	
    @Autowired
    ServiceHandler serviceHandler;

    @Autowired
    DataServer dataServer;

    @PostMapping("user/get")
    public ResponseEntity getUserData(@RequestBody User user) {
        System.out.println(user);
        return serviceHandler.handleServiceRequest("25",user);
    }

    @PostMapping("user/add")
    public ResponseEntity addData(@RequestBody UserAdaptor usedAdaptor) {
        System.out.println(usedAdaptor);
        return serviceHandler.handleServiceRequest("26",usedAdaptor);
    }
    
    
    
    /* Kalana Elapatha */
    
//    @GetMapping("/addSupplier")
//    public ResponseEntity addSupplier(
//            @RequestParam(value = "SP") String reqTyp) {
////        return serviceHandler.handleServiceRequest(reqTyp);
//    }
//
    /* Kalana Elapatha  not completed yet*/

}