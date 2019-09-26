package com.procurement.procurement_server.dao.user_dao;



import org.springframework.data.mongodb.repository.MongoRepository;

import com.procurement.procurement_server.model.user_level.User;

import java.util.List;

public interface UserRepo extends MongoRepository<User, String> {

    List<User> findAll();

    User findByemail(String email);
}
