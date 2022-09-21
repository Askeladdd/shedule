package org.itstep.shedulerest.repository;

import org.itstep.shedulerest.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Query("select plan from Plan plan \n" +
            "where plan.sortWork.id=:sort_id")
    public List<Plan> findBySubject(@Param("sort_id") Long sort_id);

    @Query("select plan from Plan plan \n" +
            "where plan.sortWork.id=:sort_id and plan.subject.id=:subject_id and plan.group.id=:group_id")
    public List<Plan> findBySortSubjectGroup(@Param("sort_id") Long sort_id, @Param("subject_id") Long subject_id, @Param("group_id") Long group_id);
}