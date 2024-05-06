package edu.icet.demo.repository;

import edu.icet.demo.entity.EmployeeEntity;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<EmployeeEntity,Integer> {
}
