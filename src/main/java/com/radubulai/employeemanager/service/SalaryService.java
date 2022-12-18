package com.radubulai.employeemanager.service;

import com.radubulai.employeemanager.exception.UserNotFoundException;
import com.radubulai.employeemanager.model.Salary;
import com.radubulai.employeemanager.repo.SalaryRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SalaryService {
    private final SalaryRepo salaryRepo;

    public SalaryService(SalaryRepo salaryRepo) {
        this.salaryRepo = salaryRepo;
    }

    public List<Salary> findAllSalaries() {
        return salaryRepo.findAll();
    }

    public Salary findSalaryById(Long id) {
        return salaryRepo.findById(id).orElseThrow(
                () -> new UserNotFoundException("Salary by id " + id + " was not found"));
    }

    public List<Salary> findSalariesByEmployeeId(Long id) {
        return salaryRepo.findSalariesByEmployeeId(id);
    }

    public Salary addSalary(Salary salary) {
        return salaryRepo.save(salary);
    }

    public Salary updateSalary(Salary salary) {
        return salaryRepo.save(salary);
    }

    public void deleteSalaryById(Long id) {
        salaryRepo.deleteById(id);
    }
}
