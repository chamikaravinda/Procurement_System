package com.procurement.procurement_server.service;


import com.procurement.procurement_server.model.supplier_level.Items;
import com.procurement.procurement_server.model.user_level.User;
import com.procurement.procurement_server.service.user_service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.procurement.procurement_server.util.CommonConstants;

import java.util.ArrayList;

@Component
public class ServiceHandler {

    private static boolean isInitialized = false;

    @Autowired
    UserService userService;

    @Autowired
    DataServer dataServer;

    public ResponseEntity handleServiceRequest(String reqId, Object obj, String uid) {
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
                return getAvailableItemsList();
            case CommonConstants.GET_ALL_USERS:
                return getAllUsers();
            case CommonConstants.DELETE_SPECIFIC_USER:
                return deleteSpecificUser(uid);
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

    public ResponseEntity getAvailableItemsList() {
        ArrayList<Items> itemsList = new ArrayList<>();
        Items items = new Items();
        items.set_id(1);
        items.setItemName("Bricks");
        itemsList.add(items);

        items = new Items();
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

    private ResponseEntity getAllUsers() {
        return userService.getAllUsers();
    }

    private ResponseEntity deleteSpecificUser(String uid) {
        return userService.deleteSpecificUser(uid);
    }

}
