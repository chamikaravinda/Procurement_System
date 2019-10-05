package com.procurement.procurement_server.dao.user_dao;

import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.user_level.Staff;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StaffRepo extends MongoRepository<Staff, String> {
	List<Staff> findBytype(String type);
	List<Staff> findAll();

}
