package com.procurement.procurement_server.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.procurement.procurement_server.util.CommonConstants;

@Component
public class ServiceHandler {

    @Autowired
    UserService userService;

    public ResponseEntity handleServiceRequest(String reqId) {
        switch (Integer.parseInt(reqId)) {
            case CommonConstants.GET_USER_REQUEST : return getRequiredUser();
            default: return new ResponseEntity("Failed", HttpStatus.OK);
        }
    }

    private ResponseEntity getRequiredUser() {
        return userService.getRequiredUser();
    }

}
