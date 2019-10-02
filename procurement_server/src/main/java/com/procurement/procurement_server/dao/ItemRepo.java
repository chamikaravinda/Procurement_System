package com.procurement.procurement_server.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.procurement.procurement_server.model.supplier_level.Item;


public interface ItemRepo extends MongoRepository<Item, String>{

}
