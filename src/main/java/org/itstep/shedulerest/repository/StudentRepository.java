package org.itstep.shedulerest.repository;

import org.itstep.shedulerest.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("select student from Student student \n" +
            "where student.group.id=:group_id")
    public List<Student> findByGroupId(Long group_id);
}