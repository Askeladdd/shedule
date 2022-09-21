package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.*;
import org.itstep.shedulerest.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class PlanController {
    @Autowired
    PlanService service;

    @Autowired
    GroupService groupService;

    @Autowired
    SubjectService subjectService;

    @Autowired
    TypeWorkService typeWorkService;

    @Autowired
    SortWorkService sortWorkService;

    @GetMapping(value="/plan")
    public List<Plan> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/plan/{id}")
    public Optional<Plan> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/plan")
    Plan create(@RequestBody PlanRequest planRequest) {
        Plan plan = new Plan();
        plan.setDateBegin(planRequest.getDateBegin());
        plan.setDateEnd(planRequest.getDateEnd());
        plan.setCount(planRequest.getCount());
        plan.setGroup(groupService.findById(planRequest.getGroupId()).orElse(null));
        plan.setSubject(subjectService.findById(planRequest.getSubjectId()).orElse(null));
        plan.setTypeWork(typeWorkService.findById(planRequest.getTypeId()).orElse(null));
        plan.setSortWork(sortWorkService.findById(planRequest.getSortId()).orElse(null));
        return service.save(plan);
    }

    @PutMapping(value="/plan/{id}")
    Plan update(@RequestBody PlanRequest planRequest, @PathVariable Long id) {
        return service.findById(id).map(plan -> {
            plan.setDateBegin(planRequest.getDateBegin());
            plan.setDateEnd(planRequest.getDateEnd());
            plan.setCount(planRequest.getCount());
            plan.setGroup(groupService.findById(planRequest.getGroupId()).orElse(null));
            plan.setSubject(subjectService.findById(planRequest.getSubjectId()).orElse(null));
            plan.setTypeWork(typeWorkService.findById(planRequest.getTypeId()).orElse(null));
            plan.setSortWork(sortWorkService.findById(planRequest.getSortId()).orElse(null));
            return service.save(plan);
        }).orElse(null);
    }

    @DeleteMapping(value="/plan/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }

    @GetMapping(value="/plan/sort/{id}")
    public List<Plan> findBySort(@PathVariable Long id){
        return service.findBySubject(id);
    }

    @GetMapping(value="/plan/group")
    public List<PlanGroup> findGroup(){
        return service.findGroup();
    }

    @GetMapping(value="/plan/sort/{sortId}/subject/{subjectId}/group/{groupId}")
    public List<Plan> findBySortSubjectGroup(@PathVariable Long sortId, @PathVariable Long subjectId, @PathVariable Long groupId){
        return service.findBySortSubjectGroup(sortId, subjectId, groupId);
    }
}
