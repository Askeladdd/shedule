package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.Group;
import org.itstep.shedulerest.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class GroupController {
    @Autowired
    GroupService service;

    @GetMapping(value="/group")
    public List<Group> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/group/{id}")
    public Optional<Group> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/group")
    Group create(@RequestBody Group group) {
        return service.save(group);
    }

    @PutMapping(value="/group/{id}")
    Group update(@RequestBody Group newGroup, @PathVariable Long id) {
        return service.findById(id).map(group -> {
            group.setName(newGroup.getName());
            group.setCount(newGroup.getCount());
            return service.save(group);
        }).orElse(null);
    }

    @DeleteMapping(value="/group/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }
}
