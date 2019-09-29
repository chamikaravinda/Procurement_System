package com.procurement.procurement_server.model.user_level;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * added a list to get all the Purchases done by the employee
 * removed staff id no need to use it here
 *
 * SiteManager will order goods
 *
 ***/
@Document(collection = "siteManager")
public class SiteManager extends Staff {

    private List<String> purchaseList;
    private List<String> deliveredPurchasesList;

    /**
     * List should be edited after orders created
     *
     ***/

    public List<String> getPurchaseList() {
        return purchaseList;
    }

    public void setPurchaseList(List<String> purchaseList) {
        this.purchaseList = purchaseList;
    }

    public List<String> getDeliveredPurchasesList() {
        return deliveredPurchasesList;
    }

    public void setDeliveredPurchasesList(List<String> deliveredPurchasesList) {
        this.deliveredPurchasesList = deliveredPurchasesList;
    }
}
