package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Actual;
import org.itstep.shedulerest.model.ActualGroup;
import org.itstep.shedulerest.model.Mark;
import org.itstep.shedulerest.repository.ActualRepository;
import org.itstep.shedulerest.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

    @Service
    public class ActualService {

        @Autowired
        ActualRepository repository;

        @Autowired
        MarkRepository markRepository;

        public List<Actual> findAll(){
            return repository.findAll();
        }

        public Optional<Actual> findById(Long id){
            return repository.findById(id);
        }

        public Actual save(Actual actual){return repository.save(actual);}

        public void deleteById(Long id){
            repository.deleteById(id);
        }

        public List<ActualGroup> findBySortSubjectGroup() {
            return repository.findBySortSubjectGroup();
        }

        public List<Actual> findBySortSubjectGroupType(Long sort_id, Long subject_id, Long group_id, Long type_id) {
            return repository.findBySortSubjectGroupType(sort_id, subject_id, group_id, type_id);
        }

        public List<Actual> findBySort(Long sort_id, Date dateStart, Date dateEnd) {
            return repository.findBySort(sort_id, dateStart, dateEnd);
        }

        public List<Actual> findByGroup(Long sort_id, Long subject_id, Long group_id, Date dateStart, Date dateEnd) {
            return repository.findByGroup(sort_id, subject_id, group_id, dateStart, dateEnd);
        }

        public void deleteBySortSubjectGroupType(Long sort_id, Long subject_id, Long group_id, Long type_id) {
            //Удалить все оценки, связанные с занятием
            List<Mark> marks = markRepository.findBySortSubjectGroupType(sort_id, subject_id, group_id, type_id);
            marks.stream().forEach(mark->markRepository.deleteById(mark.getId()));
            List<Actual> actuals = findBySortSubjectGroupType(sort_id, subject_id, group_id, type_id);
            actuals.stream().forEach(actual->repository.deleteById(actual.getId()));
        }
    }
