package com.morethansweet.financial.web.rest;

import static com.morethansweet.financial.web.rest.TestUtil.sameInstant;
import static com.morethansweet.financial.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.morethansweet.financial.IntegrationTest;
import com.morethansweet.financial.domain.MoneyFlowView;
import com.morethansweet.financial.repository.MoneyFlowViewRepository;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link MoneyFlowViewResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MoneyFlowViewResourceIT {

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    private static final UUID DEFAULT_BUSINESS_ID = UUID.randomUUID();
    private static final UUID UPDATED_BUSINESS_ID = UUID.randomUUID();

    private static final ZonedDateTime DEFAULT_BUSINESS_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BUSINESS_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final BigDecimal DEFAULT_BUSINESS_AMT = new BigDecimal(1);
    private static final BigDecimal UPDATED_BUSINESS_AMT = new BigDecimal(2);

    private static final String DEFAULT_BUSINESS_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_BUSINESS_TYPE_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_TYPE_DETAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PAYER = "AAAAAAAAAA";
    private static final String UPDATED_PAYER = "BBBBBBBBBB";

    private static final String DEFAULT_RECEIVER = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVER = "BBBBBBBBBB";

    private static final String DEFAULT_REMARK = "AAAAAAAAAA";
    private static final String UPDATED_REMARK = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final String ENTITY_API_URL = "/api/money-flow-views";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MoneyFlowViewRepository moneyFlowViewRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMoneyFlowViewMockMvc;

    private MoneyFlowView moneyFlowView;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MoneyFlowView createEntity(EntityManager em) {
        MoneyFlowView moneyFlowView = new MoneyFlowView()
            .source(DEFAULT_SOURCE)
            .businessId(DEFAULT_BUSINESS_ID)
            .businessDate(DEFAULT_BUSINESS_DATE)
            .businessAmt(DEFAULT_BUSINESS_AMT)
            .businessType(DEFAULT_BUSINESS_TYPE)
            .businessTypeDetail(DEFAULT_BUSINESS_TYPE_DETAIL)
            .payer(DEFAULT_PAYER)
            .receiver(DEFAULT_RECEIVER)
            .remark(DEFAULT_REMARK)
            .isActive(DEFAULT_IS_ACTIVE);
        return moneyFlowView;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MoneyFlowView createUpdatedEntity(EntityManager em) {
        MoneyFlowView moneyFlowView = new MoneyFlowView()
            .source(UPDATED_SOURCE)
            .businessId(UPDATED_BUSINESS_ID)
            .businessDate(UPDATED_BUSINESS_DATE)
            .businessAmt(UPDATED_BUSINESS_AMT)
            .businessType(UPDATED_BUSINESS_TYPE)
            .businessTypeDetail(UPDATED_BUSINESS_TYPE_DETAIL)
            .payer(UPDATED_PAYER)
            .receiver(UPDATED_RECEIVER)
            .remark(UPDATED_REMARK)
            .isActive(UPDATED_IS_ACTIVE);
        return moneyFlowView;
    }

    @BeforeEach
    public void initTest() {
        moneyFlowView = createEntity(em);
    }

    @Test
    @Transactional
    void createMoneyFlowView() throws Exception {
        int databaseSizeBeforeCreate = moneyFlowViewRepository.findAll().size();
        // Create the MoneyFlowView
        restMoneyFlowViewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(moneyFlowView)))
            .andExpect(status().isCreated());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeCreate + 1);
        MoneyFlowView testMoneyFlowView = moneyFlowViewList.get(moneyFlowViewList.size() - 1);
        assertThat(testMoneyFlowView.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testMoneyFlowView.getBusinessId()).isEqualTo(DEFAULT_BUSINESS_ID);
        assertThat(testMoneyFlowView.getBusinessDate()).isEqualTo(DEFAULT_BUSINESS_DATE);
        assertThat(testMoneyFlowView.getBusinessAmt()).isEqualByComparingTo(DEFAULT_BUSINESS_AMT);
        assertThat(testMoneyFlowView.getBusinessType()).isEqualTo(DEFAULT_BUSINESS_TYPE);
        assertThat(testMoneyFlowView.getBusinessTypeDetail()).isEqualTo(DEFAULT_BUSINESS_TYPE_DETAIL);
        assertThat(testMoneyFlowView.getPayer()).isEqualTo(DEFAULT_PAYER);
        assertThat(testMoneyFlowView.getReceiver()).isEqualTo(DEFAULT_RECEIVER);
        assertThat(testMoneyFlowView.getRemark()).isEqualTo(DEFAULT_REMARK);
        assertThat(testMoneyFlowView.getIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
    }

    @Test
    @Transactional
    void createMoneyFlowViewWithExistingId() throws Exception {
        // Create the MoneyFlowView with an existing ID
        moneyFlowView.setId(1L);

        int databaseSizeBeforeCreate = moneyFlowViewRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoneyFlowViewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(moneyFlowView)))
            .andExpect(status().isBadRequest());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSourceIsRequired() throws Exception {
        int databaseSizeBeforeTest = moneyFlowViewRepository.findAll().size();
        // set the field null
        moneyFlowView.setSource(null);

        // Create the MoneyFlowView, which fails.

        restMoneyFlowViewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(moneyFlowView)))
            .andExpect(status().isBadRequest());

        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBusinessIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = moneyFlowViewRepository.findAll().size();
        // set the field null
        moneyFlowView.setBusinessId(null);

        // Create the MoneyFlowView, which fails.

        restMoneyFlowViewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(moneyFlowView)))
            .andExpect(status().isBadRequest());

        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBusinessDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = moneyFlowViewRepository.findAll().size();
        // set the field null
        moneyFlowView.setBusinessDate(null);

        // Create the MoneyFlowView, which fails.

        restMoneyFlowViewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(moneyFlowView)))
            .andExpect(status().isBadRequest());

        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBusinessAmtIsRequired() throws Exception {
        int databaseSizeBeforeTest = moneyFlowViewRepository.findAll().size();
        // set the field null
        moneyFlowView.setBusinessAmt(null);

        // Create the MoneyFlowView, which fails.

        restMoneyFlowViewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(moneyFlowView)))
            .andExpect(status().isBadRequest());

        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMoneyFlowViews() throws Exception {
        // Initialize the database
        moneyFlowViewRepository.saveAndFlush(moneyFlowView);

        // Get all the moneyFlowViewList
        restMoneyFlowViewMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(moneyFlowView.getId().intValue())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE)))
            .andExpect(jsonPath("$.[*].businessId").value(hasItem(DEFAULT_BUSINESS_ID.toString())))
            .andExpect(jsonPath("$.[*].businessDate").value(hasItem(sameInstant(DEFAULT_BUSINESS_DATE))))
            .andExpect(jsonPath("$.[*].businessAmt").value(hasItem(sameNumber(DEFAULT_BUSINESS_AMT))))
            .andExpect(jsonPath("$.[*].businessType").value(hasItem(DEFAULT_BUSINESS_TYPE)))
            .andExpect(jsonPath("$.[*].businessTypeDetail").value(hasItem(DEFAULT_BUSINESS_TYPE_DETAIL)))
            .andExpect(jsonPath("$.[*].payer").value(hasItem(DEFAULT_PAYER)))
            .andExpect(jsonPath("$.[*].receiver").value(hasItem(DEFAULT_RECEIVER)))
            .andExpect(jsonPath("$.[*].remark").value(hasItem(DEFAULT_REMARK)))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    void getMoneyFlowView() throws Exception {
        // Initialize the database
        moneyFlowViewRepository.saveAndFlush(moneyFlowView);

        // Get the moneyFlowView
        restMoneyFlowViewMockMvc
            .perform(get(ENTITY_API_URL_ID, moneyFlowView.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(moneyFlowView.getId().intValue()))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE))
            .andExpect(jsonPath("$.businessId").value(DEFAULT_BUSINESS_ID.toString()))
            .andExpect(jsonPath("$.businessDate").value(sameInstant(DEFAULT_BUSINESS_DATE)))
            .andExpect(jsonPath("$.businessAmt").value(sameNumber(DEFAULT_BUSINESS_AMT)))
            .andExpect(jsonPath("$.businessType").value(DEFAULT_BUSINESS_TYPE))
            .andExpect(jsonPath("$.businessTypeDetail").value(DEFAULT_BUSINESS_TYPE_DETAIL))
            .andExpect(jsonPath("$.payer").value(DEFAULT_PAYER))
            .andExpect(jsonPath("$.receiver").value(DEFAULT_RECEIVER))
            .andExpect(jsonPath("$.remark").value(DEFAULT_REMARK))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingMoneyFlowView() throws Exception {
        // Get the moneyFlowView
        restMoneyFlowViewMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMoneyFlowView() throws Exception {
        // Initialize the database
        moneyFlowViewRepository.saveAndFlush(moneyFlowView);

        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();

        // Update the moneyFlowView
        MoneyFlowView updatedMoneyFlowView = moneyFlowViewRepository.findById(moneyFlowView.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMoneyFlowView are not directly saved in db
        em.detach(updatedMoneyFlowView);
        updatedMoneyFlowView
            .source(UPDATED_SOURCE)
            .businessId(UPDATED_BUSINESS_ID)
            .businessDate(UPDATED_BUSINESS_DATE)
            .businessAmt(UPDATED_BUSINESS_AMT)
            .businessType(UPDATED_BUSINESS_TYPE)
            .businessTypeDetail(UPDATED_BUSINESS_TYPE_DETAIL)
            .payer(UPDATED_PAYER)
            .receiver(UPDATED_RECEIVER)
            .remark(UPDATED_REMARK)
            .isActive(UPDATED_IS_ACTIVE);

        restMoneyFlowViewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMoneyFlowView.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMoneyFlowView))
            )
            .andExpect(status().isOk());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
        MoneyFlowView testMoneyFlowView = moneyFlowViewList.get(moneyFlowViewList.size() - 1);
        assertThat(testMoneyFlowView.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testMoneyFlowView.getBusinessId()).isEqualTo(UPDATED_BUSINESS_ID);
        assertThat(testMoneyFlowView.getBusinessDate()).isEqualTo(UPDATED_BUSINESS_DATE);
        assertThat(testMoneyFlowView.getBusinessAmt()).isEqualByComparingTo(UPDATED_BUSINESS_AMT);
        assertThat(testMoneyFlowView.getBusinessType()).isEqualTo(UPDATED_BUSINESS_TYPE);
        assertThat(testMoneyFlowView.getBusinessTypeDetail()).isEqualTo(UPDATED_BUSINESS_TYPE_DETAIL);
        assertThat(testMoneyFlowView.getPayer()).isEqualTo(UPDATED_PAYER);
        assertThat(testMoneyFlowView.getReceiver()).isEqualTo(UPDATED_RECEIVER);
        assertThat(testMoneyFlowView.getRemark()).isEqualTo(UPDATED_REMARK);
        assertThat(testMoneyFlowView.getIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    void putNonExistingMoneyFlowView() throws Exception {
        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();
        moneyFlowView.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoneyFlowViewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, moneyFlowView.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(moneyFlowView))
            )
            .andExpect(status().isBadRequest());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMoneyFlowView() throws Exception {
        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();
        moneyFlowView.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMoneyFlowViewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(moneyFlowView))
            )
            .andExpect(status().isBadRequest());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMoneyFlowView() throws Exception {
        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();
        moneyFlowView.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMoneyFlowViewMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(moneyFlowView)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMoneyFlowViewWithPatch() throws Exception {
        // Initialize the database
        moneyFlowViewRepository.saveAndFlush(moneyFlowView);

        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();

        // Update the moneyFlowView using partial update
        MoneyFlowView partialUpdatedMoneyFlowView = new MoneyFlowView();
        partialUpdatedMoneyFlowView.setId(moneyFlowView.getId());

        partialUpdatedMoneyFlowView
            .businessId(UPDATED_BUSINESS_ID)
            .businessType(UPDATED_BUSINESS_TYPE)
            .businessTypeDetail(UPDATED_BUSINESS_TYPE_DETAIL)
            .payer(UPDATED_PAYER)
            .isActive(UPDATED_IS_ACTIVE);

        restMoneyFlowViewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMoneyFlowView.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMoneyFlowView))
            )
            .andExpect(status().isOk());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
        MoneyFlowView testMoneyFlowView = moneyFlowViewList.get(moneyFlowViewList.size() - 1);
        assertThat(testMoneyFlowView.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testMoneyFlowView.getBusinessId()).isEqualTo(UPDATED_BUSINESS_ID);
        assertThat(testMoneyFlowView.getBusinessDate()).isEqualTo(DEFAULT_BUSINESS_DATE);
        assertThat(testMoneyFlowView.getBusinessAmt()).isEqualByComparingTo(DEFAULT_BUSINESS_AMT);
        assertThat(testMoneyFlowView.getBusinessType()).isEqualTo(UPDATED_BUSINESS_TYPE);
        assertThat(testMoneyFlowView.getBusinessTypeDetail()).isEqualTo(UPDATED_BUSINESS_TYPE_DETAIL);
        assertThat(testMoneyFlowView.getPayer()).isEqualTo(UPDATED_PAYER);
        assertThat(testMoneyFlowView.getReceiver()).isEqualTo(DEFAULT_RECEIVER);
        assertThat(testMoneyFlowView.getRemark()).isEqualTo(DEFAULT_REMARK);
        assertThat(testMoneyFlowView.getIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    void fullUpdateMoneyFlowViewWithPatch() throws Exception {
        // Initialize the database
        moneyFlowViewRepository.saveAndFlush(moneyFlowView);

        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();

        // Update the moneyFlowView using partial update
        MoneyFlowView partialUpdatedMoneyFlowView = new MoneyFlowView();
        partialUpdatedMoneyFlowView.setId(moneyFlowView.getId());

        partialUpdatedMoneyFlowView
            .source(UPDATED_SOURCE)
            .businessId(UPDATED_BUSINESS_ID)
            .businessDate(UPDATED_BUSINESS_DATE)
            .businessAmt(UPDATED_BUSINESS_AMT)
            .businessType(UPDATED_BUSINESS_TYPE)
            .businessTypeDetail(UPDATED_BUSINESS_TYPE_DETAIL)
            .payer(UPDATED_PAYER)
            .receiver(UPDATED_RECEIVER)
            .remark(UPDATED_REMARK)
            .isActive(UPDATED_IS_ACTIVE);

        restMoneyFlowViewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMoneyFlowView.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMoneyFlowView))
            )
            .andExpect(status().isOk());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
        MoneyFlowView testMoneyFlowView = moneyFlowViewList.get(moneyFlowViewList.size() - 1);
        assertThat(testMoneyFlowView.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testMoneyFlowView.getBusinessId()).isEqualTo(UPDATED_BUSINESS_ID);
        assertThat(testMoneyFlowView.getBusinessDate()).isEqualTo(UPDATED_BUSINESS_DATE);
        assertThat(testMoneyFlowView.getBusinessAmt()).isEqualByComparingTo(UPDATED_BUSINESS_AMT);
        assertThat(testMoneyFlowView.getBusinessType()).isEqualTo(UPDATED_BUSINESS_TYPE);
        assertThat(testMoneyFlowView.getBusinessTypeDetail()).isEqualTo(UPDATED_BUSINESS_TYPE_DETAIL);
        assertThat(testMoneyFlowView.getPayer()).isEqualTo(UPDATED_PAYER);
        assertThat(testMoneyFlowView.getReceiver()).isEqualTo(UPDATED_RECEIVER);
        assertThat(testMoneyFlowView.getRemark()).isEqualTo(UPDATED_REMARK);
        assertThat(testMoneyFlowView.getIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    void patchNonExistingMoneyFlowView() throws Exception {
        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();
        moneyFlowView.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoneyFlowViewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, moneyFlowView.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(moneyFlowView))
            )
            .andExpect(status().isBadRequest());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMoneyFlowView() throws Exception {
        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();
        moneyFlowView.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMoneyFlowViewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(moneyFlowView))
            )
            .andExpect(status().isBadRequest());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMoneyFlowView() throws Exception {
        int databaseSizeBeforeUpdate = moneyFlowViewRepository.findAll().size();
        moneyFlowView.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMoneyFlowViewMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(moneyFlowView))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MoneyFlowView in the database
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMoneyFlowView() throws Exception {
        // Initialize the database
        moneyFlowViewRepository.saveAndFlush(moneyFlowView);

        int databaseSizeBeforeDelete = moneyFlowViewRepository.findAll().size();

        // Delete the moneyFlowView
        restMoneyFlowViewMockMvc
            .perform(delete(ENTITY_API_URL_ID, moneyFlowView.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MoneyFlowView> moneyFlowViewList = moneyFlowViewRepository.findAll();
        assertThat(moneyFlowViewList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
