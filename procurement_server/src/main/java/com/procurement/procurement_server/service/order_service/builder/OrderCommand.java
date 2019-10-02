package com.procurement.procurement_server.service.order_service.builder;

import com.procurement.procurement_server.model.order_level.Requistion;

public interface OrderCommand {

	public Requistion execute();
}
