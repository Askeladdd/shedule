package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Subject;
import org.itstep.shedulerest.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    SubjectRepository repository;

    public List<Subject> findAll(){
        return repository.findAll();
    }

    public Optional<Subject> findById(Long id){
        return repository.findById(id);
    }

    public Subject save(Subject subject){return repository.save(subject);}

    public void deleteById(Long id){
        repository.deleteById(id);
    }
}
