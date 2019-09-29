package com.procurement.procurement_server.service;


import com.procurement.procurement_server.model.user_level.User;
import com.procurement.procurement_server.service.user_service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.procurement.procurement_server.util.CommonConstants;

@Component
public class ServiceHandler {

    private static boolean isInitialized = false;

    @Autowired
    UserService userService;

    @Autowired
    DataServer dataServer;

    public ResponseEntity handleServiceRequest(String reqId, Object obj) {
        if (!isIsInitialized()) {
            startDataServer();
            setIsInitialized(true);
        }
        switch (Integer.parseInt(reqId)) {
            case CommonConstants.GET_USER_REQUEST:
                return getRequiredUser(obj);
            case CommonConstants.ADD_USER_REQUEST:
                return addNewUser(obj);
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

}
