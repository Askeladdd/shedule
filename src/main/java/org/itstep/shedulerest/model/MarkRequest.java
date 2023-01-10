package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarkRequest {
    private Long id;
    private Integer mark;
    private Boolean presence;
    private Long studentId;
    private Long actualId;
}
