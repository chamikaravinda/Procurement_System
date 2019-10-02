package com.procurement.procurement_server.service;

import com.procurement.procurement_server.model.Order;
import com.procurement.procurement_server.model.Requistion;
import com.procurement.procurement_server.model.user_level.User;
import com.procurement.procurement_server.service.user_service.UserService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.procurement.procurement_server.util.ApprovedOrder;
import com.procurement.procurement_server.util.CommonConstants;
import com.procurement.procurement_server.util.Generator;
import com.procurement.procurement_server.util.OrderBroker;
import com.procurement.procurement_server.util.OrderBuilder;
import com.procurement.procurement_server.util.PendingOrder;

import java.util.ArrayList;
import java.util.logging.Handler;

@Component
public class ServiceHandler {

    private static boolean isInitialized = false;

    @Autowired
    UserService userService;

    @Autowired
    DataServer dataServer;
    
    @Autowired
    IOrderService orderService;

    
    public ResponseEntity<Object> handleServiceRequest(String reqId, Object obj, String uid) {
        if (!isIsInitialized()) {
            startDataServer();
            setIsInitialized(true);
        }
        switch (Integer.parseInt(reqId)) {
            case CommonConstants.GET_USER_REQUEST:
                return getRequiredUser(obj);
            case CommonConstants.ADD_USER_REQUEST:
                return addNewUser(obj);
            case CommonConstants.GET_AVAILABLE_SUPPLIER_ITEMS:
                return null;
            case CommonConstants.GET_ALL_USERS:
                return getAllUsers();
            case CommonConstants.DELETE_SPECIFIC_USER:
                return deleteSpecificUser(uid);
            case CommonConstants.ADD_ORDER_REQUEST:
            	return handleOrder((Order)obj); 
            case CommonConstants.UPDATE_ORDER_REQUEST : 
            	return handleOrder((Order) obj);
            default:
                return new ResponseEntity("Failed", HttpStatus.OK);
        }
    }

    private ResponseEntity getRequiredUser(Object obj) {
        return userService.getRequiredUser((User) obj);
    }

    private ResponseEntity addNewUser(Object obj) {
        return userService.addNewUser(obj);
    }

    private void startDataServer() {
        dataServer.startDataServer();
    }


    public static boolean isIsInitialized() {
        return isInitialized;
    }

    public static void setIsInitialized(boolean isInitialized) {
        ServiceHandler.isInitialized = isInitialized;
    }

    public ResponseEntity<Object> handleOrder(Order order ) {
    	
    
    		int orderItemQuantity = orderService.calculateQuantity(order.getItems());
    		double orderTotal = orderService.calculateTotal(order.getItems());
    		
    		Requistion requisition = new Requistion();
    		
    		
    		ApprovedOrder approveOrder = new ApprovedOrder(requisition);
    		PendingOrder pendingOrder = new PendingOrder(requisition);
    		
    		
    		if( order.get_idAsObjectId() == null ) {
    			System.out.println("id is null");
    			requisition.set_id(new ObjectId());
    		}else {
    			System.out.println("id is not null");
    			requisition = order.getRequistion();
    		}
    		
    		/*-----------------------------------------------------------*/
    		
    		OrderBroker broker = new OrderBroker();		
    		
    		if( orderTotal > CommonConstants.ORDER_LIMIT ) {
    			broker.takeOrder(pendingOrder);
    			requisition =  broker.placeOrder();
    		}else {
    			broker.takeOrder(approveOrder);
    			requisition = broker.placeOrder();
    		}
    		
    		
    		Order newOrder = new OrderBuilder(order.get_idAsObjectId())
    				.setItems(order.getItems())
    				.setOrderDate(Generator.getCurrentDate())
    				.setPayment(null)
    				.setQuantity(orderItemQuantity)
    				.setRequisition(null)
    				.setTotalAmount(orderTotal)
    				.build();
    		
    		return new ResponseEntity<>(orderService.addOrder(newOrder, requisition), HttpStatus.OK);
    	
	
    }
    
    /*
    public ResponseEntity getAvailableItemsList() {
        ArrayList<Items> itemsList = new ArrayList<>();
        Items items = new Items();
        items.set_id(1);
        items.setItemName("Bricks");
        itemsList.add(items);

        items = new Item();
        items.set_id(2);
        items.setItemName("Cement");
        itemsList.add(items);

        items = new Items();
        items.set_id(3);
        items.setItemName("Mattel");
        itemsList.add(items);

        items = new Items();
        items.set_id(4);
        items.setItemName("Cement Bricks");
        itemsList.add(items);

        items = new Items();
        items.set_id(5);
        items.setItemName("Roofing Sheet");
        itemsList.add(items);

        return new ResponseEntity<Object>(itemsList, HttpStatus.OK);
    }
    */

    private ResponseEntity getAllUsers() {
        return userService.getAllUsers();
    }

    private ResponseEntity deleteSpecificUser(String uid) {
        return userService.deleteSpecificUser(uid);
    }

}
