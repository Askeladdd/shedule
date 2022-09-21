package org.itstep.shedulerest.controller;

import org.itstep.shedulerest.model.Content;
import org.itstep.shedulerest.model.ContentRequest;
import org.itstep.shedulerest.model.Plan;
import org.itstep.shedulerest.model.Subject;
import org.itstep.shedulerest.service.ContentService;
import org.itstep.shedulerest.service.SubjectService;
import org.itstep.shedulerest.service.TypeWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class ContentController {
    @Autowired
    ContentService service;

    @Autowired
    SubjectService subjectService;

    @Autowired
    TypeWorkService typeWorkService;

    @GetMapping(value = "/content")
    public List<Content> findAll() {
        return service.findAll();
    }

    @GetMapping(value = "/content/{id}")
    public Optional<Content> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping(value = "/content")
    Content create(@RequestBody ContentRequest contentRequest) {
        Content content = new Content();
        content.setTheme(contentRequest.getTheme());
        content.setCount(contentRequest.getCount());
        content.setSubject(subjectService.findById(contentRequest.getSubjectId()).orElse(null));
        content.setTypeWork(typeWorkService.findById(contentRequest.getTypeId()).orElse(null));
        return service.save(content);
    }

    @PutMapping(value = "/content/{id}")
    Content update(@RequestBody ContentRequest contentRequest, @PathVariable Long id) {
        //System.out.println(contentRequest);
        return service.findById(id).map(content -> {
            content.setTheme(contentRequest.getTheme());
            content.setCount(contentRequest.getCount());
            content.setSubject(subjectService.findById(contentRequest.getSubjectId()).orElse(null));
            content.setTypeWork(typeWorkService.findById(contentRequest.getTypeId()).orElse(null));
            return service.save(content);
        }).orElse(null);
    }

    @DeleteMapping(value = "/content/{id}")
    void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }
}
