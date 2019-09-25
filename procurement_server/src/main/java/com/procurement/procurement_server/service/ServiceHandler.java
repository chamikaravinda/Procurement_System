package com.procurement.procurement_server.service;


import com.procurement.procurement_server.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.procurement.procurement_server.util.CommonConstants;

@Component
public class ServiceHandler {

    @Autowired
    UserService userService;

    @Autowired
    DataServer dataServer;

    public ResponseEntity handleServiceRequest(String reqId,Object obj) {
        startDataServer();
        switch (Integer.parseInt(reqId)) {
            case CommonConstants.GET_USER_REQUEST : return getRequiredUser(obj);
            case CommonConstants.ADD_USER_REQUEST: return addNewUser((User)obj);
            default: return new ResponseEntity("Failed", HttpStatus.OK);
        }
    }

    private ResponseEntity getRequiredUser(Object obj) {
        return userService.getRequiredUser((User) obj);
    }

    private ResponseEntity addNewUser(User user) {
        return userService.addNewUser(user);
    }

    private void startDataServer() {
        dataServer.startDataServer();
    }

}
