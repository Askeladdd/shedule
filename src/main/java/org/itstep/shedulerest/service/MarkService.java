package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Mark;
import org.itstep.shedulerest.model.Student;
import org.itstep.shedulerest.repository.ActualRepository;
import org.itstep.shedulerest.repository.GroupRepository;
import org.itstep.shedulerest.repository.MarkRepository;
import org.itstep.shedulerest.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarkService {

    @Autowired
    MarkRepository repository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ActualRepository actualRepository;

    public List<Mark> findAll() {
        return repository.findAll();
    }

    public Optional<Mark> findById(Long id) {
        return repository.findById(id);
    }

    public Mark save(Mark mark) {
        return repository.save(mark);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Mark> findBySortSubjectGroupType(Long sort_id, Long subject_id, Long group_id, Long type_id) {
        return repository.findBySortSubjectGroupType(sort_id, subject_id, group_id, type_id);
    }
}
