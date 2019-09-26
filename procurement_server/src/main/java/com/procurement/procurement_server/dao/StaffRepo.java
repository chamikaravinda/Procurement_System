package com.procurement.procurement_server.dao;

import com.procurement.procurement_server.model.user_level.Staff;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StaffRepo extends MongoRepository<Staff, String> {

}
