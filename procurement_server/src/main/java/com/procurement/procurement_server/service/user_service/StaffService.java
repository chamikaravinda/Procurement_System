package com.procurement.procurement_server.service.user_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.dao.user_dao.StaffRepo;

@Service
public class StaffService {

	@Autowired
	StaffRepo staffRepo;
	
	public ResponseEntity getStaffMembersByType(String type) {
        return new ResponseEntity<>(staffRepo.findBytype(type), HttpStatus.OK);
	}
}
