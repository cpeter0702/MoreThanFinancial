package com.morethansweet.financial.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A NayaxTransactions.
 */
@Entity
@Table(name = "nayax_transactions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NayaxTransactions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "site_id")
    private Integer siteID;

    @NotNull
    @Column(name = "transaction_id", nullable = false)
    private String transactionID;

    @Column(name = "payment_method_id")
    private Integer paymentMethodID;

    @NotNull
    @Column(name = "currency", nullable = false)
    private String currency;

    @NotNull
    @Column(name = "machine_name", nullable = false)
    private String machineName;

    @Column(name = "authorization_value")
    private Integer authorizationValue;

    @Column(name = "campaign_id")
    private String campaignID;

    @Column(name = "settlement_value", precision = 21, scale = 2)
    private BigDecimal settlementValue;

    @NotNull
    @Column(name = "product_selection_info", nullable = false)
    private String productSelectionInfo;

    @NotNull
    @Column(name = "card_number", nullable = false)
    private String cardNumber;

    @NotNull
    @Column(name = "authrization_rrn", nullable = false)
    private String authrizationRRN;

    @Column(name = "machine_authorization_time")
    private ZonedDateTime machineAuthorizationTime;

    @Column(name = "machine_settlement_time")
    private ZonedDateTime machineSettlementTime;

    @Column(name = "credit_card_type")
    private String creditCardType;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "transaction_status_id")
    private Integer transactionStatusID;

    @Column(name = "transaction_type_id")
    private Integer transactionTypeID;

    @Column(name = "billing_provider")
    private String billingProvider;

    @Column(name = "prepaid_card_holder_name")
    private String prepaidCardHolderName;

    @Column(name = "refund_request_by")
    private String refundRequestBy;

    @Column(name = "refund_request_date")
    private ZonedDateTime refundRequestDate;

    @Column(name = "refund_reason")
    private String refundReason;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NayaxTransactions id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSiteID() {
        return this.siteID;
    }

    public NayaxTransactions siteID(Integer siteID) {
        this.setSiteID(siteID);
        return this;
    }

    public void setSiteID(Integer siteID) {
        this.siteID = siteID;
    }

    public String getTransactionID() {
        return this.transactionID;
    }

    public NayaxTransactions transactionID(String transactionID) {
        this.setTransactionID(transactionID);
        return this;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public Integer getPaymentMethodID() {
        return this.paymentMethodID;
    }

    public NayaxTransactions paymentMethodID(Integer paymentMethodID) {
        this.setPaymentMethodID(paymentMethodID);
        return this;
    }

    public void setPaymentMethodID(Integer paymentMethodID) {
        this.paymentMethodID = paymentMethodID;
    }

    public String getCurrency() {
        return this.currency;
    }

    public NayaxTransactions currency(String currency) {
        this.setCurrency(currency);
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getMachineName() {
        return this.machineName;
    }

    public NayaxTransactions machineName(String machineName) {
        this.setMachineName(machineName);
        return this;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public Integer getAuthorizationValue() {
        return this.authorizationValue;
    }

    public NayaxTransactions authorizationValue(Integer authorizationValue) {
        this.setAuthorizationValue(authorizationValue);
        return this;
    }

    public void setAuthorizationValue(Integer authorizationValue) {
        this.authorizationValue = authorizationValue;
    }

    public String getCampaignID() {
        return this.campaignID;
    }

    public NayaxTransactions campaignID(String campaignID) {
        this.setCampaignID(campaignID);
        return this;
    }

    public void setCampaignID(String campaignID) {
        this.campaignID = campaignID;
    }

    public BigDecimal getSettlementValue() {
        return this.settlementValue;
    }

    public NayaxTransactions settlementValue(BigDecimal settlementValue) {
        this.setSettlementValue(settlementValue);
        return this;
    }

    public void setSettlementValue(BigDecimal settlementValue) {
        this.settlementValue = settlementValue;
    }

    public String getProductSelectionInfo() {
        return this.productSelectionInfo;
    }

    public NayaxTransactions productSelectionInfo(String productSelectionInfo) {
        this.setProductSelectionInfo(productSelectionInfo);
        return this;
    }

    public void setProductSelectionInfo(String productSelectionInfo) {
        this.productSelectionInfo = productSelectionInfo;
    }

    public String getCardNumber() {
        return this.cardNumber;
    }

    public NayaxTransactions cardNumber(String cardNumber) {
        this.setCardNumber(cardNumber);
        return this;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getAuthrizationRRN() {
        return this.authrizationRRN;
    }

    public NayaxTransactions authrizationRRN(String authrizationRRN) {
        this.setAuthrizationRRN(authrizationRRN);
        return this;
    }

    public void setAuthrizationRRN(String authrizationRRN) {
        this.authrizationRRN = authrizationRRN;
    }

    public ZonedDateTime getMachineAuthorizationTime() {
        return this.machineAuthorizationTime;
    }

    public NayaxTransactions machineAuthorizationTime(ZonedDateTime machineAuthorizationTime) {
        this.setMachineAuthorizationTime(machineAuthorizationTime);
        return this;
    }

    public void setMachineAuthorizationTime(ZonedDateTime machineAuthorizationTime) {
        this.machineAuthorizationTime = machineAuthorizationTime;
    }

    public ZonedDateTime getMachineSettlementTime() {
        return this.machineSettlementTime;
    }

    public NayaxTransactions machineSettlementTime(ZonedDateTime machineSettlementTime) {
        this.setMachineSettlementTime(machineSettlementTime);
        return this;
    }

    public void setMachineSettlementTime(ZonedDateTime machineSettlementTime) {
        this.machineSettlementTime = machineSettlementTime;
    }

    public String getCreditCardType() {
        return this.creditCardType;
    }

    public NayaxTransactions creditCardType(String creditCardType) {
        this.setCreditCardType(creditCardType);
        return this;
    }

    public void setCreditCardType(String creditCardType) {
        this.creditCardType = creditCardType;
    }

    public String getCardType() {
        return this.cardType;
    }

    public NayaxTransactions cardType(String cardType) {
        this.setCardType(cardType);
        return this;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getPaymentMethod() {
        return this.paymentMethod;
    }

    public NayaxTransactions paymentMethod(String paymentMethod) {
        this.setPaymentMethod(paymentMethod);
        return this;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Integer getTransactionStatusID() {
        return this.transactionStatusID;
    }

    public NayaxTransactions transactionStatusID(Integer transactionStatusID) {
        this.setTransactionStatusID(transactionStatusID);
        return this;
    }

    public void setTransactionStatusID(Integer transactionStatusID) {
        this.transactionStatusID = transactionStatusID;
    }

    public Integer getTransactionTypeID() {
        return this.transactionTypeID;
    }

    public NayaxTransactions transactionTypeID(Integer transactionTypeID) {
        this.setTransactionTypeID(transactionTypeID);
        return this;
    }

    public void setTransactionTypeID(Integer transactionTypeID) {
        this.transactionTypeID = transactionTypeID;
    }

    public String getBillingProvider() {
        return this.billingProvider;
    }

    public NayaxTransactions billingProvider(String billingProvider) {
        this.setBillingProvider(billingProvider);
        return this;
    }

    public void setBillingProvider(String billingProvider) {
        this.billingProvider = billingProvider;
    }

    public String getPrepaidCardHolderName() {
        return this.prepaidCardHolderName;
    }

    public NayaxTransactions prepaidCardHolderName(String prepaidCardHolderName) {
        this.setPrepaidCardHolderName(prepaidCardHolderName);
        return this;
    }

    public void setPrepaidCardHolderName(String prepaidCardHolderName) {
        this.prepaidCardHolderName = prepaidCardHolderName;
    }

    public String getRefundRequestBy() {
        return this.refundRequestBy;
    }

    public NayaxTransactions refundRequestBy(String refundRequestBy) {
        this.setRefundRequestBy(refundRequestBy);
        return this;
    }

    public void setRefundRequestBy(String refundRequestBy) {
        this.refundRequestBy = refundRequestBy;
    }

    public ZonedDateTime getRefundRequestDate() {
        return this.refundRequestDate;
    }

    public NayaxTransactions refundRequestDate(ZonedDateTime refundRequestDate) {
        this.setRefundRequestDate(refundRequestDate);
        return this;
    }

    public void setRefundRequestDate(ZonedDateTime refundRequestDate) {
        this.refundRequestDate = refundRequestDate;
    }

    public String getRefundReason() {
        return this.refundReason;
    }

    public NayaxTransactions refundReason(String refundReason) {
        this.setRefundReason(refundReason);
        return this;
    }

    public void setRefundReason(String refundReason) {
        this.refundReason = refundReason;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NayaxTransactions)) {
            return false;
        }
        return getId() != null && getId().equals(((NayaxTransactions) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NayaxTransactions{" +
            "id=" + getId() +
            ", siteID=" + getSiteID() +
            ", transactionID='" + getTransactionID() + "'" +
            ", paymentMethodID=" + getPaymentMethodID() +
            ", currency='" + getCurrency() + "'" +
            ", machineName='" + getMachineName() + "'" +
            ", authorizationValue=" + getAuthorizationValue() +
            ", campaignID='" + getCampaignID() + "'" +
            ", settlementValue=" + getSettlementValue() +
            ", productSelectionInfo='" + getProductSelectionInfo() + "'" +
            ", cardNumber='" + getCardNumber() + "'" +
            ", authrizationRRN='" + getAuthrizationRRN() + "'" +
            ", machineAuthorizationTime='" + getMachineAuthorizationTime() + "'" +
            ", machineSettlementTime='" + getMachineSettlementTime() + "'" +
            ", creditCardType='" + getCreditCardType() + "'" +
            ", cardType='" + getCardType() + "'" +
            ", paymentMethod='" + getPaymentMethod() + "'" +
            ", transactionStatusID=" + getTransactionStatusID() +
            ", transactionTypeID=" + getTransactionTypeID() +
            ", billingProvider='" + getBillingProvider() + "'" +
            ", prepaidCardHolderName='" + getPrepaidCardHolderName() + "'" +
            ", refundRequestBy='" + getRefundRequestBy() + "'" +
            ", refundRequestDate='" + getRefundRequestDate() + "'" +
            ", refundReason='" + getRefundReason() + "'" +
            "}";
    }
}
