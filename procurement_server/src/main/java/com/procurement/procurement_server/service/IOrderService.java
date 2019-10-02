package com.procurement.procurement_server.service;

import java.util.List;

import com.procurement.procurement_server.model.Order;
import com.procurement.procurement_server.model.Requistion;
import com.procurement.procurement_server.model.supplier_level.Item;


public interface IOrderService{

	public Order addOrder( Order order, Requistion requisiton  );
	public List<Order> getAllOrders();
	public Order getOrderById( String _id );
	public Order updateOrder( Order order );
	public void deleteOrder( Order order );	
	public int calculateQuantity(List<Item> itemList);
	public double calculateTotal( List<Item> itemList );
}
