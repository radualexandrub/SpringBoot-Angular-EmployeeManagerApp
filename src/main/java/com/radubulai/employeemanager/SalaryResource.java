package com.radubulai.employeemanager;

import com.radubulai.employeemanager.model.Salary;
import com.radubulai.employeemanager.service.SalaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salaries")
public class SalaryResource {
    private final SalaryService salaryService;

    public SalaryResource(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @GetMapping("")
    public ResponseEntity<List<Salary>> findAllSalaries() {
        return new ResponseEntity<>(salaryService.findAllSalaries(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salary> findSalaryById(@PathVariable Long id) {
        return new ResponseEntity<>(salaryService.findSalaryById(id), HttpStatus.OK);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<List<Salary>> findSalariesByEmployeeId(@PathVariable Long id) {
        return new ResponseEntity<>(salaryService.findSalariesByEmployeeId(id), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Salary> addSalary(@RequestBody Salary salary) {
        return new ResponseEntity<>(salaryService.addSalary(salary), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Salary> updateSalary(@RequestBody Salary salary) {
        return new ResponseEntity<>(salaryService.updateSalary(salary), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalaryById(@PathVariable Long id) {
        salaryService.deleteSalaryById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}