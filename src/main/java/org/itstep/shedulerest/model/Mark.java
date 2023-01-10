package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "mark")
public class Mark {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer mark;
    private Boolean presence;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "studentId", referencedColumnName = "id")
    private Student student;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "actualId", referencedColumnName = "id")
    private Actual actual;
}
