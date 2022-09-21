package org.itstep.shedulerest.repository;

import org.itstep.shedulerest.model.Subject;
import org.itstep.shedulerest.model.TypeWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeWorkRepository extends JpaRepository<TypeWork, Long> {
}