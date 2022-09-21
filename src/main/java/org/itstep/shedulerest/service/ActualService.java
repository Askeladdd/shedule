package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Actual;
import org.itstep.shedulerest.model.ActualGroup;
import org.itstep.shedulerest.model.Plan;
import org.itstep.shedulerest.repository.ActualRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

    @Service
    public class ActualService {

        @Autowired
        ActualRepository repository;

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

        public void deleteBySortSubjectGroupType(Long sort_id, Long subject_id, Long group_id, Long type_id) {
            List<Actual> actuals = findBySortSubjectGroupType(sort_id, subject_id, group_id, type_id);
            actuals.stream().forEach(actual->repository.deleteById(actual.getId()));
        }
    }
