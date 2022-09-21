package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.SortWork;
import org.itstep.shedulerest.model.TypeWork;
import org.itstep.shedulerest.service.SortWorkService;
import org.itstep.shedulerest.service.TypeWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class SortWorkController {
    @Autowired
    SortWorkService service;

    @GetMapping(value="/sortwork")
    public List<SortWork> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/sortwork/{id}")
    public Optional<SortWork> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/sortwork")
    SortWork create(@RequestBody SortWork newSortWork) {
        return service.save(newSortWork);
    }

    @PutMapping(value="/sortwork/{id}")
    SortWork update(@RequestBody SortWork newSortWork, @PathVariable Long id) {
        return service.findById(id).map(sortWork -> {
            sortWork.setName(newSortWork.getName());
            return service.save(sortWork);
        }).orElse(null);
    }

    @DeleteMapping(value="/sortwork/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }
}
