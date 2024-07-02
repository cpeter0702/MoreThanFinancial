package com.morethansweet.financial.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MtsIncomeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static MtsIncome getMtsIncomeSample1() {
        return new MtsIncome()
            .id(1L)
            .incomeType("incomeType1")
            .incomeTypeDetail("incomeTypeDetail1")
            .incomePayer("incomePayer1")
            .incomeReceiver("incomeReceiver1")
            .incomeRemark("incomeRemark1")
            .modifier("modifier1")
            .creator("creator1");
    }

    public static MtsIncome getMtsIncomeSample2() {
        return new MtsIncome()
            .id(2L)
            .incomeType("incomeType2")
            .incomeTypeDetail("incomeTypeDetail2")
            .incomePayer("incomePayer2")
            .incomeReceiver("incomeReceiver2")
            .incomeRemark("incomeRemark2")
            .modifier("modifier2")
            .creator("creator2");
    }

    public static MtsIncome getMtsIncomeRandomSampleGenerator() {
        return new MtsIncome()
            .id(longCount.incrementAndGet())
            .incomeType(UUID.randomUUID().toString())
            .incomeTypeDetail(UUID.randomUUID().toString())
            .incomePayer(UUID.randomUUID().toString())
            .incomeReceiver(UUID.randomUUID().toString())
            .incomeRemark(UUID.randomUUID().toString())
            .modifier(UUID.randomUUID().toString())
            .creator(UUID.randomUUID().toString());
    }
}
