package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.Content;
import org.itstep.shedulerest.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

    @Service
    public class ContentService {

        @Autowired
        ContentRepository repository;

        public List<Content> findAll(){
            return repository.findAll();
        }

        public Optional<Content> findById(Long id){
            return repository.findById(id);
        }

        public Content save(Content content){return repository.save(content);}

        public void deleteById(Long id){
            repository.deleteById(id);
        }
    }
