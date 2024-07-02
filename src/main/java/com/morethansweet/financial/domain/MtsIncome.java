package com.morethansweet.financial.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MtsIncome.
 */
@Entity
@Table(name = "mts_income")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MtsIncome implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "income_date", nullable = false)
    private ZonedDateTime incomeDate;

    @NotNull
    @Column(name = "income_amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal incomeAmount;

    @Column(name = "income_type")
    private String incomeType;

    @Column(name = "income_type_detail")
    private String incomeTypeDetail;

    @Column(name = "income_payer")
    private String incomePayer;

    @Column(name = "income_receiver")
    private String incomeReceiver;

    @Column(name = "income_remark")
    private String incomeRemark;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "modifier")
    private String modifier;

    @Column(name = "modify_datetime")
    private ZonedDateTime modifyDatetime;

    @Column(name = "creator")
    private String creator;

    @Column(name = "create_datetime")
    private ZonedDateTime createDatetime;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public MtsIncome id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getIncomeDate() {
        return this.incomeDate;
    }

    public MtsIncome incomeDate(ZonedDateTime incomeDate) {
        this.setIncomeDate(incomeDate);
        return this;
    }

    public void setIncomeDate(ZonedDateTime incomeDate) {
        this.incomeDate = incomeDate;
    }

    public BigDecimal getIncomeAmount() {
        return this.incomeAmount;
    }

    public MtsIncome incomeAmount(BigDecimal incomeAmount) {
        this.setIncomeAmount(incomeAmount);
        return this;
    }

    public void setIncomeAmount(BigDecimal incomeAmount) {
        this.incomeAmount = incomeAmount;
    }

    public String getIncomeType() {
        return this.incomeType;
    }

    public MtsIncome incomeType(String incomeType) {
        this.setIncomeType(incomeType);
        return this;
    }

    public void setIncomeType(String incomeType) {
        this.incomeType = incomeType;
    }

    public String getIncomeTypeDetail() {
        return this.incomeTypeDetail;
    }

    public MtsIncome incomeTypeDetail(String incomeTypeDetail) {
        this.setIncomeTypeDetail(incomeTypeDetail);
        return this;
    }

    public void setIncomeTypeDetail(String incomeTypeDetail) {
        this.incomeTypeDetail = incomeTypeDetail;
    }

    public String getIncomePayer() {
        return this.incomePayer;
    }

    public MtsIncome incomePayer(String incomePayer) {
        this.setIncomePayer(incomePayer);
        return this;
    }

    public void setIncomePayer(String incomePayer) {
        this.incomePayer = incomePayer;
    }

    public String getIncomeReceiver() {
        return this.incomeReceiver;
    }

    public MtsIncome incomeReceiver(String incomeReceiver) {
        this.setIncomeReceiver(incomeReceiver);
        return this;
    }

    public void setIncomeReceiver(String incomeReceiver) {
        this.incomeReceiver = incomeReceiver;
    }

    public String getIncomeRemark() {
        return this.incomeRemark;
    }

    public MtsIncome incomeRemark(String incomeRemark) {
        this.setIncomeRemark(incomeRemark);
        return this;
    }

    public void setIncomeRemark(String incomeRemark) {
        this.incomeRemark = incomeRemark;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public MtsIncome isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getModifier() {
        return this.modifier;
    }

    public MtsIncome modifier(String modifier) {
        this.setModifier(modifier);
        return this;
    }

    public void setModifier(String modifier) {
        this.modifier = modifier;
    }

    public ZonedDateTime getModifyDatetime() {
        return this.modifyDatetime;
    }

    public MtsIncome modifyDatetime(ZonedDateTime modifyDatetime) {
        this.setModifyDatetime(modifyDatetime);
        return this;
    }

    public void setModifyDatetime(ZonedDateTime modifyDatetime) {
        this.modifyDatetime = modifyDatetime;
    }

    public String getCreator() {
        return this.creator;
    }

    public MtsIncome creator(String creator) {
        this.setCreator(creator);
        return this;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public ZonedDateTime getCreateDatetime() {
        return this.createDatetime;
    }

    public MtsIncome createDatetime(ZonedDateTime createDatetime) {
        this.setCreateDatetime(createDatetime);
        return this;
    }

    public void setCreateDatetime(ZonedDateTime createDatetime) {
        this.createDatetime = createDatetime;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MtsIncome)) {
            return false;
        }
        return getId() != null && getId().equals(((MtsIncome) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MtsIncome{" +
            "id=" + getId() +
            ", incomeDate='" + getIncomeDate() + "'" +
            ", incomeAmount=" + getIncomeAmount() +
            ", incomeType='" + getIncomeType() + "'" +
            ", incomeTypeDetail='" + getIncomeTypeDetail() + "'" +
            ", incomePayer='" + getIncomePayer() + "'" +
            ", incomeReceiver='" + getIncomeReceiver() + "'" +
            ", incomeRemark='" + getIncomeRemark() + "'" +
            ", isActive='" + getIsActive() + "'" +
            ", modifier='" + getModifier() + "'" +
            ", modifyDatetime='" + getModifyDatetime() + "'" +
            ", creator='" + getCreator() + "'" +
            ", createDatetime='" + getCreateDatetime() + "'" +
            "}";
    }
}
