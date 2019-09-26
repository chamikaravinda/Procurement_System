package com.procurement.procurement_server.datastore;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public abstract class AbstractDatastore <T extends DatabaseEvent> {

    protected Map<String, Map<String, T>> dataStore = new HashMap<>();

    public abstract void setDataStore(List list);

    public abstract T getUserFromStore(String key);

    public abstract void addToStore(Object obj);

}
