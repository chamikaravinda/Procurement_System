package com.procurement.procurement_server.service.order_service.builder;

import java.util.List;

import org.bson.types.ObjectId;

import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.order_level.Payment;
import com.procurement.procurement_server.model.order_level.Requistion;
import com.procurement.procurement_server.model.supplier_level.Item;

public class OrderBuilder {


	private ObjectId _id;

	private List<Item> items;
	
	private Requistion requistion;
	
	private Payment payment;

	private int quantity;
	
	private double totalAmount;
	
	private String orderDate;

	public OrderBuilder(ObjectId _id ) {
		this._id = _id;
	}
	
	public OrderBuilder(ObjectId _id, List<Item> items, Requistion requistion, Payment payment, int quantity,
			double totalAmount, String orderDate) {
		super();
		this._id = _id;
		this.items = items;
		this.requistion = requistion;
		this.payment = payment;
		this.quantity = quantity;
		this.totalAmount = totalAmount;
		this.orderDate = orderDate;
	}
	

	
	public OrderBuilder setItems( List<Item> items ) {
		this.items = items;
		return this;
	}
	
	public OrderBuilder setRequisition( Requistion requistion ) {
		this.requistion = requistion;
		return this;
	}
	
	public OrderBuilder setPayment( Payment payment ) {
		this.payment = payment;
		return this;
	}
	
	public OrderBuilder setQuantity( int quantity ) {
		this.quantity = quantity;
		return this;
	}
	
	public OrderBuilder setTotalAmount( double totalAmount ) {
		this.totalAmount  = totalAmount;
		return this;
	}
	
	public OrderBuilder setOrderDate( String orderDate ) {
		this.orderDate = orderDate;
		return this;
	}
	
	public Order build() {
		return new Order(_id, items, requistion, payment, quantity, totalAmount, orderDate);
	}
}
