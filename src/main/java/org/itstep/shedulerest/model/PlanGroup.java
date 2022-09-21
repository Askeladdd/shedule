package org.itstep.shedulerest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanGroup {
    private Long id;
    private Long subjectId;
    private Long groupId;
    private Integer groupCount;
    private Set<TypeWorkCount> typeWorkCounts;
    private Long sortWorkId;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TypeWorkCount{
        Long id;
        Long idPlan;
        String shortName;
        Double count;
    }

    public void addTypeWork(Long id, Long idPlan, String shortName, Double count){
        typeWorkCounts.add(new TypeWorkCount(id, idPlan, shortName, count));
    }

    public void addTypeWorkCount(Long id, Long idPlan, Double count){
        //System.out.println(count);
        TypeWorkCount typeWorkCount = typeWorkCounts.stream()
                .filter(typeWorkCountTemp ->
                        typeWorkCountTemp.getId()==id
                )
                .findFirst().orElse(null);
        typeWorkCount.setCount(typeWorkCount.getCount()+count);
        typeWorkCount.setIdPlan(idPlan);
    }



}
