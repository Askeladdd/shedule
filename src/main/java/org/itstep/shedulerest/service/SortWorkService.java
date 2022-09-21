package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.SortWork;
import org.itstep.shedulerest.model.TypeWork;
import org.itstep.shedulerest.repository.SortWorkRepository;
import org.itstep.shedulerest.repository.TypeWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SortWorkService {

    @Autowired
    SortWorkRepository repository;

    public List<SortWork> findAll(){
        return repository.findAll();
    }

    public Optional<SortWork> findById(Long id){
        return repository.findById(id);
    }

    public SortWork save(SortWork sortWork){return repository.save(sortWork);}

    public void deleteById(Long id){
        repository.deleteById(id);
    }
}
