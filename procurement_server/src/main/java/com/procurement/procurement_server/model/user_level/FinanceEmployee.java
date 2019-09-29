package com.procurement.procurement_server.model.user_level;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * added a list to get all the paidPurchases done by Finance employee
 * removed payid, ordid because this class cannot handle them.
 * <p>
 * paid purchases by this user
 ***/

@Document(collection = "financeEmployee")
public class FinanceEmployee extends Staff {

    private List<Object> paidPurchaseList;

    public List<Object> getPaidPurchaseList() {
        return paidPurchaseList;
    }

    public void setPaidPurchaseList(List<Object> paidPurchaseList) {
        this.paidPurchaseList = paidPurchaseList;
    }

    private void addToList(Object obj) {
        paidPurchaseList.add(obj);
    }
}
