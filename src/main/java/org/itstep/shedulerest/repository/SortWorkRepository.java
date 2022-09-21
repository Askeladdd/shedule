package org.itstep.shedulerest.repository;

import org.itstep.shedulerest.model.SortWork;
import org.itstep.shedulerest.model.TypeWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SortWorkRepository extends JpaRepository<SortWork, Long> {
}