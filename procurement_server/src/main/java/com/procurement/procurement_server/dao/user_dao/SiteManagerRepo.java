package com.procurement.procurement_server.dao.user_dao;

import com.procurement.procurement_server.model.user_level.SiteManager;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SiteManagerRepo extends MongoRepository<SiteManager, String> {
}
