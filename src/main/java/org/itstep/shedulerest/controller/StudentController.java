package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.Student;
import org.itstep.shedulerest.model.StudentRequest;
import org.itstep.shedulerest.service.GroupService;
import org.itstep.shedulerest.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class StudentController {
    @Autowired
   StudentService service;

    @Autowired
    GroupService groupService;

    @GetMapping(value="/student")
    public List<Student> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/student/{id}")
    public Optional<Student> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/student")
    Student create(@RequestBody StudentRequest studentRequest) {
        Student student = new Student();
        student.setSurname(studentRequest.getSurname());
        student.setName(studentRequest.getName());
        student.setPatronymic(studentRequest.getPatronymic());
        student.setGroup(groupService.findById(studentRequest.getGroupId()).orElse(null));
        return service.save(student);
    }

    @PutMapping(value="/student/{id}")
    Student update(@RequestBody Student studentNew, @PathVariable Long id) {
        return service.findById(id).map(student -> {
            student.setSurname(studentNew.getSurname());
            student.setName(studentNew.getName());
            student.setPatronymic(studentNew.getPatronymic());
            student.setGroup(groupService.findById(studentNew.getGroup().getId()).orElse(null));
            return service.save(student);
        }).orElse(null);
    }

    @DeleteMapping(value="/student/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }


}
