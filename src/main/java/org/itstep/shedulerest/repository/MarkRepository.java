package org.itstep.shedulerest.repository;

import org.itstep.shedulerest.model.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {

    @Query("select mark from Mark mark \n" +
            "where mark.actual.sortWork.id=:sort_id and mark.actual.subject.id=:subject_id and mark.actual.group.id=:group_id and mark.actual.typeWork.id=:type_id")
    public List<Mark> findBySortSubjectGroupType(@Param("sort_id") Long sort_id, @Param("subject_id") Long subject_id, @Param("group_id") Long group_id, @Param("type_id") Long type_id);
}