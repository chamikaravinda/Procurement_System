package com.procurement.procurement_server.service.Item_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.procurement.procurement_server.dao.ItemRepo;
import com.procurement.procurement_server.model.supplier_level.Item;

@Service
public class ItemService {

	@Autowired
	ItemRepo itemRepo;

	public ResponseEntity<Object> addNewItem(Item item) {
		item = itemRepo.save(item);

		return new ResponseEntity<Object>(item, HttpStatus.OK);
	}

	//Avalible Quntity item------------
	public ResponseEntity getItemByQty() {

		List<Item> item = itemRepo.findAll();

		for (Item avlQty : item) {

			if (avlQty.getQuantity() == 0) {

				return new ResponseEntity<Object>(item, HttpStatus.OK);
			}

		}
		return null;

	}
	
	//Not Avalible Quntity item------------
	
	public ResponseEntity getItemByNoNQty() {

		List<Item> item = itemRepo.findAll();

		for (Item avlQty : item) {

			if (avlQty.getQuantity() != 0) {

				return new ResponseEntity<Object>(item, HttpStatus.OK);
			}

		}
		return null;

	}

}
