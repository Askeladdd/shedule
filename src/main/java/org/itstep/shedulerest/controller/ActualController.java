package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.Actual;
import org.itstep.shedulerest.model.ActualGroup;
import org.itstep.shedulerest.model.ActualRequest;
import org.itstep.shedulerest.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class ActualController {
    @Autowired
    ActualService service;

    @Autowired
    GroupService groupService;

    @Autowired
    SubjectService subjectService;

    @Autowired
    TypeWorkService typeWorkService;

    @Autowired
    SortWorkService sortWorkService;

    @GetMapping(value="/actual")
    public List<Actual> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/actual/{id}")
    public Optional<Actual> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/actual")
    Actual create(@RequestBody ActualRequest actualRequest) {
        Actual actual = new Actual();
        actual.setDate(actualRequest.getDate());
        actual.setCount(actualRequest.getCount());
        actual.setGroup(groupService.findById(actualRequest.getGroupId()).orElse(null));
        actual.setSubject(subjectService.findById(actualRequest.getSubjectId()).orElse(null));
        actual.setTypeWork(typeWorkService.findById(actualRequest.getTypeId()).orElse(null));
        actual.setSortWork(sortWorkService.findById(actualRequest.getSortId()).orElse(null));
        return service.save(actual);
    }

    @PutMapping(value="/actual/{id}")
    Actual update(@RequestBody ActualRequest actualRequest, @PathVariable Long id) {
        return service.findById(id).map(actual -> {
            actual.setDate(actualRequest.getDate());
            actual.setCount(actualRequest.getCount());
            actual.setGroup(groupService.findById(actualRequest.getGroupId()).orElse(null));
            actual.setSubject(subjectService.findById(actualRequest.getSubjectId()).orElse(null));
            actual.setTypeWork(typeWorkService.findById(actualRequest.getTypeId()).orElse(null));
            actual.setSortWork(sortWorkService.findById(actualRequest.getSortId()).orElse(null));
            return service.save(actual);
        }).orElse(null);
    }

    @DeleteMapping(value="/actual/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }

    @GetMapping(value="/actual/group")
    public List<ActualGroup> findBySortSubjectGroup(){
        return service.findBySortSubjectGroup();
    }

    @GetMapping(value="/actual/sort/{sortId}/subject/{subjectId}/group/{groupId}/type/{typeId}")
    public List<Actual> findBySortSubjectGroup(@PathVariable Long sortId, @PathVariable Long subjectId, @PathVariable Long groupId, @PathVariable Long typeId){
        return service.findBySortSubjectGroupType(sortId, subjectId, groupId, typeId);
    }

    @GetMapping(value="/actual/sort/{sortId}/dateStart/{dateStart}/dateEnd/{dateEnd}")
    public List<Actual> findBySort(@PathVariable Long sortId, @PathVariable String dateStart, @PathVariable String dateEnd){
        Date dateStartF= null;
        Date dateEndF= null;
        try {
            dateStartF = new SimpleDateFormat("yyyy-MM-dd").parse(dateStart);
            dateEndF = new SimpleDateFormat("yyyy-MM-dd").parse(dateEnd);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return service.findBySort(sortId, dateStartF, dateEndF);
    }

    @GetMapping(value="/actual/sort/{sortId}/subject/{subjectId}/group/{groupId}/dateStart/{dateStart}/dateEnd/{dateEnd}")
    public List<Actual> findByGroup(@PathVariable Long sortId, @PathVariable Long subjectId, @PathVariable Long groupId, @PathVariable String dateStart, @PathVariable String dateEnd){
        Date dateStartF= null;
        Date dateEndF= null;
        try {
            dateStartF = new SimpleDateFormat("yyyy-MM-dd").parse(dateStart);
            dateEndF = new SimpleDateFormat("yyyy-MM-dd").parse(dateEnd);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return service.findByGroup(sortId, subjectId, groupId, dateStartF, dateEndF);
    }

    @DeleteMapping(value="/actual/sort/{sortId}/subject/{subjectId}/group/{groupId}/type/{typeId}")
    public void deleteBySortSubjectGroupType(@PathVariable Long sortId, @PathVariable Long subjectId, @PathVariable Long groupId, @PathVariable Long typeId){
         service.deleteBySortSubjectGroupType(sortId, subjectId, groupId, typeId);
    }

}
