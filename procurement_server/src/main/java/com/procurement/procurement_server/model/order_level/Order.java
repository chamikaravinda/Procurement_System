package com.procurement.procurement_server.model.order_level;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.procurement.procurement_server.model.supplier_level.Item;
import com.procurement.procurement_server.model.user_level.Staff;

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
	
	private int quantity;
	
	private double totalAmount;
	
	private String orderDate;

	@DBRef
	private Staff placedUser;
	
	@DBRef
	private Staff approvedUser;

	@DBRef
	private Payment payment;
	
	

	public Order(ObjectId _id, List<Item> items, Requistion requistion, int quantity, double totalAmount,
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

    public Order() {

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

	
	public Staff getPlacedUser() {
		return placedUser;
	}

	public void setPlacedUser(Staff placedUser) {
		this.placedUser = placedUser;
	}

	public Staff getApprovedUser() {
		return approvedUser;
	}

	public void setApprovedUser(Staff approvedUser) {
		this.approvedUser = approvedUser;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	@Override
	public String toString() {
		return "Order [_id=" + _id.toHexString() + ", items=" + items + ", requistion=" + requistion + ", quantity=" + quantity
				+ ", totalAmount=" + totalAmount + ", orderDate=" + orderDate + ", placedUser=" + placedUser
				+ ", approvedUser=" + approvedUser + ", payment=" + payment + "]";
	}

	
	
	
}
