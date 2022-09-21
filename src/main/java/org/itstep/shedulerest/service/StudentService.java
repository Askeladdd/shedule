package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Plan;
import org.itstep.shedulerest.model.PlanGroup;
import org.itstep.shedulerest.model.Student;
import org.itstep.shedulerest.model.TypeWork;
import org.itstep.shedulerest.repository.GroupRepository;
import org.itstep.shedulerest.repository.PlanRepository;
import org.itstep.shedulerest.repository.StudentRepository;
import org.itstep.shedulerest.repository.TypeWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    StudentRepository repository;

    @Autowired
    GroupRepository groupRepository;

    public List<Student> findAll() {
        return repository.findAll();
    }

    public Optional<Student> findById(Long id) {
        return repository.findById(id);
    }

    public Student save(Student student) {
        return repository.save(student);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
