package org.itstep.shedulerest.repository;

import org.itstep.shedulerest.model.Actual;
import org.itstep.shedulerest.model.ActualGroup;
import org.itstep.shedulerest.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActualRepository extends JpaRepository<Actual, Long> {

    @Query("select new org.itstep.shedulerest.model.ActualGroup(actual.sortWork, actual.subject, actual.group, actual.typeWork, sum(actual.count)) from Actual actual \n" +
            "group by actual.sortWork.id, actual.subject.id, actual.group.id, actual.typeWork.id")
    public List<ActualGroup> findBySortSubjectGroup();

    @Query("select actual from Actual actual \n" +
            "where actual.sortWork.id=:sort_id and actual.subject.id=:subject_id and actual.group.id=:group_id and actual.typeWork.id=:type_id")
    public List<Actual> findBySortSubjectGroupType(@Param("sort_id") Long sort_id, @Param("subject_id") Long subject_id, @Param("group_id") Long group_id, @Param("type_id") Long type_id);
}