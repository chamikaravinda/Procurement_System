package com.procurement.procurement_server.datastore;



import java.util.List;

import com.procurement.procurement_server.model.Task;

public class TaskDataStore extends AbstractDatastore {

    private static TaskDataStore self;

    public static TaskDataStore getSharedInstance() {
        if (self == null) {
            self = new TaskDataStore();
        }
        return self;
    }
    @Override
    public void setDataStore(List list) {
        List<Task> taskArrayList = (List<Task>) list;
        for (Task task : taskArrayList) {
            dataStore.put(task.getAssigneeName(),task);
        }
    }

    @Override
    public Task getUserFromStore(String key) {
        return (Task) dataStore.get(key);
    }

    @Override
    public void addToStore(Object obj) {

    }
}
