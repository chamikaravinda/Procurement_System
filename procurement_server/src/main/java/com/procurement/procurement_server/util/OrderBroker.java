package com.procurement.procurement_server.util;

import com.procurement.procurement_server.model.Requistion;

public class OrderBroker {

	private OrderCommand orderCommand;
	
	public void takeOrder( OrderCommand orderCommand ) {
		this.orderCommand  = orderCommand;
	}
	
	public Requistion placeOrder() {
		return this.orderCommand.execute();	
	}
}
