package com.procurement.procurement_server.dao;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.procurement.procurement_server.model.Task;

import java.util.List;

public interface TaskRepo extends MongoRepository<Task, String> {

    public List<Task> findAll();
}