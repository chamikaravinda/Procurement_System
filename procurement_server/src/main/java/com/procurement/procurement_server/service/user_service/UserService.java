package com.procurement.procurement_server.service.user_service;

import com.procurement.procurement_server.dao.user_dao.*;
import com.procurement.procurement_server.model.user_level.*;
import com.procurement.procurement_server.util.CommonConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.datastore.UserDatastore;

import java.util.ArrayList;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    @Autowired
    StaffRepo staffRepo;
    @Autowired
    SiteManagerRepo siteManagerRepo;
    @Autowired
    FinanceEmployeeRepo financeEmployeeRepo;
    @Autowired
    ProcurementManagerRepo procurementManagerRepo;
    @Autowired
    SupervisorRepo supervisorRepo;


    public ResponseEntity getRequiredUser(User obj) {
        User usr = new User();
        try {
            usr = UserDatastore.getSharedInstance().getUserFromStore(obj.getEmail());
            if (usr != null) {
                if (usr.getPassword().equals(obj.getPassword())) {
                    Optional<Staff> stf = staffRepo.findById(usr.get_id());
                    UserAdaptor userAdaptor = new UserAdaptor();
                    userAdaptor.setFirstName(stf.get().getFirstName());
                    userAdaptor.setLastName(stf.get().getLastName());
                    userAdaptor.setType(stf.get().getType());
                    return new ResponseEntity<>(userAdaptor, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Invalid Password", HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>("No User Found", HttpStatus.OK);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(usr, HttpStatus.NO_CONTENT);
        }
    }

    public ResponseEntity getAllUsers() {
        try {
            ArrayList<Staff> list = (ArrayList<Staff>) staffRepo.findAll();
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Error", HttpStatus.NO_CONTENT);
        }
    }

    public ResponseEntity deleteSpecificUser(String uid) {
        try {
            Optional<Staff> user = staffRepo.findById(uid);
            String type = user.get().getType();

            switch (type) {
                case CommonConstants.USER_TYPE_PROCUREMENT_MANAGER:
                    procurementManagerRepo.deleteById(uid);
                    break;
                case CommonConstants.USER_TYPE_SITE_MANAGER:
                    siteManagerRepo.deleteById(uid);
                    break;
                case CommonConstants.USER_TYPE_SUPERVISOR:
                    supervisorRepo.deleteById(uid);
                    break;
                case CommonConstants.USER_TYPE_FINANCE_EMPLOYEE:
                    financeEmployeeRepo.deleteById(uid);
                    break;
            }
            UserDatastore.getSharedInstance().removeFromStore(userRepo.findById(user.get().getStaffId()).get().getEmail());
            staffRepo.deleteById(uid);
            userRepo.deleteById(uid);
            return new ResponseEntity<>(getAllUsers(), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Error", HttpStatus.NO_CONTENT);
        }

    }

    public ResponseEntity addNewUser(Object obj) {
        User newUser = convertToUser(obj);
        try {
            User isAlredyExistUser = userRepo.findByemail(newUser.getEmail());
            if (isAlredyExistUser != null) {
                return new ResponseEntity<>("Invalid", HttpStatus.BAD_REQUEST);
            } else {
                Staff staff = new Staff();
                staff.setStaffId(userRepo.save(newUser).get_id());
                staff.setFirstName(((UserAdaptor) obj).getFirstName());
                staff.setLastName(((UserAdaptor) obj).getLastName());
                staff.setType(((UserAdaptor) obj).getType());
                UserDatastore.getSharedInstance().addToStore(userRepo.findByemail(newUser.getEmail()));
                staffRepo.save(staff);
                Object userTypeObj = convertToRelevantUserType(obj);
                if (userTypeObj instanceof SiteManager) {
                    ((SiteManager) userTypeObj).setStaffId(staff.getStaffId());
                    siteManagerRepo.save((SiteManager) userTypeObj);
                } else if (userTypeObj instanceof ProcurementManager) {
                    ((ProcurementManager) userTypeObj).setStaffId(staff.getStaffId());
                    procurementManagerRepo.save((ProcurementManager) userTypeObj);
                } else if (userTypeObj instanceof Supervisor) {
                    ((Supervisor) userTypeObj).setStaffId(staff.getStaffId());
                    supervisorRepo.save((Supervisor) userTypeObj);
                } else if (userTypeObj instanceof FinanceEmployee) {
                    ((FinanceEmployee) userTypeObj).setStaffId(staff.getStaffId());
                    financeEmployeeRepo.save((FinanceEmployee) userTypeObj);
                }
                return new ResponseEntity<Object>(userTypeObj, HttpStatus.OK);
            }
        } catch (
                Exception e) {
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

    private Staff convertToRelevantUserType(Object obj) {
        UserAdaptor adaptor = (UserAdaptor) obj;
        if (adaptor.getType().equals("Procurement Manager")) {
            ProcurementManager procurementManager = new ProcurementManager();
            return procurementManager;
        } else if (adaptor.getType().equals("Site Manager")) {
            SiteManager siteManager = new SiteManager();
            return siteManager;
        } else if (adaptor.getType().equals("Supervisor")) {
            Supervisor supervisor = new Supervisor();
            return supervisor;
        } else if (adaptor.getType().equals("Finance")) {
            FinanceEmployee financeEmployee = new FinanceEmployee();
            return financeEmployee;
        } else {
            Staff staff = new Staff();
            return staff;
        }

    }
}



