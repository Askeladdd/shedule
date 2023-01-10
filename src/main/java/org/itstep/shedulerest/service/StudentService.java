package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Student;
import org.itstep.shedulerest.repository.GroupRepository;
import org.itstep.shedulerest.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public List<Student> findByGroupId(Long group_id) {
        return repository.findByGroupId(group_id);
    }

    public Student save(Student student) {
        return repository.save(student);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }



}
