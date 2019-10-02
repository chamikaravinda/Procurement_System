package com.procurement.procurement_server.service.order_service;

import java.util.List;

import com.procurement.procurement_server.service.order_service.builder.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.procurement.procurement_server.dao.OrderRepo;
import com.procurement.procurement_server.dao.RequisitionRepo;
import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.order_level.Requistion;
import com.procurement.procurement_server.model.supplier_level.Item;

@Service
public class OrderServiceImpl implements IOrderService {

	@Autowired
	OrderRepo orderRepo;

	@Autowired
	RequisitionRepo requistionRepo;

	@Override
	@Transactional
	public Order addOrder(Order order, Requistion requisiton) {

		order.setRequistion(requistionRepo.save(requisiton));
		return orderRepo.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepo.findAll();
	}

	@Override
	public Order getOrderById(String _id) {
		return orderRepo.findOrderBy_id(_id);
	}

	@Override
	public Order updateOrder(Order order) {
		return orderRepo.save(order);
	}

	@Override
	public void deleteOrder(Order order) {
		orderRepo.delete(order);
	}

	@Override
	public int calculateQuantity(List<Item> itemList) {
		int quantity = 0;

		for (Item item : itemList) {
			quantity += item.getQuantity();
		}

		return quantity;
	}

	@Override
	public double calculateTotal(List<Item> itemList) {

		double total = 0;

		for (Item item : itemList) {
			total += item.getUnitPrice() * item.getQuantity();
		}

		/*
		 * if( total > 100000 ) { broker.takeOrder(pendingOrder); broker.placeOrder();
		 * }else { broker.takeOrder(approveOrder); broker.placeOrder(); }
		 */
		return total;

	}

}
