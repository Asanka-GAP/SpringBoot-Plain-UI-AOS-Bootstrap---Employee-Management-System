package edu.icet.demo.service;

import edu.icet.demo.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee persist(Employee employee);
    List<Employee> retrive();

    Employee removeEmployee(Integer id);

    Employee updateEmployee(Integer id,Employee employee);

    Employee findEmployeeById(Integer id);
}
