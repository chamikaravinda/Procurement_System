package com.procurement.procurement_server.service.order_service.builder;

import com.procurement.procurement_server.model.order_level.Requistion;

public class OrderBroker {

	private OrderCommand orderCommand;
	
	public void takeOrder( OrderCommand orderCommand ) {
		this.orderCommand  = orderCommand;
	}
	
	public Requistion placeOrder() {
		return this.orderCommand.execute();	
	}
}
