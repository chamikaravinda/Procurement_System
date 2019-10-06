package com.procurement.procurement_server.service.order_service.builder;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;

import com.procurement.procurement_server.model.order_level.Order;
import com.procurement.procurement_server.model.order_level.Payment;
import com.procurement.procurement_server.model.order_level.Requistion;
import com.procurement.procurement_server.model.supplier_level.Item;
import com.procurement.procurement_server.model.user_level.Staff;

public class OrderBuilder {


	private ObjectId _id;

	private List<Item> items;
	
	private Requistion requistion;
	

	private int quantity;
	
	private double totalAmount;
	
	private String orderDate;

	private Staff placedUser;
	
	private Staff approvedUser;
	
	private Payment payment;
	
	public OrderBuilder(ObjectId _id ) {
		this._id = _id;
	}
	
	

	public OrderBuilder(ObjectId _id, List<Item> items, Requistion requistion, int quantity, double totalAmount,
			String orderDate, Staff placedUser, Staff approvedUser, Payment payment) {
		super();
		this._id = _id;
		this.items = items;
		this.requistion = requistion;
		this.quantity = quantity;
		this.totalAmount = totalAmount;
		this.orderDate = orderDate;
		this.placedUser = placedUser;
		this.approvedUser = approvedUser;
		this.payment = payment;
	}



	public OrderBuilder setItems( List<Item> items ) {
		this.items = items;
		return this;
	}
	
	public OrderBuilder setRequisition( Requistion requistion ) {
		this.requistion = requistion;
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
	
	
	public OrderBuilder setOrderPlacedUser( Staff placedUser ) {
		this.placedUser = placedUser;
		return this;
	}
	
	public OrderBuilder setOrderApprovedUser( Staff approvedUser ) {
		this.approvedUser = approvedUser;
		return this;
	}
	
	public OrderBuilder setPayment( Payment payment ) {
		this.payment = payment;
		return this;
	}
	
	public Order build() {
		return new Order(_id, items, requistion, quantity, totalAmount, orderDate, placedUser, approvedUser, payment);
	}
}
