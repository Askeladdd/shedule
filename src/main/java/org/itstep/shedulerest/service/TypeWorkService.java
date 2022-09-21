package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Plan;
import org.itstep.shedulerest.model.Subject;
import org.itstep.shedulerest.model.TypeWork;
import org.itstep.shedulerest.repository.TypeWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeWorkService {

    @Autowired
    TypeWorkRepository repository;

    public List<TypeWork> findAll(){
        return repository.findAll();
    }

    public Optional<TypeWork> findById(Long id){
        return repository.findById(id);
    }

    public TypeWork save(TypeWork typeWork){return repository.save(typeWork);}

    public void deleteById(Long id){
        repository.deleteById(id);
    }
}
