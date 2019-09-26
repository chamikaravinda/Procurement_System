package com.procurement.procurement_server.model.user_level;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * added a list to get all the Purchases and orders
 * removed staff id no need to use it here
 *
 * he will accept the orders from site managers
 *
 * we assiumed that multiple sitemanagers can be added under one supervisor
 *
 ***/

@Document(collection = "supervisor")
public class Supervisor extends Staff {

    private List<String> purchaseList;
    private List<String> orderList;
    private List<String> siteManagers;

    public List<String> getOrderList() {
        return orderList;
    }

    public void setOrderList(List<String> orderList) {
        this.orderList = orderList;
    }

    public List<String> getPurchaseList() {
        return purchaseList;
    }

    public void setPurchaseList(List<String> purchaseList) {
        this.purchaseList = purchaseList;
    }

    public List<String> getSiteManagers() {
        return siteManagers;
    }

    public void setSiteManagers(List<String> siteManagers) {
        this.siteManagers = siteManagers;
    }
}
