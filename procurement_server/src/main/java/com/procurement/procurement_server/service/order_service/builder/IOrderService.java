package com.procurement.procurement_server.service.order_service.builder;

import java.util.List;

import com.procurement.procurement_server.dao.RequisitionRepo;
import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.order_level.Requistion;
import com.procurement.procurement_server.model.supplier_level.Item;
import com.procurement.procurement_server.model.user_level.Staff;


public interface IOrderService{

	public Order addOrder( Order order, Requistion requisiton  );
	public List<Order> getAllOrders();
	public Order getOrderById( String _id );
	public Order updateOrder( Order order );
	public void deleteOrder( Order order );	
	public int calculateQuantity(List<Item> itemList);
	public double calculateTotal( List<Item> itemList );
	public List<Order> getOrdersByStatus( String status );
	public Requistion approveOrder( Order order );
	public Requistion declineOrder( Order order );
}
