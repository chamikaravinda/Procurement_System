package com.procurement.procurement_server.service.order_service.builder;

import com.procurement.procurement_server.model.order_level.Requistion;

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
