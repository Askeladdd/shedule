package org.itstep.shedulerest.service;

import org.itstep.shedulerest.model.*;
import org.itstep.shedulerest.repository.PlanRepository;
import org.itstep.shedulerest.repository.TypeWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class PlanService {

    @Autowired
    PlanRepository repository;

    @Autowired
    TypeWorkRepository typeWorkRepository;

    public List<Plan> findAll() {
        return repository.findAll();
    }

    public Optional<Plan> findById(Long id) {
        return repository.findById(id);
    }

    public Plan save(Plan plan) {
        return repository.save(plan);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Plan> findBySubject(Long sort_id) {
        return repository.findBySubject(sort_id);
    }

    public List<PlanGroup> findGroup() {
        List<Plan> plans = repository.findAll();

        //Заполнить виды нагрузки
        List<TypeWork> typeWorks = typeWorkRepository.findAll();
        Set<PlanGroup.TypeWorkCount> typeWorkCounts =
                typeWorks.stream().map(typeWork -> {
                    PlanGroup.TypeWorkCount typeWorkCount = new PlanGroup.TypeWorkCount();
                    typeWorkCount.setId(typeWork.getId());
                    typeWorkCount.setShortName(typeWork.getShortName());
                    typeWorkCount.setCount(0.);
                    return typeWorkCount;
                }).collect(Collectors.toSet());

        List<PlanGroup> planGroups = new ArrayList<>();
        AtomicLong counter = new AtomicLong(1L);

        plans.stream()
                .forEach(plan -> {
                    //Найти в коллекции запись PlanGroup
                    PlanGroup planGroup = planGroups.stream()
                            .filter(planGroupTemp ->
                            (planGroupTemp.getSortWorkId() == plan.getSortWork().getId() &&
                                    planGroupTemp.getSubjectId() == plan.getSubject().getId() &&
                                    planGroupTemp.getGroupId() == plan.getGroup().getId()))
                            .findFirst().orElse(null);

                    if (planGroup==null){
                        planGroup = new PlanGroup();
                        planGroup.setId(counter.getAndIncrement());

                        planGroup.setSubjectId(plan.getSubject().getId());
                        planGroup.setGroupId(plan.getGroup().getId());
                        planGroup.setGroupCount(plan.getGroup().getCount());
                        planGroup.setSortWorkId(plan.getSortWork().getId());
                        Set<PlanGroup.TypeWorkCount> typeWorkCountsTemp =new HashSet<>();
                        typeWorkCounts.stream().forEach(typeWorkCount->{
                            PlanGroup.TypeWorkCount typeWorkCountTemp = new PlanGroup.TypeWorkCount(typeWorkCount.getId(), typeWorkCount.getIdPlan(), typeWorkCount.getShortName(), typeWorkCount.getCount());
                                    typeWorkCountsTemp.add(typeWorkCountTemp);
                                });
                        planGroup.setTypeWorkCounts(new HashSet<>(typeWorkCountsTemp));
                        planGroups.add(planGroup);
                    }

                    //Найти вид работы по id и задать количество часов
                    planGroup.addTypeWorkCount(plan.getTypeWork().getId(), plan.getId(), plan.getCount());
                    //System.out.println("ok");
                    //System.out.println(plan);
                });
        //planGroups.stream().forEach(planGroup -> System.out.println(planGroup.getTypeWorkCounts()));
        return planGroups;
    }

    public List<Plan> findBySortSubjectGroup(Long sort_id, Long subject_id, Long group_id) {
        return repository.findBySortSubjectGroup(sort_id, subject_id, group_id);
    }

}
