package com.procurement.procurement_server.datastore;


import com.procurement.procurement_server.model.user_level.User;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDatastore extends AbstractDatastore {

    private static UserDatastore self;

    public static UserDatastore getSharedInstance() {
        if (self == null) {
            self = new UserDatastore();
        }
        return self;
    }

    @Override
    public void setDataStore(List list) {
        List<User> userArrayList = (List<User>) list;
        for (User user : userArrayList) {
            dataStore.put(user.getEmail(), user);
        }
    }

    @Override
    public User getUserFromStore(String key) {
        return (User) dataStore.get(key);
    }

    @Override
    public void addToStore(Object obj) {
        dataStore.put(((User) obj).getEmail(), obj);
    }

    @Override
    public void removeFromStore(String id) {
        dataStore.remove(id);
    }

}
