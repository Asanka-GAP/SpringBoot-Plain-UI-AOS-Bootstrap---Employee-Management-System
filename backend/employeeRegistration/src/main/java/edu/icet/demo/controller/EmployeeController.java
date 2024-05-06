package edu.icet.demo.controller;

import edu.icet.demo.model.Employee;
import edu.icet.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @PostMapping("/employee")
    Employee persist(@RequestBody Employee employee){
        return employeeService.persist(employee);
    }

    @GetMapping("/employee")
    List<Employee> retrive(){
        return employeeService.retrive();
    }

    @GetMapping("employee/{id}")
    Employee findById(@PathVariable Integer id){
        return employeeService.findEmployeeById(id);
    }

    @DeleteMapping("employee/{id}")
    Employee delete(@PathVariable Integer id){
        return employeeService.removeEmployee(id);
    }

    @PutMapping("employee/{id}")
    Employee update(@PathVariable("id") Integer id,@RequestBody Employee employee){
        return employeeService.updateEmployee(id, employee);
    }
}
