package com.morethansweet.financial.web.rest;

import com.morethansweet.financial.domain.MtsExpense;
import com.morethansweet.financial.repository.MtsExpenseRepository;
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
 * REST controller for managing {@link com.morethansweet.financial.domain.MtsExpense}.
 */
@RestController
@RequestMapping("/api/mts-expenses")
@Transactional
public class MtsExpenseResource {

    private final Logger log = LoggerFactory.getLogger(MtsExpenseResource.class);

    private static final String ENTITY_NAME = "mtsExpense";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MtsExpenseRepository mtsExpenseRepository;

    public MtsExpenseResource(MtsExpenseRepository mtsExpenseRepository) {
        this.mtsExpenseRepository = mtsExpenseRepository;
    }

    /**
     * {@code POST  /mts-expenses} : Create a new mtsExpense.
     *
     * @param mtsExpense the mtsExpense to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mtsExpense, or with status {@code 400 (Bad Request)} if the mtsExpense has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<MtsExpense> createMtsExpense(@Valid @RequestBody MtsExpense mtsExpense) throws URISyntaxException {
        log.debug("REST request to save MtsExpense : {}", mtsExpense);
        if (mtsExpense.getId() != null) {
            throw new BadRequestAlertException("A new mtsExpense cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MtsExpense result = mtsExpenseRepository.save(mtsExpense);
        return ResponseEntity
            .created(new URI("/api/mts-expenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mts-expenses/:id} : Updates an existing mtsExpense.
     *
     * @param id the id of the mtsExpense to save.
     * @param mtsExpense the mtsExpense to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mtsExpense,
     * or with status {@code 400 (Bad Request)} if the mtsExpense is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mtsExpense couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MtsExpense> updateMtsExpense(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MtsExpense mtsExpense
    ) throws URISyntaxException {
        log.debug("REST request to update MtsExpense : {}, {}", id, mtsExpense);
        if (mtsExpense.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mtsExpense.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mtsExpenseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MtsExpense result = mtsExpenseRepository.save(mtsExpense);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mtsExpense.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mts-expenses/:id} : Partial updates given fields of an existing mtsExpense, field will ignore if it is null
     *
     * @param id the id of the mtsExpense to save.
     * @param mtsExpense the mtsExpense to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mtsExpense,
     * or with status {@code 400 (Bad Request)} if the mtsExpense is not valid,
     * or with status {@code 404 (Not Found)} if the mtsExpense is not found,
     * or with status {@code 500 (Internal Server Error)} if the mtsExpense couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MtsExpense> partialUpdateMtsExpense(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MtsExpense mtsExpense
    ) throws URISyntaxException {
        log.debug("REST request to partial update MtsExpense partially : {}, {}", id, mtsExpense);
        if (mtsExpense.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mtsExpense.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mtsExpenseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MtsExpense> result = mtsExpenseRepository
            .findById(mtsExpense.getId())
            .map(existingMtsExpense -> {
                if (mtsExpense.getExpenseDate() != null) {
                    existingMtsExpense.setExpenseDate(mtsExpense.getExpenseDate());
                }
                if (mtsExpense.getExpenseAmount() != null) {
                    existingMtsExpense.setExpenseAmount(mtsExpense.getExpenseAmount());
                }
                if (mtsExpense.getExpenseType() != null) {
                    existingMtsExpense.setExpenseType(mtsExpense.getExpenseType());
                }
                if (mtsExpense.getExpenseTypeDetail() != null) {
                    existingMtsExpense.setExpenseTypeDetail(mtsExpense.getExpenseTypeDetail());
                }
                if (mtsExpense.getExpensePayer() != null) {
                    existingMtsExpense.setExpensePayer(mtsExpense.getExpensePayer());
                }
                if (mtsExpense.getExpenseReceiver() != null) {
                    existingMtsExpense.setExpenseReceiver(mtsExpense.getExpenseReceiver());
                }
                if (mtsExpense.getExpenseRemark() != null) {
                    existingMtsExpense.setExpenseRemark(mtsExpense.getExpenseRemark());
                }
                if (mtsExpense.getExpenseReceipt() != null) {
                    existingMtsExpense.setExpenseReceipt(mtsExpense.getExpenseReceipt());
                }
                if (mtsExpense.getExpenseReceiptContentType() != null) {
                    existingMtsExpense.setExpenseReceiptContentType(mtsExpense.getExpenseReceiptContentType());
                }
                if (mtsExpense.getIsActive() != null) {
                    existingMtsExpense.setIsActive(mtsExpense.getIsActive());
                }
                if (mtsExpense.getModifier() != null) {
                    existingMtsExpense.setModifier(mtsExpense.getModifier());
                }
                if (mtsExpense.getModifyDatetime() != null) {
                    existingMtsExpense.setModifyDatetime(mtsExpense.getModifyDatetime());
                }
                if (mtsExpense.getCreator() != null) {
                    existingMtsExpense.setCreator(mtsExpense.getCreator());
                }
                if (mtsExpense.getCreateDatetime() != null) {
                    existingMtsExpense.setCreateDatetime(mtsExpense.getCreateDatetime());
                }

                return existingMtsExpense;
            })
            .map(mtsExpenseRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mtsExpense.getId().toString())
        );
    }

    /**
     * {@code GET  /mts-expenses} : get all the mtsExpenses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mtsExpenses in body.
     */
    @GetMapping("")
    public List<MtsExpense> getAllMtsExpenses() {
        log.debug("REST request to get all MtsExpenses");
        return mtsExpenseRepository.findAll();
    }

    /**
     * {@code GET  /mts-expenses/:id} : get the "id" mtsExpense.
     *
     * @param id the id of the mtsExpense to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mtsExpense, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MtsExpense> getMtsExpense(@PathVariable("id") Long id) {
        log.debug("REST request to get MtsExpense : {}", id);
        Optional<MtsExpense> mtsExpense = mtsExpenseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mtsExpense);
    }

    /**
     * {@code DELETE  /mts-expenses/:id} : delete the "id" mtsExpense.
     *
     * @param id the id of the mtsExpense to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMtsExpense(@PathVariable("id") Long id) {
        log.debug("REST request to delete MtsExpense : {}", id);
        mtsExpenseRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
