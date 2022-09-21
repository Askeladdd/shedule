package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Group;
import org.itstep.shedulerest.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

    @Service
    public class GroupService {

        @Autowired
        GroupRepository repository;

        public List<Group> findAll(){
            return repository.findAll();
        }

        public Optional<Group> findById(Long id){
            return repository.findById(id);
        }

        public Group save(Group group){return repository.save(group);}

        public void deleteById(Long id){
            repository.deleteById(id);
        }
    }
