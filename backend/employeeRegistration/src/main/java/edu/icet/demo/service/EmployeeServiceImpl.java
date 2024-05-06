package edu.icet.demo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.icet.demo.entity.EmployeeEntity;
import edu.icet.demo.model.Employee;
import edu.icet.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    EmployeeRepository repository;

    @Autowired
    ObjectMapper mapper;
    @Override
    public Employee persist(Employee employee) {
        EmployeeEntity savedEmployee = repository.save(
                mapper.convertValue(
                        employee, EmployeeEntity.class
                )
        );
        return mapper.convertValue(savedEmployee,Employee.class);
    }

    @Override
    public List<Employee> retrive() {
        Iterable<EmployeeEntity> employeeList = repository.findAll();
        List<Employee> employeeModels = new ArrayList<>();
        employeeList.forEach(employeeEntity -> {
            employeeModels.add(
                    mapper.convertValue(employeeEntity,Employee.class)
            );
        });
        return employeeModels;
    }

    @Override
    public Employee removeEmployee(Integer id) {
        Optional<EmployeeEntity> byId = repository.findById(id);
        repository.delete(byId.get());
        return null;
    }

    @Override
    public Employee updateEmployee(Integer id, Employee employee) {
        EmployeeEntity employeeEntity = repository.findById(id).get();
        employeeEntity.setName(employee.getName());
        employeeEntity.setAge(employee.getAge());
        employeeEntity.setAddress(employee.getAddress());
        employeeEntity.setRole(employee.getRole());

        repository.save(employeeEntity);

        return mapper.convertValue(employeeEntity,Employee.class);

    }

    @Override
    public Employee findEmployeeById(Integer id) {
        EmployeeEntity employeeEntity = repository.findById(id).get();

        return mapper.convertValue(employeeEntity,Employee.class);
    }
}
