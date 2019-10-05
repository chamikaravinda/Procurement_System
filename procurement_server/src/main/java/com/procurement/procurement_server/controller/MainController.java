package com.procurement.procurement_server.controller;

import com.procurement.procurement_server.dao.ItemRepo;
import com.procurement.procurement_server.dao.OrderRepo;
import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.supplier_level.Item;
import com.procurement.procurement_server.model.user_level.User;
import com.procurement.procurement_server.model.user_level.UserAdaptor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.procurement.procurement_server.service.DataServer;
import com.procurement.procurement_server.service.ServiceHandler;
import com.procurement.procurement_server.util.CommonConstants;

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
        return serviceHandler.handleServiceRequest("25", user,"");
    }

    @PostMapping("user/add")
    public ResponseEntity addData(@RequestBody UserAdaptor usedAdaptor) {
        System.out.println(usedAdaptor);
        return serviceHandler.handleServiceRequest("26", usedAdaptor,"");
    }

    @GetMapping("/data")
    public ResponseEntity getData(@RequestParam(value = "RT") String reqTyp,@RequestParam(value = "Uid", defaultValue = "") String uid) {
        System.out.println("Request type :"+reqTyp);
        return serviceHandler.handleServiceRequest(reqTyp, new Object(), uid);
    }
    
    @PostMapping(CommonConstants.MAPPING_ADD_ORDER)
    public ResponseEntity<Object> addOrder( @RequestBody Order order ){
    	
    	return serviceHandler.handleServiceRequest(Integer.toString(CommonConstants.ADD_ORDER_REQUEST), order, "");
    }
    
    @PutMapping( CommonConstants.MAPPING_UPDATE_ORDER)
    public ResponseEntity<Object> updateOrder( @RequestBody Order order ){
    	return serviceHandler.handleServiceRequest(Integer.toString(CommonConstants.UPDATE_ORDER_REQUEST), order, "");
    }


   /*-----------test add and get item-----------------------------*/
   
    
	
    @PostMapping("item/addItem")
    public ResponseEntity addNewItem(@RequestBody Object obj) {
    	System.out.println("@@@@@@@@@@@@@@@@ Main Controoller with Item");
        System.out.println(obj);
        return serviceHandler.handleServiceRequest("1001", obj,"");
    }
	
	
	
	
 
}