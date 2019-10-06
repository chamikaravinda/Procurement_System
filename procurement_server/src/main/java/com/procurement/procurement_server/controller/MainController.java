package com.procurement.procurement_server.controller;

import com.procurement.procurement_server.dao.ItemRepo;
import com.procurement.procurement_server.dao.OrderRepo;
import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.site_level.Site;
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

@CrossOrigin(origins = CommonConstants.ORIGINS, allowedHeaders = CommonConstants.ALLOWED_HEADERS)
@RestController
@RequestMapping(CommonConstants.MAPPING_MAIN)

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

    /*--add site method--*/
    @PostMapping("site/add")
    public ResponseEntity addSite(@RequestBody Site site) {
        return serviceHandler.handleServiceRequest("70", site,"");
    }


    @GetMapping("/data")
    public ResponseEntity getData(@RequestParam(value = "RT") String reqTyp,@RequestParam(value = "Uid", defaultValue = "") String uid) {
        System.out.println("Request type :"+reqTyp);
        System.out.println("user id :"+ uid);
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
    
    @GetMapping(CommonConstants.MAPPING_GET_ALL_ORDERS)
    public ResponseEntity<Object> getAllOrders(){
    	return serviceHandler.handleServiceRequest(Integer.toString(CommonConstants.GET_ALL_ORDERS_REQUEST), null , "" );
    }
    
    @GetMapping( CommonConstants.MAPPING_GET_ORDER_BY_STATUS )
    public ResponseEntity<Object> getOrdersByStatus( @PathVariable String status ){
    	System.out.println("Get All orders");
    	return serviceHandler.handleServiceRequest(Integer.toString(CommonConstants.GET_ORDERS_BY_STATUS), null , status );
    }
   
    @PutMapping( CommonConstants.MAPPING_APPROVE_ORDER )
    public ResponseEntity<Object> approveOrder(@RequestBody Order order ){
    	return serviceHandler.handleServiceRequest(Integer.toString(CommonConstants.APPROVE_ORDER_REQUEST), order , null );
    }
    
    @PutMapping( CommonConstants.MAPPING_DECLINE_ORDER )
    public ResponseEntity<Object> declineOrder( @RequestBody Order order ){
    	return serviceHandler.handleServiceRequest(Integer.toString(CommonConstants.DECLINE_ORDER_REQUEST), order , null );
    }
	
    @PostMapping("item/addItem")
    public ResponseEntity addNewItem(@RequestBody Object obj) {
    	
        System.out.println(obj);
        return serviceHandler.handleServiceRequest("1001", obj,"");
    }
	
	
	
	
 
}