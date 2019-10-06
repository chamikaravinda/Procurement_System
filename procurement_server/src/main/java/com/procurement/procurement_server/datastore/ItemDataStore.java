package com.procurement.procurement_server.datastore;

import com.procurement.procurement_server.model.supplier_level.Item;

import java.util.List;

public class ItemDataStore extends AbstractDatastore {

    private static ItemDataStore self;

    public static ItemDataStore getSharedInstance() {
        if (self == null) {
            self = new ItemDataStore();
        }
        return self;
    }



    @Override
    public void setDataStore(List list) {
        List<Item> userArrayList = (List<Item>) list;
        for (Item item : userArrayList) {
            dataStore.put(item.getItemName(),item);
        }
    }

    @Override
    public Item getUserFromStore(String key) {
        return (Item) dataStore.get(key);
    }

    @Override
    public void addToStore(Object obj) {

    }

    @Override
    public void removeFromStore(String id) {

    }
}
