package com.procurement.procurement_server.dao;



import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.procurement.procurement_server.model.User;

import java.util.List;

public interface UserRepo extends MongoRepository<User, String> {

    List<User> findAll();
}
