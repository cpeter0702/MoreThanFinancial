package com.morethansweet.financial.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class NayaxTransactionsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static NayaxTransactions getNayaxTransactionsSample1() {
        return new NayaxTransactions()
            .id(1L)
            .siteID(1)
            .transactionID("transactionID1")
            .paymentMethodID(1)
            .currency("currency1")
            .machineName("machineName1")
            .authorizationValue(1)
            .campaignID("campaignID1")
            .productSelectionInfo("productSelectionInfo1")
            .cardNumber("cardNumber1")
            .authrizationRRN("authrizationRRN1")
            .creditCardType("creditCardType1")
            .cardType("cardType1")
            .paymentMethod("paymentMethod1")
            .transactionStatusID(1)
            .transactionTypeID(1)
            .billingProvider("billingProvider1")
            .prepaidCardHolderName("prepaidCardHolderName1")
            .refundRequestBy("refundRequestBy1")
            .refundReason("refundReason1");
    }

    public static NayaxTransactions getNayaxTransactionsSample2() {
        return new NayaxTransactions()
            .id(2L)
            .siteID(2)
            .transactionID("transactionID2")
            .paymentMethodID(2)
            .currency("currency2")
            .machineName("machineName2")
            .authorizationValue(2)
            .campaignID("campaignID2")
            .productSelectionInfo("productSelectionInfo2")
            .cardNumber("cardNumber2")
            .authrizationRRN("authrizationRRN2")
            .creditCardType("creditCardType2")
            .cardType("cardType2")
            .paymentMethod("paymentMethod2")
            .transactionStatusID(2)
            .transactionTypeID(2)
            .billingProvider("billingProvider2")
            .prepaidCardHolderName("prepaidCardHolderName2")
            .refundRequestBy("refundRequestBy2")
            .refundReason("refundReason2");
    }

    public static NayaxTransactions getNayaxTransactionsRandomSampleGenerator() {
        return new NayaxTransactions()
            .id(longCount.incrementAndGet())
            .siteID(intCount.incrementAndGet())
            .transactionID(UUID.randomUUID().toString())
            .paymentMethodID(intCount.incrementAndGet())
            .currency(UUID.randomUUID().toString())
            .machineName(UUID.randomUUID().toString())
            .authorizationValue(intCount.incrementAndGet())
            .campaignID(UUID.randomUUID().toString())
            .productSelectionInfo(UUID.randomUUID().toString())
            .cardNumber(UUID.randomUUID().toString())
            .authrizationRRN(UUID.randomUUID().toString())
            .creditCardType(UUID.randomUUID().toString())
            .cardType(UUID.randomUUID().toString())
            .paymentMethod(UUID.randomUUID().toString())
            .transactionStatusID(intCount.incrementAndGet())
            .transactionTypeID(intCount.incrementAndGet())
            .billingProvider(UUID.randomUUID().toString())
            .prepaidCardHolderName(UUID.randomUUID().toString())
            .refundRequestBy(UUID.randomUUID().toString())
            .refundReason(UUID.randomUUID().toString());
    }
}
