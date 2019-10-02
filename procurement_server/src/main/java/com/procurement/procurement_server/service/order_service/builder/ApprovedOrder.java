package com.procurement.procurement_server.service.order_service.builder;

import com.procurement.procurement_server.model.order_level.Requistion;

public class ApprovedOrder implements OrderCommand {
	
	private Requistion requisition;
	
	public ApprovedOrder( Requistion requistion ) {
		this.requisition = requistion;
	}
	
	@Override
	public Requistion execute() {
		return requisition.approved(requisition);
	}

	
}
