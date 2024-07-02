package com.morethansweet.financial.web.rest;

import com.morethansweet.financial.domain.MtsIncome;
import com.morethansweet.financial.repository.MtsIncomeRepository;
import com.morethansweet.financial.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.morethansweet.financial.domain.MtsIncome}.
 */
@RestController
@RequestMapping("/api/mts-incomes")
@Transactional
public class MtsIncomeResource {

    private final Logger log = LoggerFactory.getLogger(MtsIncomeResource.class);

    private static final String ENTITY_NAME = "mtsIncome";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MtsIncomeRepository mtsIncomeRepository;

    public MtsIncomeResource(MtsIncomeRepository mtsIncomeRepository) {
        this.mtsIncomeRepository = mtsIncomeRepository;
    }

    /**
     * {@code POST  /mts-incomes} : Create a new mtsIncome.
     *
     * @param mtsIncome the mtsIncome to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mtsIncome, or with status {@code 400 (Bad Request)} if the mtsIncome has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<MtsIncome> createMtsIncome(@Valid @RequestBody MtsIncome mtsIncome) throws URISyntaxException {
        log.debug("REST request to save MtsIncome : {}", mtsIncome);
        if (mtsIncome.getId() != null) {
            throw new BadRequestAlertException("A new mtsIncome cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MtsIncome result = mtsIncomeRepository.save(mtsIncome);
        return ResponseEntity
            .created(new URI("/api/mts-incomes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mts-incomes/:id} : Updates an existing mtsIncome.
     *
     * @param id the id of the mtsIncome to save.
     * @param mtsIncome the mtsIncome to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mtsIncome,
     * or with status {@code 400 (Bad Request)} if the mtsIncome is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mtsIncome couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MtsIncome> updateMtsIncome(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MtsIncome mtsIncome
    ) throws URISyntaxException {
        log.debug("REST request to update MtsIncome : {}, {}", id, mtsIncome);
        if (mtsIncome.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mtsIncome.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mtsIncomeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MtsIncome result = mtsIncomeRepository.save(mtsIncome);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mtsIncome.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mts-incomes/:id} : Partial updates given fields of an existing mtsIncome, field will ignore if it is null
     *
     * @param id the id of the mtsIncome to save.
     * @param mtsIncome the mtsIncome to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mtsIncome,
     * or with status {@code 400 (Bad Request)} if the mtsIncome is not valid,
     * or with status {@code 404 (Not Found)} if the mtsIncome is not found,
     * or with status {@code 500 (Internal Server Error)} if the mtsIncome couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MtsIncome> partialUpdateMtsIncome(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MtsIncome mtsIncome
    ) throws URISyntaxException {
        log.debug("REST request to partial update MtsIncome partially : {}, {}", id, mtsIncome);
        if (mtsIncome.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mtsIncome.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mtsIncomeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MtsIncome> result = mtsIncomeRepository
            .findById(mtsIncome.getId())
            .map(existingMtsIncome -> {
                if (mtsIncome.getIncomeDate() != null) {
                    existingMtsIncome.setIncomeDate(mtsIncome.getIncomeDate());
                }
                if (mtsIncome.getIncomeAmount() != null) {
                    existingMtsIncome.setIncomeAmount(mtsIncome.getIncomeAmount());
                }
                if (mtsIncome.getIncomeType() != null) {
                    existingMtsIncome.setIncomeType(mtsIncome.getIncomeType());
                }
                if (mtsIncome.getIncomeTypeDetail() != null) {
                    existingMtsIncome.setIncomeTypeDetail(mtsIncome.getIncomeTypeDetail());
                }
                if (mtsIncome.getIncomePayer() != null) {
                    existingMtsIncome.setIncomePayer(mtsIncome.getIncomePayer());
                }
                if (mtsIncome.getIncomeReceiver() != null) {
                    existingMtsIncome.setIncomeReceiver(mtsIncome.getIncomeReceiver());
                }
                if (mtsIncome.getIncomeRemark() != null) {
                    existingMtsIncome.setIncomeRemark(mtsIncome.getIncomeRemark());
                }
                if (mtsIncome.getIsActive() != null) {
                    existingMtsIncome.setIsActive(mtsIncome.getIsActive());
                }
                if (mtsIncome.getModifier() != null) {
                    existingMtsIncome.setModifier(mtsIncome.getModifier());
                }
                if (mtsIncome.getModifyDatetime() != null) {
                    existingMtsIncome.setModifyDatetime(mtsIncome.getModifyDatetime());
                }
                if (mtsIncome.getCreator() != null) {
                    existingMtsIncome.setCreator(mtsIncome.getCreator());
                }
                if (mtsIncome.getCreateDatetime() != null) {
                    existingMtsIncome.setCreateDatetime(mtsIncome.getCreateDatetime());
                }

                return existingMtsIncome;
            })
            .map(mtsIncomeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mtsIncome.getId().toString())
        );
    }

    /**
     * {@code GET  /mts-incomes} : get all the mtsIncomes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mtsIncomes in body.
     */
    @GetMapping("")
    public List<MtsIncome> getAllMtsIncomes() {
        log.debug("REST request to get all MtsIncomes");
        return mtsIncomeRepository.findAll();
    }

    /**
     * {@code GET  /mts-incomes/:id} : get the "id" mtsIncome.
     *
     * @param id the id of the mtsIncome to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mtsIncome, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MtsIncome> getMtsIncome(@PathVariable("id") Long id) {
        log.debug("REST request to get MtsIncome : {}", id);
        Optional<MtsIncome> mtsIncome = mtsIncomeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mtsIncome);
    }

    /**
     * {@code DELETE  /mts-incomes/:id} : delete the "id" mtsIncome.
     *
     * @param id the id of the mtsIncome to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMtsIncome(@PathVariable("id") Long id) {
        log.debug("REST request to delete MtsIncome : {}", id);
        mtsIncomeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
