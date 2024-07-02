package com.morethansweet.financial.web.rest;

import com.morethansweet.financial.domain.NayaxTransactions;
import com.morethansweet.financial.repository.NayaxTransactionsRepository;
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
 * REST controller for managing {@link com.morethansweet.financial.domain.NayaxTransactions}.
 */
@RestController
@RequestMapping("/api/nayax-transactions")
@Transactional
public class NayaxTransactionsResource {

    private final Logger log = LoggerFactory.getLogger(NayaxTransactionsResource.class);

    private static final String ENTITY_NAME = "nayaxTransactions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NayaxTransactionsRepository nayaxTransactionsRepository;

    public NayaxTransactionsResource(NayaxTransactionsRepository nayaxTransactionsRepository) {
        this.nayaxTransactionsRepository = nayaxTransactionsRepository;
    }

    /**
     * {@code POST  /nayax-transactions} : Create a new nayaxTransactions.
     *
     * @param nayaxTransactions the nayaxTransactions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nayaxTransactions, or with status {@code 400 (Bad Request)} if the nayaxTransactions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<NayaxTransactions> createNayaxTransactions(@Valid @RequestBody NayaxTransactions nayaxTransactions)
        throws URISyntaxException {
        log.debug("REST request to save NayaxTransactions : {}", nayaxTransactions);
        if (nayaxTransactions.getId() != null) {
            throw new BadRequestAlertException("A new nayaxTransactions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NayaxTransactions result = nayaxTransactionsRepository.save(nayaxTransactions);
        return ResponseEntity
            .created(new URI("/api/nayax-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nayax-transactions/:id} : Updates an existing nayaxTransactions.
     *
     * @param id the id of the nayaxTransactions to save.
     * @param nayaxTransactions the nayaxTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nayaxTransactions,
     * or with status {@code 400 (Bad Request)} if the nayaxTransactions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nayaxTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<NayaxTransactions> updateNayaxTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody NayaxTransactions nayaxTransactions
    ) throws URISyntaxException {
        log.debug("REST request to update NayaxTransactions : {}, {}", id, nayaxTransactions);
        if (nayaxTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nayaxTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nayaxTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NayaxTransactions result = nayaxTransactionsRepository.save(nayaxTransactions);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nayaxTransactions.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nayax-transactions/:id} : Partial updates given fields of an existing nayaxTransactions, field will ignore if it is null
     *
     * @param id the id of the nayaxTransactions to save.
     * @param nayaxTransactions the nayaxTransactions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nayaxTransactions,
     * or with status {@code 400 (Bad Request)} if the nayaxTransactions is not valid,
     * or with status {@code 404 (Not Found)} if the nayaxTransactions is not found,
     * or with status {@code 500 (Internal Server Error)} if the nayaxTransactions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NayaxTransactions> partialUpdateNayaxTransactions(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody NayaxTransactions nayaxTransactions
    ) throws URISyntaxException {
        log.debug("REST request to partial update NayaxTransactions partially : {}, {}", id, nayaxTransactions);
        if (nayaxTransactions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nayaxTransactions.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nayaxTransactionsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NayaxTransactions> result = nayaxTransactionsRepository
            .findById(nayaxTransactions.getId())
            .map(existingNayaxTransactions -> {
                if (nayaxTransactions.getSiteID() != null) {
                    existingNayaxTransactions.setSiteID(nayaxTransactions.getSiteID());
                }
                if (nayaxTransactions.getTransactionID() != null) {
                    existingNayaxTransactions.setTransactionID(nayaxTransactions.getTransactionID());
                }
                if (nayaxTransactions.getPaymentMethodID() != null) {
                    existingNayaxTransactions.setPaymentMethodID(nayaxTransactions.getPaymentMethodID());
                }
                if (nayaxTransactions.getCurrency() != null) {
                    existingNayaxTransactions.setCurrency(nayaxTransactions.getCurrency());
                }
                if (nayaxTransactions.getMachineName() != null) {
                    existingNayaxTransactions.setMachineName(nayaxTransactions.getMachineName());
                }
                if (nayaxTransactions.getAuthorizationValue() != null) {
                    existingNayaxTransactions.setAuthorizationValue(nayaxTransactions.getAuthorizationValue());
                }
                if (nayaxTransactions.getCampaignID() != null) {
                    existingNayaxTransactions.setCampaignID(nayaxTransactions.getCampaignID());
                }
                if (nayaxTransactions.getSettlementValue() != null) {
                    existingNayaxTransactions.setSettlementValue(nayaxTransactions.getSettlementValue());
                }
                if (nayaxTransactions.getProductSelectionInfo() != null) {
                    existingNayaxTransactions.setProductSelectionInfo(nayaxTransactions.getProductSelectionInfo());
                }
                if (nayaxTransactions.getCardNumber() != null) {
                    existingNayaxTransactions.setCardNumber(nayaxTransactions.getCardNumber());
                }
                if (nayaxTransactions.getAuthrizationRRN() != null) {
                    existingNayaxTransactions.setAuthrizationRRN(nayaxTransactions.getAuthrizationRRN());
                }
                if (nayaxTransactions.getMachineAuthorizationTime() != null) {
                    existingNayaxTransactions.setMachineAuthorizationTime(nayaxTransactions.getMachineAuthorizationTime());
                }
                if (nayaxTransactions.getMachineSettlementTime() != null) {
                    existingNayaxTransactions.setMachineSettlementTime(nayaxTransactions.getMachineSettlementTime());
                }
                if (nayaxTransactions.getCreditCardType() != null) {
                    existingNayaxTransactions.setCreditCardType(nayaxTransactions.getCreditCardType());
                }
                if (nayaxTransactions.getCardType() != null) {
                    existingNayaxTransactions.setCardType(nayaxTransactions.getCardType());
                }
                if (nayaxTransactions.getPaymentMethod() != null) {
                    existingNayaxTransactions.setPaymentMethod(nayaxTransactions.getPaymentMethod());
                }
                if (nayaxTransactions.getTransactionStatusID() != null) {
                    existingNayaxTransactions.setTransactionStatusID(nayaxTransactions.getTransactionStatusID());
                }
                if (nayaxTransactions.getTransactionTypeID() != null) {
                    existingNayaxTransactions.setTransactionTypeID(nayaxTransactions.getTransactionTypeID());
                }
                if (nayaxTransactions.getBillingProvider() != null) {
                    existingNayaxTransactions.setBillingProvider(nayaxTransactions.getBillingProvider());
                }
                if (nayaxTransactions.getPrepaidCardHolderName() != null) {
                    existingNayaxTransactions.setPrepaidCardHolderName(nayaxTransactions.getPrepaidCardHolderName());
                }
                if (nayaxTransactions.getRefundRequestBy() != null) {
                    existingNayaxTransactions.setRefundRequestBy(nayaxTransactions.getRefundRequestBy());
                }
                if (nayaxTransactions.getRefundRequestDate() != null) {
                    existingNayaxTransactions.setRefundRequestDate(nayaxTransactions.getRefundRequestDate());
                }
                if (nayaxTransactions.getRefundReason() != null) {
                    existingNayaxTransactions.setRefundReason(nayaxTransactions.getRefundReason());
                }

                return existingNayaxTransactions;
            })
            .map(nayaxTransactionsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nayaxTransactions.getId().toString())
        );
    }

    /**
     * {@code GET  /nayax-transactions} : get all the nayaxTransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nayaxTransactions in body.
     */
    @GetMapping("")
    public List<NayaxTransactions> getAllNayaxTransactions() {
        log.debug("REST request to get all NayaxTransactions");
        return nayaxTransactionsRepository.findAll();
    }

    /**
     * {@code GET  /nayax-transactions/:id} : get the "id" nayaxTransactions.
     *
     * @param id the id of the nayaxTransactions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nayaxTransactions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<NayaxTransactions> getNayaxTransactions(@PathVariable("id") Long id) {
        log.debug("REST request to get NayaxTransactions : {}", id);
        Optional<NayaxTransactions> nayaxTransactions = nayaxTransactionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nayaxTransactions);
    }

    /**
     * {@code DELETE  /nayax-transactions/:id} : delete the "id" nayaxTransactions.
     *
     * @param id the id of the nayaxTransactions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNayaxTransactions(@PathVariable("id") Long id) {
        log.debug("REST request to delete NayaxTransactions : {}", id);
        nayaxTransactionsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
