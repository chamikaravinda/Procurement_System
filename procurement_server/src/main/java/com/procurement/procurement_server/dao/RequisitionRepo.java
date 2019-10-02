package com.procurement.procurement_server.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.procurement.procurement_server.model.Requistion;

public interface RequisitionRepo extends MongoRepository<Requistion, String>{

}
