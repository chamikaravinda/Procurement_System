package com.procurement.procurement_server.dao.site_dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.procurement.procurement_server.model.site_level.Site;

public interface SiteRepo extends MongoRepository<Site, String> {

}
