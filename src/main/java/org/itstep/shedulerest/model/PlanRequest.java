package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PlanRequest {
    private Long id;
    private Date dateBegin;
    private Date dateEnd;
    private double count;
    private Long groupId;
    private Long subjectId;
    private Long typeId;
    private Long sortId;
}
