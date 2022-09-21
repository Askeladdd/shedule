package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class ContentRequest {
        private String theme;
        private int count;
        private Long subjectId;
        private Long typeId;
    }