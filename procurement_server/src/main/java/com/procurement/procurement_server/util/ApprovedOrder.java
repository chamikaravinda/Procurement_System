package com.procurement.procurement_server.util;

import com.procurement.procurement_server.model.Requistion;

public class ApprovedOrder implements OrderCommand{
	
	private Requistion requisition;
	
	public ApprovedOrder( Requistion requistion ) {
		this.requisition = requistion;
	}
	
	@Override
	public Requistion execute() {
		return requisition.approved(requisition);
	}

	
}
