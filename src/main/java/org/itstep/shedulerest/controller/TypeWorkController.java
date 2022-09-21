package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.Subject;
import org.itstep.shedulerest.model.TypeWork;
import org.itstep.shedulerest.service.SubjectService;
import org.itstep.shedulerest.service.TypeWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class TypeWorkController {
    @Autowired
    TypeWorkService service;

    @GetMapping(value="/typework")
    public List<TypeWork> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/typework/{id}")
    public Optional<TypeWork> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/typework")
    TypeWork create(@RequestBody TypeWork newTypeWork) {
        return service.save(newTypeWork);
    }

    @PutMapping(value="/typework/{id}")
    TypeWork update(@RequestBody TypeWork newTypeWork, @PathVariable Long id) {
        return service.findById(id).map(typeWork -> {
            typeWork.setName(newTypeWork.getName());
            typeWork.setShortName(newTypeWork.getShortName());
            return service.save(typeWork);
        }).orElse(null);
    }

    @DeleteMapping(value="/typework/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }
}
