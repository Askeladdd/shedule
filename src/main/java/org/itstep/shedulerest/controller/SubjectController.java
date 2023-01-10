package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.Subject;
import org.itstep.shedulerest.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class SubjectController {
    @Autowired
    SubjectService service;

    @GetMapping(value="/subject")
    public List<Subject> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/subject/{id}")
    public Optional<Subject> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/subject")
    Subject create(@RequestBody Subject subject) {
        return service.save(subject);
    }

    @PutMapping(value="/subject/{id}")
    Subject update(@RequestBody Subject newSubject, @PathVariable Long id) {
        return service.findById(id).map(subject -> {
            subject.setName(newSubject.getName());
            return service.save(subject);
        }).orElse(null);
    }

    @DeleteMapping(value="/subject/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }
}
