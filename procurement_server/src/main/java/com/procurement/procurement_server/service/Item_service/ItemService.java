package com.procurement.procurement_server.service.Item_service;

import java.util.ArrayList;
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

	// Not Available Quantity item------------
	public  ResponseEntity getItemWithoutQty() {

		List<Item> allItemList = itemRepo.findAll();
		List<Item> tempItemList = new ArrayList<Item>();

		for (Item item : allItemList) {

			if (item.getQuantity() == 0) {

				tempItemList.add(item);
			}

		}
		
		return new ResponseEntity<>(tempItemList, HttpStatus.OK);

	}

	//  Available Quantity item------------

	public ResponseEntity getItemWithQty() {

		List<Item> allItemList = itemRepo.findAll();
		List<Item> tempItemList = new ArrayList<Item>();

		for (Item item : allItemList) {

			if (item.getQuantity() != 0) {

				tempItemList.add(item);
			}

		}
		
		return new ResponseEntity<>(tempItemList, HttpStatus.OK);

	}


}
