package com.procurement.procurement_server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.procurement.procurement_server.datastore.DatabaseEvent;

@Document( collection = "supplier")

public class Supplier implements DatabaseEvent {



    @Id
    private String _id;
    private String name;
    private String email;
	@Override
	public String getAllData() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void setDataStore() {
		// TODO Auto-generated method stub
		
	}
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	


}
