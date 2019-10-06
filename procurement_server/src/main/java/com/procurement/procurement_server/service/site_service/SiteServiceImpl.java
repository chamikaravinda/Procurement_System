package com.procurement.procurement_server.service.site_service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.dao.site_dao.SiteRepo;
import com.procurement.procurement_server.dao.user_dao.StaffRepo;
import com.procurement.procurement_server.dao.user_dao.UserRepo;
import com.procurement.procurement_server.model.user_level.Staff;
import com.procurement.procurement_server.model.user_level.User;
import com.procurement.procurement_server.model.user_level.UserAdaptor;
import com.procurement.procurement_server.model.site_level.Site;
import com.procurement.procurement_server.service.site_service.builder.ISiteService;

@Service
public class SiteServiceImpl implements ISiteService {

	@Autowired
	SiteRepo siteRepo;
	
	@Autowired
	StaffRepo staffRepo;
	
	@Override
	public ResponseEntity addSite(Site site) {
		
		site=siteRepo.save(site);
		return new ResponseEntity<Object>(site, HttpStatus.OK);
	}

	@Override
	public ResponseEntity getAllSites() {
		List<Site> siteList =siteRepo.findAll();
		
		for(Site site:siteList) {
				List<Staff> staff =staffRepo.findBystaffId(site.getSiteManagerld());
				for(Staff s:staff) {
				site.setSiteManagerld(s.getFirstName());
				}
		}
		return new ResponseEntity<>(siteList, HttpStatus.OK);
	}

	@Override
	public ResponseEntity deleteSiteByID(String id) {
		siteRepo.deleteById(id);
		return new ResponseEntity<>(true, HttpStatus.OK);

	}

	@Override
	public ResponseEntity getAllSitesByAddedUser(String id) {
		List<Site> siteList =siteRepo.findByaddedBy(id);
		for(Site site:siteList) {
				List<Staff> staff =staffRepo.findBystaffId(site.getSiteManagerld());
				for(Staff s:staff) {
				site.setSiteManagerld(s.getFirstName());
				}
		}
		if(siteList.size()==0) {
			siteList=null;
		}
		return new ResponseEntity<>(siteList, HttpStatus.OK);
	}

	@Override
	public ResponseEntity updateSite(Site site) {
		return new ResponseEntity<>(siteRepo.save(site), HttpStatus.OK);

	}
	

	@Override
	public ResponseEntity getSiteByID(String ID) {
		return new ResponseEntity<>(siteRepo.findById(ID), HttpStatus.OK);
	}
	
	
}
