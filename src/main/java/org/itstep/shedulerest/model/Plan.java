package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "plan")
    public class Plan {
        @Id
        @Column(name = "id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private Date dateBegin;
        private Date dateEnd;
        private Double count;

        @OneToOne(cascade = CascadeType.REFRESH)
        @JoinColumn(name = "subjectId", referencedColumnName = "id")
        private Subject subject;

        @OneToOne(cascade = CascadeType.REFRESH)
        @JoinColumn(name = "groupId", referencedColumnName = "id")
        private Group group;

        @OneToOne(cascade = CascadeType.REFRESH)
        @JoinColumn(name = "typeId", referencedColumnName = "id")
        private TypeWork typeWork;

        @OneToOne(cascade = CascadeType.REFRESH)
        @JoinColumn(name = "sortId", referencedColumnName = "id")
        private SortWork sortWork;
    }
