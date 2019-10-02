package com.procurement.procurement_server.util;

import com.procurement.procurement_server.model.Requistion;

public class PendingOrder implements OrderCommand{

	private Requistion requisition;
	
	public PendingOrder( Requistion requistion ) {
		this.requisition = requistion;
	}
	
	@Override
	public Requistion execute() {
		return requisition.pending(this.requisition);
	}

}
