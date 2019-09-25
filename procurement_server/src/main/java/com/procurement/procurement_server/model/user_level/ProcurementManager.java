package com.procurement.procurement_server.model.user_level;

import java.util.List;

/**
 * added a list to get all the Purchases
 * removed staff id no need to use it here
 *
 ***/


public class ProcurementManager {

    private List<String> purchaseList;

    public List<String> getPurchaseList() {
        return purchaseList;
    }

    public void setPurchaseList(List<String> purchaseList) {
        this.purchaseList = purchaseList;
    }
}
