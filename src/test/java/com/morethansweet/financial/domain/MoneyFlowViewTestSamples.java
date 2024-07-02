package com.morethansweet.financial.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MoneyFlowViewTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static MoneyFlowView getMoneyFlowViewSample1() {
        return new MoneyFlowView()
            .id(1L)
            .source("source1")
            .businessId(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa"))
            .businessType("businessType1")
            .businessTypeDetail("businessTypeDetail1")
            .payer("payer1")
            .receiver("receiver1")
            .remark("remark1");
    }

    public static MoneyFlowView getMoneyFlowViewSample2() {
        return new MoneyFlowView()
            .id(2L)
            .source("source2")
            .businessId(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367"))
            .businessType("businessType2")
            .businessTypeDetail("businessTypeDetail2")
            .payer("payer2")
            .receiver("receiver2")
            .remark("remark2");
    }

    public static MoneyFlowView getMoneyFlowViewRandomSampleGenerator() {
        return new MoneyFlowView()
            .id(longCount.incrementAndGet())
            .source(UUID.randomUUID().toString())
            .businessId(UUID.randomUUID())
            .businessType(UUID.randomUUID().toString())
            .businessTypeDetail(UUID.randomUUID().toString())
            .payer(UUID.randomUUID().toString())
            .receiver(UUID.randomUUID().toString())
            .remark(UUID.randomUUID().toString());
    }
}
