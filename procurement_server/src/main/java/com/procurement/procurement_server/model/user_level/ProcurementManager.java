package com.procurement.procurement_server.model.user_level;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * added a list to get all the Purchases
 * removed staff id no need to use it here
 *
 ***/

@Document(collection = "procurementManager")
public class ProcurementManager extends Staff {

    private List<String> purchaseList;

    public List<String> getPurchaseList() {
        return purchaseList;
    }

    public void setPurchaseList(List<String> purchaseList) {
        this.purchaseList = purchaseList;
    }
}
