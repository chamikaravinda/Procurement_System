package com.procurement.procurement_server.service.site_service.builder;

import org.springframework.http.ResponseEntity;

import com.procurement.procurement_server.model.site_level.Site;

public interface ISiteService {
	public ResponseEntity addSite(Site site);
	public ResponseEntity getAllSites();
	public ResponseEntity deleteSiteByID(String id);
	public ResponseEntity getAllSitesByAddedUser(String id);
	public ResponseEntity updateSite(Site site);
	public ResponseEntity getSiteByID(String ID);

}	

