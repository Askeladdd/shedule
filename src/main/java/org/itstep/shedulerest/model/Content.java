package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Address;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "content")
public class Content {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String theme;
    private int count;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "subjectId", referencedColumnName = "id")
    private Subject subject;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "typeId", referencedColumnName = "id")
    private TypeWork typeWork;
}
