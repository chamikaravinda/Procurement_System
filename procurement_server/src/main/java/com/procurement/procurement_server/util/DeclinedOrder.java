package com.procurement.procurement_server.util;

import com.procurement.procurement_server.model.Requistion;

public class DeclinedOrder implements OrderCommand{

	private Requistion requisition;
	
	public DeclinedOrder( Requistion requistion ) {
		this.requisition = requistion;
	}
	
	@Override
	public Requistion execute() {
		return requisition.declined(this.requisition);
	}

	
}
