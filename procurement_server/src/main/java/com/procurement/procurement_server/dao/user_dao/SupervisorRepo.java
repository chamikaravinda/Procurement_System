package com.procurement.procurement_server.dao.user_dao;

import com.procurement.procurement_server.model.user_level.Supervisor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupervisorRepo extends MongoRepository<Supervisor, String> {
}
