package com.morethansweet.financial.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MtsExpenseTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static MtsExpense getMtsExpenseSample1() {
        return new MtsExpense()
            .id(1L)
            .expenseType("expenseType1")
            .expenseTypeDetail("expenseTypeDetail1")
            .expensePayer("expensePayer1")
            .expenseReceiver("expenseReceiver1")
            .expenseRemark("expenseRemark1")
            .modifier("modifier1")
            .creator("creator1");
    }

    public static MtsExpense getMtsExpenseSample2() {
        return new MtsExpense()
            .id(2L)
            .expenseType("expenseType2")
            .expenseTypeDetail("expenseTypeDetail2")
            .expensePayer("expensePayer2")
            .expenseReceiver("expenseReceiver2")
            .expenseRemark("expenseRemark2")
            .modifier("modifier2")
            .creator("creator2");
    }

    public static MtsExpense getMtsExpenseRandomSampleGenerator() {
        return new MtsExpense()
            .id(longCount.incrementAndGet())
            .expenseType(UUID.randomUUID().toString())
            .expenseTypeDetail(UUID.randomUUID().toString())
            .expensePayer(UUID.randomUUID().toString())
            .expenseReceiver(UUID.randomUUID().toString())
            .expenseRemark(UUID.randomUUID().toString())
            .modifier(UUID.randomUUID().toString())
            .creator(UUID.randomUUID().toString());
    }
}
