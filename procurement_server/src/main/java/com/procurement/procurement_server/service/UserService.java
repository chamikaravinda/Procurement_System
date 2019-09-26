package com.procurement.procurement_server.service;

import com.procurement.procurement_server.dao.StaffRepo;
import com.procurement.procurement_server.dao.UserRepo;
import com.procurement.procurement_server.model.User;
import com.procurement.procurement_server.model.user_level.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.datastore.UserDatastore;


@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    @Autowired
    StaffRepo staffRepo;

    public ResponseEntity getRequiredUser(User obj) {
        User usr = new User();
        try {
            usr = UserDatastore.getSharedInstance().getUserFromStore(obj.getEmail());
        } catch (Exception e) {
            System.out.println(e);
        }
        if (usr != null) {
            return new ResponseEntity<>(usr, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(usr, HttpStatus.OK);
        }
    }

    public ResponseEntity addNewUser(Object obj) {
        User newUser = convertToUser(obj);

        try {
            User isAlredyExistUser = userRepo.findByemail(newUser.getEmail());
            if (isAlredyExistUser != null) {
                return new ResponseEntity<>("Invalid", HttpStatus.OK);
            } else {
                userRepo.save(newUser).get_id();
                UserDatastore.getSharedInstance().addToStore(userRepo.findByemail(newUser.getEmail()));
                Staff staff = convertToStaff(obj);
                staff.setStaffId(UserDatastore.getSharedInstance().getUserFromStore(newUser.getEmail()).get_id());
                staffRepo.save(staff).getStaffId();
                return new ResponseEntity<Object>(staff, HttpStatus.OK);
            }
        } catch (Exception e) {
            System.out.println("Error" + e.getMessage());
            return new ResponseEntity<>(e, HttpStatus.OK);
        }
    }

    private User convertToUser(Object obj) {
        UserAdaptor adaptor = (UserAdaptor) obj;
        User usr = new User();
        usr.setEmail(((UserAdaptor) adaptor).getEmail());
        usr.setPassword(((UserAdaptor) adaptor).getPassword());
        return usr;
    }

    private Staff convertToStaff(Object obj) {
        UserAdaptor adaptor = (UserAdaptor) obj;
        Staff staff = new Staff();
        staff.setFirstName(adaptor.getFirstName());
        staff.setLastName(adaptor.getLastName());
        if (adaptor.getType().equals("Procurement Manager")) {
            staff.setType(new ProcurementManager());
        } else if (adaptor.getType().equals("Site Manager")) {
            staff.setType(new SiteManager());
        } else if (adaptor.getType().equals("Supervisor")) {
            staff.setType(new Supervisor());
        } else if (adaptor.getType().equals("Finance")) {
            staff.setType(new Supervisor());
        } else {
            staff.setType(new Staff());
        }
        return staff;
    }
}



