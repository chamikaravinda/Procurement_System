package com.procurement.procurement_server.service.site_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.dao.site_dao.SiteRepo;
import com.procurement.procurement_server.model.site_level.Site;
import com.procurement.procurement_server.service.site_service.builder.ISiteService;

@Service
public class SiteServiceImpl implements ISiteService {

	@Autowired
	SiteRepo siteRepo;
	
	@Override
	public ResponseEntity addSite(Site site) {
		
		site=siteRepo.save(site);
		return new ResponseEntity<Object>(site, HttpStatus.OK);
	}

	
}
