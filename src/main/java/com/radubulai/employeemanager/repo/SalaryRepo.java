package com.radubulai.employeemanager.repo;

import com.radubulai.employeemanager.model.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaryRepo extends JpaRepository<Salary, Long> {
    @Query("select s from Salary s where s.employee.id = ?1")
    List<Salary> findSalariesByEmployeeId(Long id);
}