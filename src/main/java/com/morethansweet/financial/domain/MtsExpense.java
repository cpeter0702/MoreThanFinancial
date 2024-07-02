package com.morethansweet.financial.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MtsExpense.
 */
@Entity
@Table(name = "mts_expense")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MtsExpense implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "expense_date", nullable = false)
    private ZonedDateTime expenseDate;

    @NotNull
    @Column(name = "expense_amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal expenseAmount;

    @Column(name = "expense_type")
    private String expenseType;

    @Column(name = "expense_type_detail")
    private String expenseTypeDetail;

    @Column(name = "expense_payer")
    private String expensePayer;

    @Column(name = "expense_receiver")
    private String expenseReceiver;

    @Column(name = "expense_remark")
    private String expenseRemark;

    @Lob
    @Column(name = "expense_receipt")
    private byte[] expenseReceipt;

    @Column(name = "expense_receipt_content_type")
    private String expenseReceiptContentType;

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

    public MtsExpense id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getExpenseDate() {
        return this.expenseDate;
    }

    public MtsExpense expenseDate(ZonedDateTime expenseDate) {
        this.setExpenseDate(expenseDate);
        return this;
    }

    public void setExpenseDate(ZonedDateTime expenseDate) {
        this.expenseDate = expenseDate;
    }

    public BigDecimal getExpenseAmount() {
        return this.expenseAmount;
    }

    public MtsExpense expenseAmount(BigDecimal expenseAmount) {
        this.setExpenseAmount(expenseAmount);
        return this;
    }

    public void setExpenseAmount(BigDecimal expenseAmount) {
        this.expenseAmount = expenseAmount;
    }

    public String getExpenseType() {
        return this.expenseType;
    }

    public MtsExpense expenseType(String expenseType) {
        this.setExpenseType(expenseType);
        return this;
    }

    public void setExpenseType(String expenseType) {
        this.expenseType = expenseType;
    }

    public String getExpenseTypeDetail() {
        return this.expenseTypeDetail;
    }

    public MtsExpense expenseTypeDetail(String expenseTypeDetail) {
        this.setExpenseTypeDetail(expenseTypeDetail);
        return this;
    }

    public void setExpenseTypeDetail(String expenseTypeDetail) {
        this.expenseTypeDetail = expenseTypeDetail;
    }

    public String getExpensePayer() {
        return this.expensePayer;
    }

    public MtsExpense expensePayer(String expensePayer) {
        this.setExpensePayer(expensePayer);
        return this;
    }

    public void setExpensePayer(String expensePayer) {
        this.expensePayer = expensePayer;
    }

    public String getExpenseReceiver() {
        return this.expenseReceiver;
    }

    public MtsExpense expenseReceiver(String expenseReceiver) {
        this.setExpenseReceiver(expenseReceiver);
        return this;
    }

    public void setExpenseReceiver(String expenseReceiver) {
        this.expenseReceiver = expenseReceiver;
    }

    public String getExpenseRemark() {
        return this.expenseRemark;
    }

    public MtsExpense expenseRemark(String expenseRemark) {
        this.setExpenseRemark(expenseRemark);
        return this;
    }

    public void setExpenseRemark(String expenseRemark) {
        this.expenseRemark = expenseRemark;
    }

    public byte[] getExpenseReceipt() {
        return this.expenseReceipt;
    }

    public MtsExpense expenseReceipt(byte[] expenseReceipt) {
        this.setExpenseReceipt(expenseReceipt);
        return this;
    }

    public void setExpenseReceipt(byte[] expenseReceipt) {
        this.expenseReceipt = expenseReceipt;
    }

    public String getExpenseReceiptContentType() {
        return this.expenseReceiptContentType;
    }

    public MtsExpense expenseReceiptContentType(String expenseReceiptContentType) {
        this.expenseReceiptContentType = expenseReceiptContentType;
        return this;
    }

    public void setExpenseReceiptContentType(String expenseReceiptContentType) {
        this.expenseReceiptContentType = expenseReceiptContentType;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public MtsExpense isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getModifier() {
        return this.modifier;
    }

    public MtsExpense modifier(String modifier) {
        this.setModifier(modifier);
        return this;
    }

    public void setModifier(String modifier) {
        this.modifier = modifier;
    }

    public ZonedDateTime getModifyDatetime() {
        return this.modifyDatetime;
    }

    public MtsExpense modifyDatetime(ZonedDateTime modifyDatetime) {
        this.setModifyDatetime(modifyDatetime);
        return this;
    }

    public void setModifyDatetime(ZonedDateTime modifyDatetime) {
        this.modifyDatetime = modifyDatetime;
    }

    public String getCreator() {
        return this.creator;
    }

    public MtsExpense creator(String creator) {
        this.setCreator(creator);
        return this;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public ZonedDateTime getCreateDatetime() {
        return this.createDatetime;
    }

    public MtsExpense createDatetime(ZonedDateTime createDatetime) {
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
        if (!(o instanceof MtsExpense)) {
            return false;
        }
        return getId() != null && getId().equals(((MtsExpense) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MtsExpense{" +
            "id=" + getId() +
            ", expenseDate='" + getExpenseDate() + "'" +
            ", expenseAmount=" + getExpenseAmount() +
            ", expenseType='" + getExpenseType() + "'" +
            ", expenseTypeDetail='" + getExpenseTypeDetail() + "'" +
            ", expensePayer='" + getExpensePayer() + "'" +
            ", expenseReceiver='" + getExpenseReceiver() + "'" +
            ", expenseRemark='" + getExpenseRemark() + "'" +
            ", expenseReceipt='" + getExpenseReceipt() + "'" +
            ", expenseReceiptContentType='" + getExpenseReceiptContentType() + "'" +
            ", isActive='" + getIsActive() + "'" +
            ", modifier='" + getModifier() + "'" +
            ", modifyDatetime='" + getModifyDatetime() + "'" +
            ", creator='" + getCreator() + "'" +
            ", createDatetime='" + getCreateDatetime() + "'" +
            "}";
    }
}
