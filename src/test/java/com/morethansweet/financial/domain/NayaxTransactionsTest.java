package com.morethansweet.financial.domain;

import static com.morethansweet.financial.domain.NayaxTransactionsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.morethansweet.financial.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NayaxTransactionsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NayaxTransactions.class);
        NayaxTransactions nayaxTransactions1 = getNayaxTransactionsSample1();
        NayaxTransactions nayaxTransactions2 = new NayaxTransactions();
        assertThat(nayaxTransactions1).isNotEqualTo(nayaxTransactions2);

        nayaxTransactions2.setId(nayaxTransactions1.getId());
        assertThat(nayaxTransactions1).isEqualTo(nayaxTransactions2);

        nayaxTransactions2 = getNayaxTransactionsSample2();
        assertThat(nayaxTransactions1).isNotEqualTo(nayaxTransactions2);
    }
}
