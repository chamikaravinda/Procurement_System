package com.procurement.procurement_server.service;

import com.procurement.procurement_server.dao.UserRepo;
import com.procurement.procurement_server.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.datastore.UserDatastore;


@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public ResponseEntity getRequiredUser(User obj) {
        User usr = new User();
        try {
            usr = UserDatastore.getSharedInstance().getUserFromStore(obj.getEmail());
        } catch (Exception e) {
            System.out.println(e);
        }
        if (usr != null) {
            return new ResponseEntity<>(usr, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity addNewUser(User user) {
        try {
            User isAlredyExistUser = userRepo.findByemail(user.getEmail());
            if (isAlredyExistUser != null) {
            }
            String id = userRepo.save(user).get_id();
            return new ResponseEntity<Object>(user, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error" + e.getMessage());
            return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
        }
    }

}
