package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentRequest {
    private Long id;
    private String surname;
    private String name;
    private String patronymic;
    private Long groupId;
}
