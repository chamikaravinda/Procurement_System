package com.procurement.procurement_server.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.datastore.UserDatastore;

@Service
public class UserService {

    public ResponseEntity getRequiredUser() {
        return new ResponseEntity(UserDatastore.getSharedInstance().getUserFromStore("chamika@gmail.com"), HttpStatus.OK);
    }

}
