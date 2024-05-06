package edu.icet.demo.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class Employee {
    private Integer id;
    private String name;
    private String age;
    private String address;
    private String role;
}
