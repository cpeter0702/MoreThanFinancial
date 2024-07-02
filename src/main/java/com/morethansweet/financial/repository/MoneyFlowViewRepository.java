package com.morethansweet.financial.repository;

import com.morethansweet.financial.domain.MoneyFlowView;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MoneyFlowView entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoneyFlowViewRepository extends JpaRepository<MoneyFlowView, Long> {}
