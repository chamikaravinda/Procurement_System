package com.procurement.procurement_server.dao.site_dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.procurement.procurement_server.model.site_level.Site;
import com.procurement.procurement_server.model.user_level.Staff;

public interface SiteRepo extends MongoRepository<Site, String> {

	List<Site> findByaddedBy(String id);

}
