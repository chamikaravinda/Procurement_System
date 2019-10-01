package com.procurement.procurement_server.dao.user_dao;

import com.procurement.procurement_server.model.user_level.FinanceEmployee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FinanceEmployeeRepo extends MongoRepository<FinanceEmployee, String> {
}
