package com.procurement.procurement_server.model.order_level;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.procurement.procurement_server.model.supplier_level.Item;

@Document( collection = "order")
public class Order {
	
	@Id
	private ObjectId _id;
	
	/*
	 * The order reference object is not specified in the attributes in the class diagram
	 */
	private List<Item> items;
	
	@DBRef
	private Requistion requistion;
	
	@DBRef
	private Payment payment;

	private int quantity;
	
	private double totalAmount;
	
	private String orderDate;

	
	public Order(ObjectId _id, List<Item> items, Requistion requistion, Payment payment, int quantity,
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

	public String get_id() {
		return _id.toHexString();
	}

	public ObjectId get_idAsObjectId() {
		return this._id;
	}
	
	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Requistion getRequistion() {
		return requistion;
	}

	public void setRequistion(Requistion requistion) {
		this.requistion = requistion;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	@Override
	public String toString() {
		return "Order [_id=" + _id.toHexString() + ", items=" + items + ", requistion=" + requistion + ", payment=" + payment
				+ ", quantity=" + quantity + ", totalAmount=" + totalAmount + ", orderDate=" + orderDate + "]";
	}

	
	
}
