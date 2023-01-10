package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.Mark;
import org.itstep.shedulerest.model.MarkRequest;
import org.itstep.shedulerest.model.Student;
import org.itstep.shedulerest.model.StudentRequest;
import org.itstep.shedulerest.service.ActualService;
import org.itstep.shedulerest.service.GroupService;
import org.itstep.shedulerest.service.MarkService;
import org.itstep.shedulerest.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class MarkController {
    @Autowired
    MarkService service;

    @Autowired
    StudentService studentService;

    @Autowired
    ActualService actualService;

    @GetMapping(value="/mark")
    public List<Mark> findAll(){
        return service.findAll();
    }

    @GetMapping(value="/mark/{id}")
    public Optional<Mark> findById(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping(value="/mark")
    Mark create(@RequestBody MarkRequest markRequest) {
        Mark mark = new Mark();
        mark.setMark(markRequest.getMark());
        mark.setPresence(markRequest.getPresence());
        mark.setStudent(studentService.findById(markRequest.getStudentId()).orElse(null));
        mark.setActual(actualService.findById(markRequest.getActualId()).orElse(null));
        return service.save(mark);
    }

    @PutMapping(value="/mark/{id}")
    Mark update(@RequestBody  MarkRequest markRequest, @PathVariable Long id) {
        return service.findById(id).map(mark -> {
            mark.setMark(markRequest.getMark());
            mark.setPresence(markRequest.getPresence());
            mark.setStudent(studentService.findById(markRequest.getStudentId()).orElse(null));
            mark.setActual(actualService.findById(markRequest.getActualId()).orElse(null));
            return service.save(mark);
        }).orElse(null);
    }

    @DeleteMapping(value="/mark/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }

    @GetMapping(value="/mark/sort/{sortId}/subject/{subjectId}/group/{groupId}/type/{typeId}")
    public List<Mark> findBySortSubjectGroupType(@PathVariable Long sortId, @PathVariable Long subjectId, @PathVariable Long groupId, @PathVariable Long typeId){
        return service.findBySortSubjectGroupType(sortId, subjectId, groupId, typeId);
    }
}
