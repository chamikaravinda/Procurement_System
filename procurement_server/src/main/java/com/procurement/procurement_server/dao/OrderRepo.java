package com.procurement.procurement_server.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.procurement.procurement_server.model.order_level.Order;


public interface OrderRepo extends MongoRepository<Order, String>{

	public Order findOrderBy_id( String _id );
	public List<Order> findAll();

}
