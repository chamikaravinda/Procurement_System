package com.procurement.procurement_server.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.dao.UserRepo;
import com.procurement.procurement_server.datastore.UserDatastore;
import com.procurement.procurement_server.model.User;

/**
 *This class will load all the db data and create cache tables
 *
 */
@Service
public class DataServer {

    private static DataServer self;

    @Autowired
    UserRepo userRepo;
    public static DataServer getSharedInstance() {
        if (self == null) {
            self = new DataServer();
        }
        return self;
    }

    public User getUser(String key) {
        return UserDatastore.getSharedInstance().getUserFromStore(key);
    }

    public void startDataServer() {
        UserDatastore.getSharedInstance().setDataStore(userRepo.findAll());
    }
}
