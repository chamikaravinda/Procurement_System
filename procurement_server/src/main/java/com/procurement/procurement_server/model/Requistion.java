package com.procurement.procurement_server.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "requisition")
public class Requistion {

	@Id
	private ObjectId _id;
	private String status;
	public String get_id() {
		return _id.toHexString();
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Requistion [_id=" + _id.toHexString() + ", status=" + status + "]";
	}
	
	public Requistion pending(Requistion requistion ) {
		requistion.setStatus("Pending");
		return requistion;
	}
	
	public Requistion approved( Requistion requistion ) {
		requistion.setStatus("Approved");;
		return requistion;
	}
	
	public Requistion declined( Requistion requistion ) {
		requistion.setStatus("Declined");
		return requistion;
	}
	
	
}
