package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActualGroup {
    private SortWork sortWork;
    private Subject subject;
    private Group group;
    private TypeWork typeWork;
    private Double count;
}
