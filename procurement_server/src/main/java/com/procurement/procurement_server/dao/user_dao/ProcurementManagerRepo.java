package com.procurement.procurement_server.dao.user_dao;

import com.procurement.procurement_server.model.user_level.ProcurementManager;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProcurementManagerRepo extends MongoRepository<ProcurementManager, String> {
}
