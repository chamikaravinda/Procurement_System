package com.procurement.procurement_server.model.user_level;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.procurement.procurement_server.datastore.DatabaseEvent;


@Document(collection = "users")
public class User implements DatabaseEvent {

    @Id
    private String _id;
    private String email;
    private String password;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getAllData() {
        return null;
    }

    @Override
    public void setDataStore() {

    }


//    @Override
//    public String getAllData() {
//        return null;
//    }
//
//    @Override
//    public void setDataStore() {
//
//    }
}