package com.morethansweet.financial.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MoneyFlowView.
 */
@Entity
@Table(name = "money_flow_view")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MoneyFlowView implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "source", nullable = false)
    private String source;

    @NotNull
    @Column(name = "business_id", nullable = false)
    private UUID businessId;

    @NotNull
    @Column(name = "business_date", nullable = false)
    private ZonedDateTime businessDate;

    @NotNull
    @Column(name = "business_amt", precision = 21, scale = 2, nullable = false)
    private BigDecimal businessAmt;

    @Column(name = "business_type")
    private String businessType;

    @Column(name = "business_type_detail")
    private String businessTypeDetail;

    @Column(name = "payer")
    private String payer;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "remark")
    private String remark;

    @Column(name = "is_active")
    private Boolean isActive;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public MoneyFlowView id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSource() {
        return this.source;
    }

    public MoneyFlowView source(String source) {
        this.setSource(source);
        return this;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public UUID getBusinessId() {
        return this.businessId;
    }

    public MoneyFlowView businessId(UUID businessId) {
        this.setBusinessId(businessId);
        return this;
    }

    public void setBusinessId(UUID businessId) {
        this.businessId = businessId;
    }

    public ZonedDateTime getBusinessDate() {
        return this.businessDate;
    }

    public MoneyFlowView businessDate(ZonedDateTime businessDate) {
        this.setBusinessDate(businessDate);
        return this;
    }

    public void setBusinessDate(ZonedDateTime businessDate) {
        this.businessDate = businessDate;
    }

    public BigDecimal getBusinessAmt() {
        return this.businessAmt;
    }

    public MoneyFlowView businessAmt(BigDecimal businessAmt) {
        this.setBusinessAmt(businessAmt);
        return this;
    }

    public void setBusinessAmt(BigDecimal businessAmt) {
        this.businessAmt = businessAmt;
    }

    public String getBusinessType() {
        return this.businessType;
    }

    public MoneyFlowView businessType(String businessType) {
        this.setBusinessType(businessType);
        return this;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getBusinessTypeDetail() {
        return this.businessTypeDetail;
    }

    public MoneyFlowView businessTypeDetail(String businessTypeDetail) {
        this.setBusinessTypeDetail(businessTypeDetail);
        return this;
    }

    public void setBusinessTypeDetail(String businessTypeDetail) {
        this.businessTypeDetail = businessTypeDetail;
    }

    public String getPayer() {
        return this.payer;
    }

    public MoneyFlowView payer(String payer) {
        this.setPayer(payer);
        return this;
    }

    public void setPayer(String payer) {
        this.payer = payer;
    }

    public String getReceiver() {
        return this.receiver;
    }

    public MoneyFlowView receiver(String receiver) {
        this.setReceiver(receiver);
        return this;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getRemark() {
        return this.remark;
    }

    public MoneyFlowView remark(String remark) {
        this.setRemark(remark);
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public MoneyFlowView isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MoneyFlowView)) {
            return false;
        }
        return getId() != null && getId().equals(((MoneyFlowView) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MoneyFlowView{" +
            "id=" + getId() +
            ", source='" + getSource() + "'" +
            ", businessId='" + getBusinessId() + "'" +
            ", businessDate='" + getBusinessDate() + "'" +
            ", businessAmt=" + getBusinessAmt() +
            ", businessType='" + getBusinessType() + "'" +
            ", businessTypeDetail='" + getBusinessTypeDetail() + "'" +
            ", payer='" + getPayer() + "'" +
            ", receiver='" + getReceiver() + "'" +
            ", remark='" + getRemark() + "'" +
            ", isActive='" + getIsActive() + "'" +
            "}";
    }
}
